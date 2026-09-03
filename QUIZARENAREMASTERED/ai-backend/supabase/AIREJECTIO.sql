-- 2. AI Automated Catch Rate (Critic Efficiency)
-- Shows how many low-quality questions the AI caught and rejected before saving.
SELECT 
    SUM(raw_generated) as total_candidates_generated,
    SUM(validated_count) as total_passed_critic,
    SUM(raw_generated - validated_count) as total_caught_by_system,
    ROUND(SUM(raw_generated - validated_count)::numeric / NULLIF(SUM(raw_generated), 0) * 100, 2) as ai_rejection_rate_pct
FROM public.generation_runs
WHERE status = 'COMPLETED';