-- QuizArena AI Generation Pipeline v2 Migration
-- Run this in Supabase SQL Editor
-- Date: 2026-09-02

-- ═══════════════════════════════════════════════════════════════════════
-- 1. generation_runs table — Persistent run tracking (Phase 4 of Spec)
-- ═══════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.generation_runs (
    request_id uuid PRIMARY KEY,
    document_id int NOT NULL,
    user_id uuid NOT NULL,
    status text DEFAULT 'QUEUED', -- QUEUED, RETRIEVING, GENERATING, VALIDATING, SAVING, COMPLETED, PARTIAL, FAILED
    stage text DEFAULT 'Initializing...',
    progress float DEFAULT 0.0,
    requested_count int,
    types text[],
    raw_generated int DEFAULT 0,
    validated_count int DEFAULT 0,
    saved_count int DEFAULT 0,
    error_message text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS generation_runs_user_idx ON public.generation_runs(user_id);
CREATE INDEX IF NOT EXISTS generation_runs_doc_idx ON public.generation_runs(document_id);

-- Enable RLS on generation_runs
ALTER TABLE public.generation_runs ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own runs
CREATE POLICY "Users can view own generation runs"
    ON public.generation_runs FOR SELECT
    USING (auth.uid() = user_id);

-- Allow backend service role to do everything
CREATE POLICY "Service role can manage generation runs"
    ON public.generation_runs
    USING (true)
    WITH CHECK (true);

-- ═══════════════════════════════════════════════════════════════════════
-- 2. Add structural & metadata columns to GeneratedQuestion
-- ═══════════════════════════════════════════════════════════════════════
DO $$
BEGIN
    -- request_id (links back to generation_runs)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'GeneratedQuestion' 
        AND column_name = 'request_id'
    ) THEN
        ALTER TABLE public."GeneratedQuestion" ADD COLUMN request_id uuid REFERENCES public.generation_runs(request_id) ON DELETE SET NULL;
    END IF;

    -- answerData (Structured JSONB for Step-by-step, Numerical, Graphing, etc.)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'GeneratedQuestion' 
        AND column_name = 'answerData'
    ) THEN
        ALTER TABLE public."GeneratedQuestion" ADD COLUMN "answerData" jsonb;
    END IF;

    -- estimatedDifficulty (0.00 to 1.00 numeric difficulty)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'GeneratedQuestion' 
        AND column_name = 'estimatedDifficulty'
    ) THEN
        ALTER TABLE public."GeneratedQuestion" ADD COLUMN "estimatedDifficulty" float;
    END IF;

    -- Ensure bloomLevel exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'GeneratedQuestion' 
        AND column_name = 'bloomLevel'
    ) THEN
        ALTER TABLE public."GeneratedQuestion" ADD COLUMN "bloomLevel" text;
    END IF;

    -- Ensure reject tracking columns exist
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

