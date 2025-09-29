import React from 'react';
import Image from 'next/image';
import { ASSET_URLS } from '@/config/api';

interface CardDeckProps {
  cardCount: number;
  isShuffling: boolean;
  onClick: () => void;
}

const CardDeck: React.FC<CardDeckProps> = ({ cardCount, isShuffling, onClick }) => {
  // Sử dụng Full_Moon làm ảnh mặt trăng mặc định - ảnh rõ nét nhất
  const moonImage = ASSET_URLS.CARD_IMAGE('Full_Moon');
  
  return (
    <div className={`tarot-deck ${isShuffling ? 'shuffling' : ''}`} onClick={onClick}>
      <div className="deck-cards">
        {/* Lá bài chính ở giữa */}
        <div className="deck-card main-card" style={{ transform: 'rotate(0deg)', zIndex: 10 }}>
          <div className="deck-card-image">
            <Image 
              src={moonImage}
              alt="Tarot Deck"
              fill
              unoptimized
              className="deck-card-img"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ 
                objectFit: 'contain',
                padding: '10px'
              }}
            />
          </div>
          <div className="card-shine"></div>
        </div>
        
        {/* Các lá bài phụ xòe ra như cánh quạt */}
        <div className="deck-card fan-card" style={{ transform: 'rotate(-20deg) translate(-10px, -5px)', zIndex: 1 }}>
          <div className="deck-card-image">
            <Image 
              src={moonImage}
              alt="Tarot Deck"
              fill
              unoptimized
              className="deck-card-img"
              style={{ 
                objectFit: 'contain',
                padding: '10px',
                opacity: 0.4
              }}
            />
          </div>
        </div>
        
        <div className="deck-card fan-card" style={{ transform: 'rotate(-10deg) translate(-5px, -2px)', zIndex: 2 }}>
          <div className="deck-card-image">
            <Image 
              src={moonImage}
              alt="Tarot Deck"
              fill
              unoptimized
              className="deck-card-img"
              style={{ 
                objectFit: 'contain',
                padding: '10px',
                opacity: 0.5
              }}
            />
          </div>
        </div>
        
        <div className="deck-card fan-card" style={{ transform: 'rotate(10deg) translate(5px, -2px)', zIndex: 2 }}>
          <div className="deck-card-image">
            <Image 
              src={moonImage}
              alt="Tarot Deck"
              fill
              unoptimized
              className="deck-card-img"
              style={{ 
                objectFit: 'contain',
                padding: '10px',
                opacity: 0.5
              }}
            />
          </div>
        </div>
        
        <div className="deck-card fan-card" style={{ transform: 'rotate(20deg) translate(10px, -5px)', zIndex: 1 }}>
          <div className="deck-card-image">
            <Image 
              src={moonImage}
              alt="Tarot Deck"
              fill
              unoptimized
              className="deck-card-img"
              style={{ 
                objectFit: 'contain',
                padding: '10px',
                opacity: 0.4
              }}
            />
          </div>
        </div>
      </div>
      <div className="deck-glow"></div>
    </div>
  );
};

export default CardDeck;