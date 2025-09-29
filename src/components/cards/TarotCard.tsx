import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { TarotCard as TarotCardType } from '@/types/api';
import { ASSET_URLS } from '@/config/api';

interface TarotCardProps {
  card: TarotCardType;
  isSelected?: boolean;
  onClick?: () => void;
}

const TarotCard: React.FC<TarotCardProps> = ({ card, isSelected = false, onClick }) => {
  const cardTitle = card.card || card.title || 'Untitled Card';
  const cardKind = card.kind || card.category || '';
  const shortMeaning = card.short_meam || card.short_meaning || '';
  
  // Use image URL from API if available, or generate fallback path
  const imagePath = card.image_url || ASSET_URLS.CARD_IMAGE(cardTitle);
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log('Image failed to load:', imagePath);
    
    // Không cần thử các định dạng khác nữa, vì chúng ta đã biết đúng định dạng file
    
    // If all formats fail, show placeholder
    e.currentTarget.style.display = 'none';
    const placeholder = e.currentTarget.nextElementSibling;
    if (placeholder) {
      (placeholder as HTMLElement).style.display = 'flex';
    }
  };

  return (
    <div 
      className={`tarot-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="card-image">
        <Image 
          src={imagePath}
          alt={cardTitle}
          width={200}
          height={300}
          onError={handleImageError}
          unoptimized
        />
        <div className="card-placeholder" style={{ display: 'none' }}>
          <FontAwesomeIcon icon={faMoon} />
        </div>
      </div>
      <div className="card-content">
        <div className="card-title">{cardTitle}</div>
        {cardKind && <div className="card-category">{cardKind}</div>}
        {shortMeaning && <div className="card-short-meaning">"{shortMeaning}"</div>}
      </div>
    </div>
  );
};

export default TarotCard;
