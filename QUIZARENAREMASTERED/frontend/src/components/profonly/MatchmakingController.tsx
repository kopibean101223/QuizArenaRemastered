// frontend/src/components/profonly/MatchmakingController.tsx
import { useEffect, useState, useRef } from 'react';

export default function MatchmakingController({ professorId, sectionId }) {
  const [isLobbyOpen, setIsLobbyOpen] = useState(false);
  const [queuedStudents, setQueuedStudents] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);

  // We use sectionId as the battleId to tie the lobby directly to the class
  const battleId = sectionId; 

  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => console.log('Professor connected to Battle WS Server');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'MATCHMAKING_OPENED') {
        setIsLobbyOpen(true);
      } else if (data.type === 'QUEUE_UPDATE') {
        setQueuedStudents(data.count);
      } else if (data.type === 'BATTLE_STARTED') {
        // The battle has officially begun
        alert('Live Quiz has commenced!');
        // Router push to the live monitoring dashboard here
      }
    };

    return () => {
      ws.close();
    };
  }, [sectionId]);

  const openQueue = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'PROF_OPEN_MATCHMAKING',
        battleId,
        totalQuestions: 10 // Replace with actual quiz length
      }));
    }
  };

  const startBattle = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'PROF_START_BATTLE',
        battleId
      }));
    }
  };

  return (
    <div className="backdrop-blur-xl bg-black/40 border border-white/10 p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(0,255,255,0.05)] mt-8 max-w-lg">
      <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
        <span className="text-2xl">📡</span>
        <h2 className="text-2xl font-light text-white tracking-wide">Live Operations</h2>
      </div>
      
      {!isLobbyOpen ? (
        <button 
          onClick={openQueue}
          className="w-full relative group overflow-hidden bg-cyan-900/30 hover:bg-cyan-800/50 text-cyan-300 border border-cyan-500/50 font-medium py-4 px-6 rounded-xl transition-all duration-300 backdrop-blur-md"
        >
          <span className="relative z-10 tracking-[0.2em] text-sm font-semibold">INITIALIZE LOBBY</span>
          <div className="absolute inset-0 h-full w-0 bg-cyan-500/20 transition-all duration-500 ease-out group-hover:w-full"></div>
        </button>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between bg-black/50 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
              </span>
              <p className="text-gray-300 font-mono text-sm tracking-widest">NETWORK ACTIVE</p>
            </div>
          </div>
          
          <div className="text-center py-6 bg-white/5 rounded-xl border border-white/10 shadow-inner">
            <p className="text-xs text-cyan-500/70 uppercase tracking-widest mb-2 font-semibold">Subjects Connected</p>
            <p className="text-6xl font-light text-white font-mono drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
              {queuedStudents}
            </p>
          </div>
          
          <button 
            onClick={startBattle}
            disabled={queuedStudents === 0}
            className="w-full bg-rose-900/30 hover:bg-rose-800/50 text-rose-300 border border-rose-500/50 font-medium py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-md"
          >
            <span className="tracking-[0.2em] text-sm font-semibold">COMMENCE BATTLE</span>
          </button>
        </div>
      )}
    </div>
  );
}