-- AIRAG Metrics Dashboard Queries
-- These queries calculate the required P1/P2 operational metrics.

-- 1. P50 / P95 Latency Measurement (Pipeline & Retrieval)
SELECT 
    percentile_cont(0.50) WITHIN GROUP (ORDER BY total_latency_ms) AS p50_total_latency_ms,
    percentile_cont(0.95) WITHIN GROUP (ORDER BY total_latency_ms) AS p95_total_latency_ms,
    percentile_cont(0.50) WITHIN GROUP (ORDER BY retrieval_latency_ms) AS p50_retrieval_latency_ms,
    percentile_cont(0.95) WITHIN GROUP (ORDER BY retrieval_latency_ms) AS p95_retrieval_latency_ms,
    percentile_cont(0.50) WITHIN GROUP (ORDER BY generation_latency_ms) AS p50_generation_latency_ms,
    percentile_cont(0.95) WITHIN GROUP (ORDER BY generation_latency_ms) AS p95_generation_latency_ms
FROM public.generation_logs
WHERE created_at >= now() - interval '30 days';

-- 2. Fallback & Rate Limit Tracking
SELECT 
    provider,
    COUNT(*) as total_requests,
    SUM(CASE WHEN fallback_used THEN 1 ELSE 0 END) as fallback_count,
    ROUND(SUM(CASE WHEN fallback_used THEN 1 ELSE 0 END)::numeric / COUNT(*) * 100, 2) as fallback_rate_pct,
    SUM(retry_count) as total_retries
FROM public.generation_logs
WHERE created_at >= now() - interval '30 days'
GROUP BY provider;

-- 3. Abstention & Quality Gate Rates (Automated Catch Rate)
SELECT 
    final_status,
    COUNT(*) as count,
    ROUND(COUNT(*)::numeric / SUM(COUNT(*)) OVER() * 100, 2) as percentage
FROM public.generation_logs
GROUP BY final_status;

-- 4. Rejection Reason Breakdown (Human vs System)
SELECT 
    rejected_by,
    reject_reason,
    COUNT(*) as rejection_count
FROM public."GeneratedQuestion"
WHERE status = 'REJECTED'
GROUP BY rejected_by, reject_reason
ORDER BY rejected_by, rejection_count DESC;

-- 5. Human-Only vs Automated Catch Rate
WITH TotalGenerated AS (
    SELECT COUNT(*) as total FROM public."GeneratedQuestion"
),
SystemRejects AS (
    SELECT COUNT(*) as system_caught FROM public."GeneratedQuestion" WHERE rejected_by = 'system'
),
HumanRejects AS (
    SELECT COUNT(*) as human_caught FROM public."GeneratedQuestion" WHERE rejected_by = 'human'
)
SELECT 
    t.total,
    s.system_caught,
    h.human_caught,
    ROUND(s.system_caught::numeric / NULLIF(t.total, 0) * 100, 2) as automated_catch_rate_pct,
    ROUND(h.human_caught::numeric / NULLIF(t.total - s.system_caught, 0) * 100, 2) as human_catch_rate_pct
FROM TotalGenerated t, SystemRejects s, HumanRejects h;

-- 6. Question Type Rejection Breakdown
SELECT 
    type,
    COUNT(*) as total_generated,
    SUM(CASE WHEN status = 'REJECTED' THEN 1 ELSE 0 END) as total_rejected,
    ROUND(SUM(CASE WHEN status = 'REJECTED' THEN 1 ELSE 0 END)::numeric / COUNT(*) * 100, 2) as rejection_rate_pct
FROM public."GeneratedQuestion"
GROUP BY type
ORDER BY rejection_rate_pct DESC;

