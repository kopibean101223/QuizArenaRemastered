-- =======================================================
-- PROFESSOR HUMAN-EVALUATION METRICS
-- =======================================================

-- 1. Human Approval vs Rejection Rate
-- Shows what percentage of AI-generated questions the professors actually kept.
SELECT 
    COUNT(*) as total_reviewed_by_professor,
    SUM(CASE WHEN status = 'APPROVED' THEN 1 ELSE 0 END) as total_approved,
    SUM(CASE WHEN status = 'REJECTED' THEN 1 ELSE 0 END) as total_rejected,
    ROUND(SUM(CASE WHEN status = 'APPROVED' THEN 1 ELSE 0 END)::numeric / NULLIF(COUNT(*), 0) * 100, 2) as human_approval_rate_pct
FROM public."GeneratedQuestion"
WHERE status IN ('APPROVED', 'REJECTED');

-- 2. Why are professors rejecting the AI questions? (Rejection Analysis)
-- Groups the rejected questions by the reason provided by the professor.
SELECT 
    reject_reason as professor_rejection_reason,
    COUNT(*) as total_rejections,
    ROUND(COUNT(*)::numeric / SUM(COUNT(*)) OVER() * 100, 2) as percentage_of_rejections
FROM public."GeneratedQuestion"
WHERE status = 'REJECTED' AND reject_reason IS NOT NULL
GROUP BY reject_reason
ORDER BY total_rejections DESC;

-- 3. Review Pending Queue
-- How many questions are sitting in the database waiting for a professor to review them?
SELECT 
    COUNT(*) as total_pending_review
FROM public."GeneratedQuestion"
WHERE status = 'PENDING';