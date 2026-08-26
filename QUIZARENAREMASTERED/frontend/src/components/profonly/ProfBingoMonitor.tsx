'use client';

import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, CircleHelp, Clock3, Grid3X3, MessageCircle, Shield, Trophy, Users, XCircle, Zap } from 'lucide-react';

type MonitorPlayer = { id: string; name: string; wins?: number; stealBuffs?: number; retakeBuffs?: number; bingo?: boolean };
type AnswerEvent = { playerId: string; isCorrect: boolean; timestamp: number };
type QuestionEvent = { round: number; number: number | null; question: any; timestamp: number };
type ChatEvent = { sender: string; message: string; timestamp: number };

interface Props {
  roomCode: string;
  players: MonitorPlayer[];
  phase: string;
  phaseSeconds: number;
  round: number;
  rolledNumber: number | null;
  eligiblePlayerIds: string[];
  answeredPlayerIds: string[];
  question: any;
  answerEvents: AnswerEvent[];
  questionEvents: QuestionEvent[];
  chatEvents: ChatEvent[];
}

const phaseColors: Record<string, string> = { rolling: '#5BC8F6', stealing: '#FFC93C', question: '#2ED47A', retake: '#FF9F40', finished: '#FF4757' };

export function ProfBingoMonitor({ roomCode, players, phase, phaseSeconds, round, rolledNumber, eligiblePlayerIds, answeredPlayerIds, question, answerEvents, questionEvents, chatEvents }: Props) {
  const phaseColor = phaseColors[phase] || '#FFC93C';
  const [displayPhaseSeconds, setDisplayPhaseSeconds] = useState(phaseSeconds);
  const answered = new Set(answeredPlayerIds);
  const answerByPlayer = useMemo(() => new Map(answerEvents.map((event) => [event.playerId, event])), [answerEvents]);
  const questionText = question?.text || question?.question || 'Waiting for the next question.';
  const phaseEnding = displayPhaseSeconds > 0 && displayPhaseSeconds <= 5;

  useEffect(() => {
    setDisplayPhaseSeconds(phaseSeconds);
  }, [phaseSeconds, phase]);

  useEffect(() => {
    if (displayPhaseSeconds <= 0) return;
    const timer = window.setInterval(() => setDisplayPhaseSeconds((seconds) => Math.max(0, seconds - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [displayPhaseSeconds]);

  return (
    <div style={{ minHeight: '100%', background: '#111522', color: '#F8FAFC', padding: '28px', fontFamily: 'Manrope, sans-serif' }}>
      <style>{`@keyframes profBingoPulse { 0%,100% { opacity: 1 } 50% { opacity: .45 } }`}</style>
      <header style={{ maxWidth: 1280, margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div><p style={{ margin: 0, color: '#FFC93C', fontSize: 11, fontWeight: 900, letterSpacing: '.14em', textTransform: 'uppercase' }}>Professor monitor</p><h1 style={{ margin: '5px 0 0', fontSize: 30, fontWeight: 900 }}>Bingo Arena</h1><p style={{ margin: '5px 0 0', color: 'rgba(255,255,255,.5)', fontSize: 12 }}>Room {roomCode || 'connecting'} · Round {round || 0}</p></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><div style={{ display: 'flex', alignItems: 'center', color: phaseColor, fontWeight: 900, fontSize: 13, textTransform: 'uppercase' }}><span style={{ width: 9, height: 9, marginRight: 8, borderRadius: '50%', background: phaseColor, animation: 'profBingoPulse 1.2s infinite' }} />{phase}</div><div style={{ minWidth: 92, textAlign: 'center', border: `2px solid ${phaseEnding ? '#FF4757' : phaseColor}`, borderRadius: 12, padding: '7px 12px', color: phaseEnding ? '#FF4757' : phaseColor, background: phaseEnding ? 'rgba(255,71,87,.12)' : `${phaseColor}12`, fontWeight: 900, fontSize: 18, animation: phaseEnding ? 'profBingoPulse .7s infinite' : 'none' }}>{displayPhaseSeconds > 0 ? `${displayPhaseSeconds}s` : '--'}<span style={{ display: 'block', fontSize: 9, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.55)' }}>remaining</span></div><div style={{ display: 'flex', alignItems: 'center', gap: 7, border: '1px solid rgba(255,255,255,.12)', borderRadius: 10, padding: '9px 12px', fontSize: 12 }}><Grid3X3 size={16} color="#FFC93C" /> {players.length} students</div></div>
      </header>

      <main style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: 18 }}>
        <section style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '190px 1fr', gap: 18 }}>
            <div style={{ border: `1px solid ${phaseColor}66`, borderRadius: 18, padding: 20, background: `${phaseColor}12` }}><p style={{ margin: 0, color: 'rgba(255,255,255,.5)', fontSize: 11, textTransform: 'uppercase', fontWeight: 800 }}>System draw</p><div style={{ fontSize: 54, lineHeight: 1, fontWeight: 900, marginTop: 15, color: phaseColor }}>{rolledNumber ?? '--'}</div><strong style={{ color: phaseColor, fontSize: 19 }}>{rolledNumber ? (rolledNumber <= 15 ? 'B' : rolledNumber <= 30 ? 'I' : rolledNumber <= 45 ? 'N' : rolledNumber <= 60 ? 'G' : 'O') : '?'}</strong></div>
            <div style={{ border: '1px solid rgba(255,255,255,.1)', borderRadius: 18, padding: 20, background: 'rgba(255,255,255,.045)' }}><div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#FFC93C', fontSize: 11, fontWeight: 900, textTransform: 'uppercase' }}><CircleHelp size={15} /> Current question</div><h2 style={{ margin: '14px 0 8px', fontSize: 19 }}>{questionText}</h2><p style={{ margin: 0, color: 'rgba(255,255,255,.5)', fontSize: 12 }}>{eligiblePlayerIds.length} eligible · {answered.size} answered</p></div>
          </div>

          <section style={{ border: '1px solid rgba(255,255,255,.1)', borderRadius: 18, background: 'rgba(255,255,255,.045)', padding: 20 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}><h2 style={{ margin: 0, fontSize: 18, display: 'flex', alignItems: 'center', gap: 8 }}><Users size={18} color="#2ED47A" /> Student activity</h2><span style={{ color: '#2ED47A', fontSize: 12, fontWeight: 800 }}>{answered.size}/{eligiblePlayerIds.length || 0} answered</span></div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 9 }}>{players.map((player) => { const event = answerByPlayer.get(player.id); const eligible = eligiblePlayerIds.includes(player.id); return <div key={player.id} style={{ border: '1px solid rgba(255,255,255,.09)', borderRadius: 12, padding: 12, background: eligible ? 'rgba(46,212,122,.08)' : 'rgba(0,0,0,.12)' }}><div style={{ display: 'flex', alignItems: 'center', gap: 9 }}><span style={{ width: 30, height: 30, borderRadius: '50%', display: 'grid', placeItems: 'center', background: '#5B3DF6', fontSize: 10, fontWeight: 900 }}>{player.name.slice(0, 2).toUpperCase()}</span><strong style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{player.name}</strong>{event ? event.isCorrect ? <CheckCircle2 size={17} color="#2ED47A" /> : <XCircle size={17} color="#FF4757" /> : <Clock3 size={16} color={eligible ? '#FFC93C' : 'rgba(255,255,255,.25)'} />}</div><div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 9, color: 'rgba(255,255,255,.5)', fontSize: 11 }}><span>{eligible ? (answered.has(player.id) ? 'Answered' : 'Thinking') : 'Not eligible'}</span><span>{player.wins || 0} wins</span></div></div> })}</div></section>

          <section style={{ border: '1px solid rgba(255,255,255,.1)', borderRadius: 18, background: 'rgba(255,255,255,.045)', padding: 20 }}><h2 style={{ margin: '0 0 14px', fontSize: 18, display: 'flex', alignItems: 'center', gap: 8 }}><Trophy size={18} color="#FFC93C" /> Question log</h2><div style={{ maxHeight: 250, overflowY: 'auto' }}>{questionEvents.length === 0 ? <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 12 }}>Questions will appear here as the server assigns them.</p> : questionEvents.slice().reverse().map((event, index) => <div key={`${event.timestamp}-${index}`} style={{ borderTop: '1px solid rgba(255,255,255,.08)', padding: '11px 0', fontSize: 12 }}><div style={{ display: 'flex', justifyContent: 'space-between', color: '#FFC93C', fontWeight: 800 }}><span>Round {event.round} · Number {event.number ?? '--'}</span><span>{new Date(event.timestamp).toLocaleTimeString()}</span></div><p style={{ margin: '5px 0 0', color: 'rgba(255,255,255,.75)' }}>{event.question?.text || event.question?.question || 'Question unavailable'}</p></div>)}</div></section>
        </section>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: 18 }}><section style={{ border: '1px solid rgba(255,255,255,.1)', borderRadius: 18, background: 'rgba(255,255,255,.045)', padding: 20 }}><h2 style={{ margin: '0 0 14px', fontSize: 18 }}>Live standings</h2>{players.slice().sort((a, b) => (b.wins || 0) - (a.wins || 0)).map((player, index) => <div key={player.id} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '10px 0', borderTop: '1px solid rgba(255,255,255,.07)' }}><b style={{ width: 22, color: index === 0 ? '#FFC93C' : 'rgba(255,255,255,.45)' }}>#{index + 1}</b><span style={{ flex: 1, fontSize: 12 }}>{player.name}</span><span style={{ color: '#2ED47A', fontSize: 12, fontWeight: 900 }}>{player.wins || 0}</span></div>)}</section><section style={{ border: '1px solid rgba(255,255,255,.1)', borderRadius: 18, background: 'rgba(255,255,255,.045)', padding: 20 }}><h2 style={{ margin: '0 0 14px', fontSize: 18, display: 'flex', alignItems: 'center', gap: 8 }}><MessageCircle size={17} color="#5BC8F6" /> Chat</h2><div style={{ maxHeight: 230, overflowY: 'auto' }}>{chatEvents.slice(-10).map((event, index) => <p key={`${event.timestamp}-${index}`} style={{ margin: '0 0 10px', fontSize: 11, color: 'rgba(255,255,255,.7)' }}><strong style={{ color: '#5BC8F6', marginRight: 6 }}>{event.sender}</strong>{event.message}</p>)}</div></section><div style={{ display: 'flex', gap: 9, alignItems: 'flex-start', color: 'rgba(255,255,255,.5)', fontSize: 11, lineHeight: 1.5 }}><Zap size={16} color="#FFC93C" />The server controls draws, phases, answer eligibility, buffs, and the Bingo win condition.</div></aside>
      </main>
    </div>
  );
}
