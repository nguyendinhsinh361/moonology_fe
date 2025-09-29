import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { TarotCard } from '@/types/api';
import { ASSET_URLS } from '@/config/api';

interface DrawnCardProps {
  card: TarotCard;
  index: number;
}

const DrawnCard: React.FC<DrawnCardProps> = ({ card, index }) => {
  const cardTitle = card.card || card.title || 'Untitled Card';
  const cardKind = card.kind || card.category || '';
  
  // Use image URL from API if available, or generate fallback path
  const imagePath = card.image_url || ASSET_URLS.CARD_IMAGE(cardTitle);
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log('Drawn card image failed:', imagePath);
    
    // Không cần thử các định dạng khác nữa, vì chúng ta đã biết đúng định dạng file
    
    // If all formats fail, show placeholder
    e.currentTarget.style.display = 'none';
    const placeholder = e.currentTarget.nextElementSibling;
    if (placeholder) {
      (placeholder as HTMLElement).style.display = 'flex';
    }
  };

  return (
    <div className="drawn-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="drawn-card-image">
        <Image 
          src={imagePath}
          alt={cardTitle}
          width={200}
          height={300}
          onError={handleImageError}
          unoptimized
        />
        <div className="drawn-card-placeholder" style={{ display: 'none' }}>
          <FontAwesomeIcon icon={faMoon} />
        </div>
      </div>
      <div className="drawn-card-content">
        <div className="drawn-card-title">{cardTitle}</div>
        {cardKind && <div className="drawn-card-category">{cardKind}</div>}
      </div>
    </div>
  );
};

export default DrawnCard;
