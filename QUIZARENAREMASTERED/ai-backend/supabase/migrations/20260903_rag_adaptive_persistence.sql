-- ═══════════════════════════════════════════════════════════════════════
-- QuizArena Migration: Adaptive Question Pools & Run Tracking
-- Date: 2026-09-03
-- ═══════════════════════════════════════════════════════════════════════

DO $$
BEGIN
    -- 1. Add is_adaptive to generation_runs if not exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'generation_runs' 
        AND column_name = 'is_adaptive'
    ) THEN
        ALTER TABLE public.generation_runs ADD COLUMN is_adaptive boolean DEFAULT true;
    END IF;

    -- 2. Add target_pool_size to generation_runs if not exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'generation_runs' 
        AND column_name = 'target_pool_size'
    ) THEN
        ALTER TABLE public.generation_runs ADD COLUMN target_pool_size int;
    END IF;

    -- 3. Ensure GeneratedQuestion has estimatedDifficulty, bloomLevel, answerData, request_id
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'GeneratedQuestion' 
        AND column_name = 'request_id'
    ) THEN
        ALTER TABLE public."GeneratedQuestion" ADD COLUMN request_id uuid REFERENCES public.generation_runs(request_id) ON DELETE SET NULL;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'GeneratedQuestion' 
        AND column_name = 'answerData'
    ) THEN
        ALTER TABLE public."GeneratedQuestion" ADD COLUMN "answerData" jsonb;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'GeneratedQuestion' 
        AND column_name = 'estimatedDifficulty'
    ) THEN
        ALTER TABLE public."GeneratedQuestion" ADD COLUMN "estimatedDifficulty" float;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'GeneratedQuestion' 
        AND column_name = 'bloomLevel'
    ) THEN
        ALTER TABLE public."GeneratedQuestion" ADD COLUMN "bloomLevel" text;
    END IF;

    -- 4. Create index on GeneratedQuestion(request_id) for fast verification & deduplication
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE schemaname = 'public' 
        AND tablename = 'GeneratedQuestion' 
        AND indexname = 'generated_question_request_id_idx'
    ) THEN
        CREATE INDEX generated_question_request_id_idx ON public."GeneratedQuestion"(request_id);
    END IF;
END $$;

