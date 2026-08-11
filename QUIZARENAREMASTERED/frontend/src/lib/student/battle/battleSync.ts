import dotenv from 'dotenv';
import path from 'path';
import { WebSocket } from 'ws';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 🔍 CHECKER 1: Environment & Client Initialization
console.log('\n[BattleSync Init] Checking configuration...');
console.log(`- Supabase URL: ${supabaseUrl ? '✅ Found' : '❌ Missing'}`);
console.log(`- Service Key Present: ${supabaseServiceKey ? '✅ Yes' : '❌ No'}`);

if (!supabaseUrl) {
  throw new Error('[BattleSync] Supabase URL is missing from environment variables.');
}

export const supabaseAdmin: SupabaseClient = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  realtime: {
    transport: WebSocket,
  },
});

export interface PlayerResult {
  userId?: string;
  id?: string;
  score?: number;
  correctAnswers?: number;
  totalQuestions?: number;
  accuracy?: number;
}

export interface FinalBattleData {
  battleId: string;
  roomCode?: string;
  battleMode?: 'LIVE' | 'SELF_PACED' | 'TEAM' | 'ROYALE';
  players?: PlayerResult[];
}

/**
 * Persists final battle results into Supabase once a session ends.
 */
export async function finalizeAndSaveBattle(data: FinalBattleData): Promise<boolean> {
  const { battleId, roomCode, battleMode = 'LIVE', players = [] } = data;

  // 🔍 CHECKER 2: Incoming Function Arguments
  console.log('\n=================== [BattleSync Execution Start] ===================');
  console.log('[BattleSync Input] battleId (section_id):', battleId);
  console.log('[BattleSync Input] roomCode:', roomCode);
  console.log('[BattleSync Input] battleMode:', battleMode);
  console.log('[BattleSync Input] Total Players Passed:', players.length);
  console.log('[BattleSync Input] Full Raw Payload:', JSON.stringify(data, null, 2));
  console.log('====================================================================\n');

  try {
    // 🔍 CHECKER 3: Before Quiz Sessions Update
    // FIX (3b): battleId is the section_id, NOT quiz_sessions.id. The old code
    // upserted with `id: battleId`, which either fails (id isn't a valid FK/PK
    // match) or silently creates/updates a completely different, fabricated
    // row — leaving the REAL active session's status stuck on 'ACTIVE' forever.
    // We now update the existing active row for this section instead.
    const sessionUpdatePayload = {
      status: 'COMPLETED',
      finished_at: new Date().toISOString(),
      mode: battleMode,
      ...(roomCode ? { room_code: roomCode } : {}),
    };
    console.log('[BattleSync DB Query] Updating quiz_sessions (by section_id) with:', sessionUpdatePayload);

    const { data: sessionData, error: sessionError } = await supabaseAdmin
      .from('quiz_sessions')
      .update(sessionUpdatePayload)
      .eq('section_id', battleId)
      .eq('status', 'ACTIVE')
      .select('id')
      .single();

if (sessionError || !sessionData) {
  console.error('❌ [BattleSync DB Error] Failed to update quiz_sessions:', sessionError);
  return false;
}

const actualSessionId = sessionData.id;
    console.log(`✅ [BattleSync DB Success] Resolved Primary Session UUID: ${actualSessionId}`);

    // 2. Format and upsert final player leaderboard results
    if (players && players.length > 0) {
      console.log(`\n[BattleSync Processing] Processing ${players.length} players for quiz_results...`);
      
      const sorted = [...players].sort((a, b) => (b.score || 0) - (a.score || 0));

      const records = sorted.map((p, index) => ({
        session_id: actualSessionId, // Links directly to quiz_sessions.id (UUID)
        room_code: roomCode,
        user_id: p.userId || p.id,
        score: p.score || 0,
        correct_answers: p.correctAnswers || 0,
        total_questions: p.totalQuestions || 0,
        accuracy: p.accuracy || 0,
        rank: index + 1,
        completed_at: new Date().toISOString(),
      }));

      // 🔍 CHECKER 4: Quiz Results Payload Check
      console.log('----------------- [Quiz Results Payload to DB] -----------------');
      console.log(JSON.stringify(records, null, 2));
      console.log('----------------------------------------------------------------\n');

      const { data: resultsData, error: resultsError } = await supabaseAdmin
        .from('quiz_results')
        .upsert(records, { onConflict: 'session_id,user_id' })
        .select();

      if (resultsError) {
        console.error('❌ [BattleSync DB Error] Failed to upsert quiz_results:', resultsError);
        return false;
      }

      console.log(`✅ [BattleSync DB Success] Successfully saved ${resultsData?.length || records.length} records into quiz_results.`);
    } else {
      console.warn('⚠️ [BattleSync Warning] No players provided in the payload. Skipped quiz_results insert.');
    }

    console.log(`\n=================== [BattleSync Execution Finished Successfully] ===================\n`);
    return true;
  } catch (err) {
    console.error('💥 [BattleSync Critical Failure] Unexpected error during sync execution:', err);
    return false;
  }
}
