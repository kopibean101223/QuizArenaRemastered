'use client';

import { Lobby_BattleRoyale } from './Lobby_BattleRoyale';
import type { LobbyModeProps } from './Lobby_LiveQuiz';

export function Lobby_ChaosClash(props: LobbyModeProps) {
  return <Lobby_BattleRoyale {...props} title="ChaosClash" />;
}
