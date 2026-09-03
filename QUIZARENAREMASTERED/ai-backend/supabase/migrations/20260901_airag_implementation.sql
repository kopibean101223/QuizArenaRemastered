-- QuizArena AIRAG Implementation Migration
-- Run this in Supabase SQL Editor
-- Date: 2026-09-01

-- ═══════════════════════════════════════════════════════════════════════
-- 1. generation_logs table — Pipeline observability (P0/P1)
-- ═══════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.generation_logs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    request_id text,
    document_id text,
    model text,
    provider text,                    -- 'groq', 'gemini', 'openai'
    attempt_number int DEFAULT 1,
    dense_candidate_count int,
    fts_candidate_count int,
    reranked_count int,
    generation_latency_ms float,
    retrieval_latency_ms float,
    total_latency_ms float,
    raw_generated_count int,
    critic_passed_count int,
    grounding_passed_count int,
    final_valid_count int,
    critic_result text,
    grounding_score float,
    final_status text,                -- 'success', 'abstained', 'failed', 'partial'
    abstain_reason text,              -- 'INSUFFICIENT_CONTEXT' etc.
    retry_count int DEFAULT 0,
    fallback_used boolean DEFAULT false,
    error_message text,
    token_usage_input int,
    token_usage_output int,
    created_at timestamp with time zone DEFAULT now()
);

-- Index for querying by document and status
CREATE INDEX IF NOT EXISTS generation_logs_doc_id_idx ON public.generation_logs(document_id);
CREATE INDEX IF NOT EXISTS generation_logs_status_idx ON public.generation_logs(final_status);
CREATE INDEX IF NOT EXISTS generation_logs_created_idx ON public.generation_logs(created_at DESC);

-- ═══════════════════════════════════════════════════════════════════════
-- 2. Add FTS column + indexes on document_chunks (if not exists)
-- ═══════════════════════════════════════════════════════════════════════
-- Note: ALTER TABLE ADD COLUMN IF NOT EXISTS with GENERATED ALWAYS
-- requires a workaround since IF NOT EXISTS doesn't work with generated columns.
-- We use DO block to check first.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'document_chunks' 
        AND column_name = 'fts'
    ) THEN
        ALTER TABLE public.document_chunks 
        ADD COLUMN fts tsvector 
        GENERATED ALWAYS AS (to_tsvector('english', coalesce(content, ''))) STORED;
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS document_chunks_fts_idx ON public.document_chunks USING gin(fts);
CREATE INDEX IF NOT EXISTS document_chunks_doc_id_idx ON public.document_chunks(document_id);

-- ═══════════════════════════════════════════════════════════════════════
-- 3. Verify bloomLevel, reject columns exist on GeneratedQuestion
--    (Schema shows they already exist, but adding IF NOT EXISTS for safety)
-- ═══════════════════════════════════════════════════════════════════════
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'GeneratedQuestion' 
        AND column_name = 'bloomLevel'
    ) THEN
        ALTER TABLE public."GeneratedQuestion" ADD COLUMN "bloomLevel" text;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'GeneratedQuestion' 
        AND column_name = 'reject_reason'
    ) THEN
        ALTER TABLE public."GeneratedQuestion" ADD COLUMN reject_reason text;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'GeneratedQuestion' 
        AND column_name = 'rejected_by'
    ) THEN
        ALTER TABLE public."GeneratedQuestion" ADD COLUMN rejected_by text;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'GeneratedQuestion' 
        AND column_name = 'reject_note'
    ) THEN
        ALTER TABLE public."GeneratedQuestion" ADD COLUMN reject_note text;
    END IF;
END $$;

-- ═══════════════════════════════════════════════════════════════════════
-- 4. Create/update the hybrid search RPC v2 (with document_chunks FTS)
-- ═══════════════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION match_document_chunks_v2(
    query_text text,
    query_embedding vector,
    match_count int DEFAULT 10,
    filter_doc_id text DEFAULT ''
)
RETURNS TABLE (
    id uuid, 
    content text,
    metadata jsonb,
    score float
)
LANGUAGE sql
AS $$
WITH vector_search AS (
    SELECT
        dc.id,
        dc.content,
        dc.metadata,
        1 - ((dc.embedding::halfvec(3072)) <=> (query_embedding::halfvec(3072))) AS similarity_score,
        row_number() OVER (ORDER BY (dc.embedding::halfvec(3072)) <=> (query_embedding::halfvec(3072))) AS vector_rank
    FROM
        public.document_chunks dc
    WHERE
        (filter_doc_id = '' OR dc.document_id::text = filter_doc_id)
    ORDER BY
        (dc.embedding::halfvec(3072)) <=> (query_embedding::halfvec(3072))
    LIMIT 100
),
fts_search AS (
    SELECT
        dc.id,
        dc.content,
        dc.metadata,
        ts_rank(dc.fts, websearch_to_tsquery('english', query_text)) AS text_score,
        row_number() OVER (ORDER BY ts_rank(dc.fts, websearch_to_tsquery('english', query_text)) DESC) AS text_rank
    FROM
        public.document_chunks dc
    WHERE
        dc.fts @@ websearch_to_tsquery('english', query_text)
        AND (filter_doc_id = '' OR dc.document_id::text = filter_doc_id)
    ORDER BY
        text_score DESC
    LIMIT 100
)
SELECT
    coalesce(v.id, f.id) AS id,
    coalesce(v.content, f.content) AS content,
    coalesce(v.metadata, f.metadata) AS metadata,
    coalesce(1.0 / (60 + v.vector_rank), 0.0) + coalesce(1.0 / (60 + f.text_rank), 0.0) AS score
FROM
    vector_search v
    FULL OUTER JOIN fts_search f ON v.id = f.id
ORDER BY
    score DESC
LIMIT
    match_count;
$$;

