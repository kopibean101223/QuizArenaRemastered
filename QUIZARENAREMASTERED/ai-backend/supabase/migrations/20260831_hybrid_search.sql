-- Enable the pgvector extension to work with embedding vectors
create extension if not exists vector;

-- Add a generated column for full text search if it doesn't exist.
alter table public.documents 
add column if not exists fts tsvector generated always as (to_tsvector('english', coalesce(content, ''))) stored;

create index if not exists documents_fts_idx on public.documents using gin(fts);

-- Create HNSW index by casting the 3072-dimensional vector to half-precision (halfvec).
-- This bypasses the 2000-dimension limit for standard vector indexes while retaining near-perfect recall.
create index if not exists documents_hnsw_idx on public.documents using hnsw ((embedding::halfvec(3072)) halfvec_cosine_ops);

-- Create a function that implements Reciprocal Rank Fusion (RRF) for hybrid search
create or replace function match_document_chunks(
    query_text text,
    query_embedding vector, -- Accepts any dimension, including 3072
    match_count int default 10,
    doc_id_filter text default ''
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
        -- Must cast to halfvec(3072) to trigger the HNSW index
        1 - ((embedding::halfvec(3072)) <=> (query_embedding::halfvec(3072))) as similarity_score,
        row_number() over (order by (embedding::halfvec(3072)) <=> (query_embedding::halfvec(3072))) as vector_rank
    from
        public.documents
    where
        -- Only match if the document belongs to the requested syllabus
        (doc_id_filter = '' or id::text like doc_id_filter || '\_%')
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
        public.documents
    where
        fts @@ websearch_to_tsquery('english', query_text)
        and (doc_id_filter = '' or id::text like doc_id_filter || '\_%')
    order by
        text_score desc
    limit 100
)
select
    coalesce(v.id, f.id) as id,
    coalesce(v.content, f.content) as content,
    coalesce(v.metadata, f.metadata) as metadata,
    -- Reciprocal Rank Fusion formula: 1 / (rank + k), typical k=60
    coalesce(1.0 / (60 + v.vector_rank), 0.0) + coalesce(1.0 / (60 + f.text_rank), 0.0) as score
from
    vector_search v
    full outer join fts_search f on v.id = f.id
order by
    score desc
limit
    match_count;
$$;