'use client';

import React, { useState, useEffect } from 'react';
import { 
  Trophy, MessageSquare, Flame, Sparkles, Volume2, Wifi, 
  Crown, Send, ThumbsUp, HelpCircle, Lightbulb, CheckCircle, 
  LogOut, Shield, ChevronRight, Zap 
} from 'lucide-react';

const C = {
  bgDark: "#131524",
  cardBg: "#1C1F33",
  cardBorder: "rgba(255,255,255,0.08)",
  purpleAccent: "#5B3DF6",
  purpleGlow: "rgba(91,61,246,0.3)",
  greenConfirm: "#2ED47A",
  coralAccent: "#FF6B4A",
  yellowAccent: "#FFC93C",
  selectedOptionBg: "#632A38",
  selectedOptionBorder: "#FF5C5C",
  unselectedOptionBg: "rgba(255,255,255,0.03)",
  textMain: "#FFFFFF",
  textMuted: "#8F93A8",
};

interface TeamBattleProps {
  battleId?: string;
}

export function TeamBattle({ battleId = "" }: TeamBattleProps) {
  // Your team battle logic here...
}

interface TeamMember {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  hasVoted: boolean;
  isLeader?: boolean;
}

interface ChatMessage {
  id: string;
  senderInitials: string;
  senderName: string;
  avatarColor: string;
  text: string;
}

interface TeamScore {
  rank: number;
  name: string;
  icon: string;
  playersCount: number;
  score: number;
  isMyTeam?: boolean;
  color: string;
}

export function LiveBattleView() {
  const [selectedOption, setSelectedOption] = useState<string>('B');
  const [timer, setTimer] = useState<number>(18);
  const [chatInput, setChatInput] = useState<string>('');

  const [teamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'You (Alex M.)', initials: 'AM', avatarColor: '#5B3DF6', hasVoted: true, isLeader: true },
    { id: '2', name: 'Ana R.', initials: 'AR', avatarColor: '#B06EF6', hasVoted: true },
    { id: '3', name: 'Ben A.', initials: 'BA', avatarColor: '#FFC93C', hasVoted: true },
    { id: '4', name: 'Lea F.', initials: 'LF', avatarColor: '#00BCD4', hasVoted: false },
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', senderInitials: 'AR', senderName: 'Ana R.', avatarColor: '#B06EF6', text: "I think it's B — binary search divides in half each time!" },
    { id: '2', senderInitials: 'BA', senderName: 'Ben A.', avatarColor: '#FFC93C', text: "Same, B for sure 👍" },
    { id: '3', senderInitials: 'AM', senderName: 'Alex M.', avatarColor: '#5B3DF6', text: "Agreed. B is O(log n)." },
  ]);

  const [leaderboard] = useState<TeamScore[]>([
    { rank: 1, name: 'Indigo Phoenix', icon: '🔥', playersCount: 4, score: 4200, isMyTeam: true, color: C.purpleAccent },
    { rank: 2, name: 'Coral Dragons', icon: '🐉', playersCount: 4, score: 3980, color: C.coralAccent },
    { rank: 3, name: 'Yellow Bolts', icon: '⚡', playersCount: 3, score: 3140, color: C.yellowAccent },
    { rank: 4, name: 'Green Vipers', icon: '🐍', playersCount: 2, score: 2620, color: C.greenConfirm },
  ]);

  const options = [
    { key: 'A', text: 'O(n)', percentage: 25 },
    { key: 'B', text: 'O(log n)', percentage: 75 },
    { key: 'C', text: 'O(n log n)', percentage: 0 },
    { key: 'D', text: 'O(1)', percentage: 0 },
  ];

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        senderInitials: 'AM',
        senderName: 'Alex M.',
        avatarColor: C.purpleAccent,
        text: chatInput,
      },
    ]);
    setChatInput('');
  };

  return (
    <div style={{ background: C.bgDark, minHeight: '100vh', color: C.textMain, fontFamily: "'Manrope', sans-serif", display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navbar */}
      <header style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${C.cardBorder}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: 18, color: '#FFF' }}>
            <div style={{ width: 28, height: 28, background: C.purpleAccent, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={16} fill="#FFF" color="transparent" />
            </div>
            QuizArena
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: C.textMuted }}>
            <span>Battle Lobby</span>
            <ChevronRight size={12} />
            <span style={{ color: '#FFF', fontWeight: 600 }}>Live Battle</span>
            <ChevronRight size={12} />
            <span>Battle Results</span>
          </div>
        </div>

        {/* Progress Bar & Timer */}
        <div style={{ flex: 1, maxWidth: 500, margin: '0 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, whiteSpace: 'nowrap' }}>
            Question <b style={{ color: '#FFF', fontSize: 14 }}>3 / 10</b>
          </span>
          <div style={{ flex: 1, height: 10, background: 'rgba(255,255,255,0.08)', borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ width: '30%', height: '100%', background: `linear-gradient(90deg, ${C.yellowAccent}, ${C.coralAccent})`, borderRadius: 20 }} />
          </div>
          <div style={{ width: 34, height: 34, borderRadius: '50%', border: `2px solid ${C.yellowAccent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: C.yellowAccent }}>
            {timer}
          </div>
        </div>

        {/* Right Info Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ background: 'rgba(91,61,246,0.15)', border: `1px solid ${C.purpleAccent}`, padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, color: C.purpleAccent, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Flame size={14} fill={C.coralAccent} color="transparent" /> Indigo Phoenix
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, color: C.textMuted, display: 'flex', alignItems: 'center', gap: 6 }}>
            <MessageSquare size={13} /> DISCUSSION
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, color: C.yellowAccent, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={13} fill={C.yellowAccent} color="transparent" /> 200
          </div>
          <div style={{ display: 'flex', gap: 6, color: C.textMuted }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Volume2 size={14} /></div>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Wifi size={14} /></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: 20 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: C.purpleAccent, fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>AL</div>
            <span style={{ fontSize: 12, fontWeight: 600 }}>Alex M.</span>
          </div>
          <button style={{ background: 'rgba(255,71,87,0.15)', border: 'none', color: '#FF4757', padding: '6px 12px', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
            <LogOut size={13} /> Logout
          </button>
        </div>
      </header>

      {/* Main Grid Content */}
      <div style={{ flex: 1, padding: 20, display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, minHeight: 0 }}>
        
        {/* Left Interactive Quiz Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 }}>
          
          {/* Question Box */}
          <div style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 20, padding: '20px 24px', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ background: 'rgba(91,61,246,0.15)', color: C.purpleAccent, fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 6, textTransform: 'uppercase' }}>Computer Science</span>
                <span style={{ background: 'rgba(255,255,255,0.05)', color: C.textMuted, fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, textTransform: 'uppercase' }}>Multiple Choice</span>
              </div>
              <span style={{ background: 'rgba(91,61,246,0.2)', color: '#A391FF', border: `1px solid ${C.purpleAccent}`, padding: '2px 10px', borderRadius: 12, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Flame size={12} fill="#A391FF" /> Indigo Phoenix
              </span>
            </div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, lineHeight: 1.4 }}>
              What is the time complexity of searching for an element in a balanced Binary Search Tree?
            </h2>
          </div>

          {/* Player Voted Avatars Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {teamMembers.map((member) => (
                <div key={member.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, position: 'relative' }}>
                  {member.isLeader && (
                    <div style={{ position: 'absolute', top: -10, zIndex: 2 }}>
                      <Crown size={12} fill={C.yellowAccent} color={C.yellowAccent} />
                    </div>
                  )}
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: member.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, position: 'relative', border: '2px solid rgba(255,255,255,0.1)' }}>
                    {member.initials}
                    {member.hasVoted && (
                      <div style={{ position: 'absolute', bottom: -2, right: -2, background: C.greenConfirm, width: 12, height: 12, borderRadius: '50%', border: `2px solid ${C.bgDark}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircle size={8} color="#000" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: 10, color: C.textMuted, fontWeight: 600 }}>{member.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.textMuted }}>
              <b style={{ color: '#FFF' }}>3</b>/4 ANSWERED
            </span>
          </div>

          {/* Options Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {options.map((opt) => {
              const isSelected = selectedOption === opt.key;
              return (
                <div
                  key={opt.key}
                  onClick={() => setSelectedOption(opt.key)}
                  style={{
                    background: isSelected ? C.selectedOptionBg : C.unselectedOptionBg,
                    border: `1.5px solid ${isSelected ? C.selectedOptionBorder : C.cardBorder}`,
                    borderRadius: 14,
                    padding: '14px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {/* Option Fill bar for team percentage */}
                  {opt.percentage > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${opt.percentage}%`,
                        background: isSelected ? 'rgba(255,92,92,0.15)' : 'rgba(255,255,255,0.03)',
                        pointerEvents: 'none',
                      }}
                    />
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, zIndex: 1 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: isSelected ? C.coralAccent : 'rgba(255,255,255,0.08)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13 }}>
                      {opt.key}
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 15, color: isSelected ? '#FFF' : 'rgba(255,255,255,0.85)' }}>
                      {opt.text}
                    </span>
                  </div>

                  <span style={{ zIndex: 1, fontWeight: 800, fontSize: 12, color: isSelected ? C.coralAccent : C.textMuted }}>
                    {opt.percentage}%
                  </span>
                </div>
              );
            })}
          </div>

          {/* Team Discussion & Votes Sub-Panel */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 12, marginTop: 'auto' }}>
            
            {/* Team Chat Discussion Box */}
            <div style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 16, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: C.textMuted, display: 'flex', alignItems: 'center', gap: 6, textTransform: 'uppercase' }}>
                  <MessageSquare size={12} /> Team Discussion
                </span>
                <span style={{ fontSize: 10, background: 'rgba(255,201,60,0.15)', color: C.yellowAccent, padding: '2px 8px', borderRadius: 10, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Crown size={10} /> Alex leads
                </span>
              </div>

              {/* Chat Messages Log */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 90, overflowY: 'auto' }}>
                {chatMessages.map((msg) => (
                  <div key={msg.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 11 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: msg.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 8, flexShrink: 0 }}>
                      {msg.senderInitials}
                    </div>
                    <div>
                      <b style={{ color: C.textMuted, marginRight: 6 }}>{msg.senderName}</b>
                      <span>{msg.text}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input Box */}
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', background: 'rgba(255,255,255,0.04)', padding: '6px 10px', borderRadius: 10, border: `1px solid ${C.cardBorder}` }}>
                <div style={{ display: 'flex', gap: 4, color: C.textMuted }}>
                  <ThumbsUp size={13} style={{ cursor: 'pointer' }} />
                  <Flame size={13} style={{ cursor: 'pointer' }} />
                  <HelpCircle size={13} style={{ cursor: 'pointer' }} />
                  <Lightbulb size={13} style={{ cursor: 'pointer' }} />
                </div>
                <input
                  type="text"
                  placeholder="Discuss with team..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  style={{ flex: 1, background: 'transparent', border: 'none', color: '#FFF', fontSize: 11, outline: 'none' }}
                />
                <button type="button" onClick={handleSendMessage} style={{ background: C.purpleAccent, border: 'none', borderRadius: 6, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', cursor: 'pointer' }}>
                  <Send size={11} />
                </button>
              </div>
            </div>

            {/* Team Votes Aggregation Breakdown */}
            <div style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 16, padding: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: C.textMuted, textTransform: 'uppercase', marginBottom: 4 }}>
                Team Votes
              </span>
              {options.map((opt) => (
                <div key={opt.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '4px 8px', borderRadius: 6, fontSize: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontWeight: 800, color: opt.key === 'B' ? C.coralAccent : C.textMuted }}>{opt.key}</span>
                    <span style={{ color: C.textMuted }}>{opt.text}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: opt.percentage > 0 ? '#FFF' : C.textMuted }}>
                    {opt.percentage}%
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Confirm Button */}
          <button style={{ width: '100%', background: C.greenConfirm, border: 'none', borderRadius: 14, padding: '16px 0', color: '#000', fontWeight: 800, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 20px rgba(46,212,122,0.3)' }}>
            <Crown size={18} fill="#000" /> Confirm Final Answer <CheckCircle size={18} />
          </button>

        </div>

        {/* Right Sidebar - Team Score Board */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          {/* Live Standings Panel */}
          <div style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 20, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Trophy size={14} color={C.yellowAccent} /> Team Battle
              </span>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#FF4757', background: 'rgba(255,71,87,0.15)', padding: '2px 6px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF4757' }} /> LIVE
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {leaderboard.map((team) => (
                <div
                  key={team.name}
                  style={{
                    background: team.isMyTeam ? 'rgba(91,61,246,0.18)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${team.isMyTeam ? C.purpleAccent : 'transparent'}`,
                    borderRadius: 12,
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: C.textMuted }}>#{team.rank}</span>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                      {team.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 4 }}>
                        {team.name}
                        {team.isMyTeam && <span style={{ fontSize: 8, background: C.purpleAccent, color: '#FFF', padding: '1px 4px', borderRadius: 4 }}>YOUR TEAM</span>}
                      </div>
                      <span style={{ fontSize: 10, color: C.textMuted, fontWeight: 600 }}>{team.playersCount} players</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 800, color: team.isMyTeam ? '#A391FF' : '#FFF' }}>
                    {team.score.toLocaleString()} <span style={{ fontSize: 9, color: C.textMuted }}>PTS</span>
                  </span>
                </div>
              ))}
            </div>

            {/* Score Gap Indicator */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: `1px dashed ${C.cardBorder}`, borderRadius: 10, padding: 10, fontSize: 11 }}>
              <span style={{ color: C.textMuted, fontWeight: 700, textTransform: 'uppercase', fontSize: 9, display: 'block', marginBottom: 2 }}>SCORE GAP</span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, color: C.yellowAccent, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Sparkles size={12} /> You're in the lead! 🔥
                </span>
                <span style={{ color: C.greenConfirm, fontWeight: 800 }}>+220 pts</span>
              </div>
            </div>
          </div>

          {/* Discussion Mode Info Card */}
          <div style={{ background: 'rgba(91,61,246,0.1)', border: `1px solid rgba(91,61,246,0.2)`, borderRadius: 16, padding: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: C.purpleAccent, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Shield size={14} /> Discussion Mode
            </span>
            <p style={{ margin: 0, fontSize: 10, color: C.textMuted, lineHeight: 1.5 }}>
              Team votes together. Alex M. confirms the final answer for the team.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default LiveBattleView;