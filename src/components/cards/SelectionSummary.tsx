import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TarotCard } from '@/types/api';

interface SelectionSummaryProps {
  selectedCards: TarotCard[];
  maxCards: number;
  onRemoveCard: (cardId: string | number) => void;
}

const SelectionSummary: React.FC<SelectionSummaryProps> = ({ 
  selectedCards, 
  maxCards,
  onRemoveCard
}) => {
  if (selectedCards.length === 0) return null;
  
  return (
    <div className="selection-summary show">
      <h3>
        <i className="fas fa-stars"></i>
        Đã chọn {selectedCards.length}/{maxCards} lá bài
      </h3>
      <div className="selected-cards-list">
        {selectedCards.map(card => (
          <div key={card.id} className="selected-card-item">
            <span>{card.card || card.title}</span>
            <FontAwesomeIcon 
              icon={faTimes} 
              className="remove-card" 
              onClick={() => onRemoveCard(card.id)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectionSummary;
