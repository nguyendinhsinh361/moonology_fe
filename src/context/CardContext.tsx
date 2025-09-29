'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { TarotCard } from '@/types/api';
import { API_ENDPOINTS } from '@/config/api';

interface CardContextType {
  allCards: TarotCard[];
  filteredCards: TarotCard[];
  selectedCards: TarotCard[];
  maxSelectedCards: number;
  isLoading: boolean;
  error: string | null;
  loadCards: () => Promise<void>;
  filterCards: (category?: string, searchTerm?: string) => void;
  toggleCardSelection: (card: TarotCard) => void;
  removeSelectedCard: (cardId: string | number) => void;
  resetSelection: () => void;
  shuffleDeck: () => void;
  drawRandomCards: (count: number) => TarotCard[];
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allCards, setAllCards] = useState<TarotCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<TarotCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [maxSelectedCards] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasCalledAPI = useRef(false);

  // Load cards from API
  const loadCards = async () => {
    // Prevent multiple API calls
    if (hasCalledAPI.current) {
      console.log('Cards API already called, skipping...');
      return;
    }
    
    hasCalledAPI.current = true;
    console.log('Calling cards API...');
    setIsLoading(true);
    setError(null);
    
    try {
      // Gọi trực tiếp đến backend thay vì qua API route của Next.js
      const response = await fetch(`${API_ENDPOINTS.CARDS}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setAllCards(data.cards || []);
      setFilteredCards(data.cards || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error loading cards');
      console.error('Error loading cards:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter cards by category and search term
  const filterCards = (category?: string, searchTerm?: string) => {
    let filtered = [...allCards];
    
    if (category) {
      filtered = filtered.filter(card => {
        const cardKind = card.kind || card.category || '';
        return cardKind === category;
      });
    }
    
    if (searchTerm) {
      const search = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(card => {
        const cardTitle = card.card || card.title || '';
        const cardShortMeaning = card.short_meam || card.short_meaning || '';
        const cardDescription = card.content?.overall_meaning || card.description || '';
        const cardKind = card.kind || card.category || '';
        
        return cardTitle.toLowerCase().includes(search) ||
               cardShortMeaning.toLowerCase().includes(search) ||
               cardDescription.toLowerCase().includes(search) ||
               cardKind.toLowerCase().includes(search);
      });
    }
    
    setFilteredCards(filtered);
  };

  // Toggle card selection
  const toggleCardSelection = (card: TarotCard) => {
    setSelectedCards(prev => {
      const isSelected = prev.some(c => c.id === card.id);
      
      if (isSelected) {
        // Deselect card
        return prev.filter(c => c.id !== card.id);
      } else {
        // Select card (if under limit)
        if (prev.length < maxSelectedCards) {
          return [...prev, card];
        }
        return prev;
      }
    });
  };

  // Remove selected card
  const removeSelectedCard = (cardId: string | number) => {
    setSelectedCards(prev => prev.filter(card => card.id !== cardId));
  };

  // Reset selection
  const resetSelection = () => {
    setSelectedCards([]);
  };

  // Shuffle deck
  const shuffleDeck = () => {
    // This is just a visual effect, not actually shuffling the cards
    // The actual shuffling happens when drawing random cards
    console.log('Deck shuffled');
  };

  // Draw random cards
  const drawRandomCards = (count: number): TarotCard[] => {
    const shuffledCards = [...allCards].sort(() => 0.5 - Math.random());
    const drawnCards = shuffledCards.slice(0, count);
    setSelectedCards(drawnCards);
    return drawnCards;
  };

  // Load cards on mount
  useEffect(() => {
    console.log('CardContext useEffect triggered');
    loadCards();
  }, []);

  const value = {
    allCards,
    filteredCards,
    selectedCards,
    maxSelectedCards,
    isLoading,
    error,
    loadCards,
    filterCards,
    toggleCardSelection,
    removeSelectedCard,
    resetSelection,
    shuffleDeck,
    drawRandomCards
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export const useCards = (): CardContextType => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error('useCards must be used within a CardProvider');
  }
  return context;
};
