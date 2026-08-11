import { useRef, useCallback } from 'react';

const BOT_NAMES = ['AlphaBot', 'BetaBot', 'GammaBot', 'DeltaBot', 'EchoBot', 'ZetaBot', 'OmegaBot', 'SigmaBot', 'ThetaBot'];
const TEAM_NAMES = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Sigma', 'Omega'];
const CHAT_MESSAGES = [
  "I'm pretty sure it's this one.",
  "Are we all voting the same?",
  "Let's go with the majority.",
  "Oops, I might have misclicked.",
  "This question is tricky!",
  "I'm voting for the first option."
];

export function useBotSimulator(
  battleId: string, 
  roomCode: string, 
  questions: any[], 
  mode: 'LIVE' | 'TEAM' = 'LIVE',
  teamSize: number = 1
) {
  const botsRef = useRef<WebSocket[]>([]);

  const spawnBots = useCallback((count: number) => {
    if (!battleId) return;

    for (let i = 0; i < count; i++) {
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';
      const ws = new WebSocket(wsUrl);
      
      const botId = `bot-${Math.random().toString(36).substr(2, 9)}`;
      const botName = `${BOT_NAMES[i % BOT_NAMES.length]}-${Math.floor(Math.random() * 100)}`;
      
      // Group bots into teams based on the teamSize setting
      const teamIndex = Math.floor(i / teamSize);
      const teamName = `Team ${TEAM_NAMES[teamIndex % TEAM_NAMES.length]}`;
      
      let currentScore = 0;

      ws.onopen = () => {
        // Join the battle room
        ws.send(JSON.stringify({ type: 'JOIN_BATTLE', battleId, roomCode, forceReset: false, team: teamName }));

        // Announce presence in the live chat feed with Team Name
        ws.send(JSON.stringify({
          type: 'BATTLE_ACTION',
          battleId,
          sender: `[${teamName}] ${botName}`,
          message: 'has joined the arena! 🤖',
          isJoinEvent: true,
          userId: botId,
          team: teamName,
          rawName: botName
        }));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          // Listen for the professor advancing the quiz
          if (data.type === 'PROF_START_BATTLE' || data.type === 'QUESTION_ADVANCED') {
            const qIndex = data.currentIndex || 0;
            const question = questions[qIndex];

            if (!question) return;

            // Simulate student thinking time (2 to 6 seconds)
            setTimeout(() => {
              if (ws.readyState !== WebSocket.OPEN) return;

              // Adaptive Simulation: 70% chance to answer correctly
              const isCorrect = Math.random() < 0.7;
              let selectedOption = question.answer;

              if (!isCorrect && question.choices?.length > 1) {
                const wrongChoices = question.choices.filter((c: string) => c !== question.answer);
                if (wrongChoices.length > 0) {
                  selectedOption = wrongChoices[Math.floor(Math.random() * wrongChoices.length)];
                }
              }

              // Submit standard score to update leaderboard
              if (isCorrect) currentScore += 100;
              ws.send(JSON.stringify({
                type: 'SUBMIT_SCORE',
                battleId,
                playerData: {
                  id: botId,
                  name: botName,
                  score: currentScore,
                  correctAnswers: isCorrect ? 1 : 0,
                  team: teamName
                }
              }));

              // Broadcast answer locked-in status
              ws.send(JSON.stringify({
                type: 'BATTLE_ACTION',
                battleId,
                sender: `[${teamName}] ${botName}`,
                message: `locked in their answer! 🎯`
              }));

              // Randomly engage in chat during the question
              if (Math.random() < 0.3) {
                setTimeout(() => {
                  if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({
                      type: 'BATTLE_ACTION',
                      battleId,
                      sender: `[${teamName}] ${botName}`,
                      message: CHAT_MESSAGES[Math.floor(Math.random() * CHAT_MESSAGES.length)]
                    }));
                  }
                }, 1500);
              }

            }, 2000 + Math.random() * 4000); 
          }
        } catch (err) {
          console.error('Bot parsing error:', err);
        }
      };

      botsRef.current.push(ws);
    }
  }, [battleId, roomCode, questions, mode, teamSize]);

  const cleanupBots = useCallback(() => {
    botsRef.current.forEach(ws => {
      if (ws.readyState === WebSocket.OPEN) ws.close();
    });
    botsRef.current = [];
  }, []);

  return { spawnBots, cleanupBots };
}