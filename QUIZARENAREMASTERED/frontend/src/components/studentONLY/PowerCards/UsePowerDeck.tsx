import { useState } from 'react';
import type { PowerCardData } from './types';

export function usePowerDeck() {
  const [myDeck, setMyDeck] = useState<PowerCardData[]>([]);
  const [drawnCards, setDrawnCards] = useState<PowerCardData[]>([]);
  const [showCardModal, setShowCardModal] = useState(false);

  // Call this when you want to pop open the modal with specific cards
  const triggerCardDraw = (cards: PowerCardData[]) => {
    setDrawnCards(cards);
    setShowCardModal(true);
  };

  

  const handleAddToDeck = (selectedCard: PowerCardData) => {
    // Clone the card and give it a truly unique ID so duplicates don't crash React
    const uniqueCardInstance = { 
      ...selectedCard, 
      id: `${selectedCard.id}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}` 
    };

    setMyDeck((prev) => [...prev, uniqueCardInstance]);
    setShowCardModal(false);
    setDrawnCards([]); 
  };
  return {
    myDeck,
    drawnCards,
    showCardModal,
    triggerCardDraw,
    handleAddToDeck,
  };
}