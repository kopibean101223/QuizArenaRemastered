-- Fix document_id type mismatch in document_chunks
-- The frontend uses integer IDs (like 122) for SyllabusDoc, but document_chunks was expecting a UUID.

ALTER TABLE public.document_chunks
ALTER COLUMN document_id TYPE text USING document_id::text;

