import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { ASSET_URLS } from '@/config/api';

interface TarotImageProps {
  cardName: string;
  imageUrl?: string;
  imageUrlJpeg?: string;
  imageUrlJpg?: string;
  width?: number;
  height?: number;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const TarotImage: React.FC<TarotImageProps> = ({
  cardName,
  imageUrl,
  imageUrlJpeg,
  imageUrlJpg,
  width = 200,
  height = 300,
  className = '',
  onLoad,
  onError
}) => {
  const [hasError, setHasError] = useState(false);
  const imagePath = imageUrl || ASSET_URLS.CARD_IMAGE(cardName);
  
  const handleError = () => {
    setHasError(true);
    if (onError) onError();
  };
  
  const handleLoad = () => {
    if (onLoad) onLoad();
  };

  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-surface-dark ${className}`}
        style={{ width, height }}
      >
        <FontAwesomeIcon icon={faMoon} className="text-4xl text-star-gold" />
      </div>
    );
  }

  return (
    <Image
      src={imagePath}
      alt={cardName}
      width={width}
      height={height}
      className={className}
      onError={(e) => {
        // Show placeholder on error
        handleError();
      }}
      onLoad={handleLoad}
    />
  );
};

export default TarotImage;
