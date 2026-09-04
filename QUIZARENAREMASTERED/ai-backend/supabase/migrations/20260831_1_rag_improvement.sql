-- Document Isolation and Observability Migration

-- 1. Create strict document_chunks table
create table if not exists public.document_chunks (
    id uuid default gen_random_uuid() primary key,
    document_id text not null, -- linking to your application's document ID
    content text not null,
    metadata jsonb default '{}'::jsonb,
    embedding vector(3072),
    fts tsvector generated always as (to_tsvector('english', coalesce(content, ''))) stored
);

create index if not exists document_chunks_fts_idx on public.document_chunks using gin(fts);
create index if not exists document_chunks_hnsw_idx on public.document_chunks using hnsw ((embedding::halfvec(3072)) halfvec_cosine_ops);
create index if not exists document_chunks_doc_id_idx on public.document_chunks(document_id);

-- 2. Create Observability generation_logs table
create table if not exists public.generation_logs (
    id uuid default gen_random_uuid() primary key,
    request_id text,
    document_id text,
    model text,
    dense_candidate_count int,
    fts_candidate_count int,
    generation_latency float,
    retrieval_latency float,
    critic_result text,
    grounding_score float,
    final_status text,
    created_at timestamp with time zone default now()
);

-- 3. Update the hybrid search RPC to strictly query document_chunks instead of string matching
create or replace function match_document_chunks_v2(
    query_text text,
    query_embedding vector,
    match_count int default 10,
    filter_doc_id text default ''
)
returns table (
    id uuid, 
    content text,
    metadata jsonb,
    score float
)
language sql
as $$
with vector_search as (
    select
        id,
        content,
        metadata,
        1 - ((embedding::halfvec(3072)) <=> (query_embedding::halfvec(3072))) as similarity_score,
        row_number() over (order by (embedding::halfvec(3072)) <=> (query_embedding::halfvec(3072))) as vector_rank
    from
        public.document_chunks
    where
        -- Strict document isolation (no LIKE matching)
        (filter_doc_id = '' or document_id = filter_doc_id)
    order by
        (embedding::halfvec(3072)) <=> (query_embedding::halfvec(3072))
    limit 100
),
fts_search as (
    select
        id,
        content,
        metadata,
        ts_rank(fts, websearch_to_tsquery('english', query_text)) as text_score,
        row_number() over (order by ts_rank(fts, websearch_to_tsquery('english', query_text)) desc) as text_rank
    from
        public.document_chunks
    where
        fts @@ websearch_to_tsquery('english', query_text)
        and (filter_doc_id = '' or document_id = filter_doc_id)
    order by
        text_score desc
    limit 100
)
select
    coalesce(v.id, f.id) as id,
    coalesce(v.content, f.content) as content,
    coalesce(v.metadata, f.metadata) as metadata,
    coalesce(1.0 / (60 + v.vector_rank), 0.0) + coalesce(1.0 / (60 + f.text_rank), 0.0) as score
from
    vector_search v
    full outer join fts_search f on v.id = f.id
order by
    score desc
limit
    match_count;
$$;

