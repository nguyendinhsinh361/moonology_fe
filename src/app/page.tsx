'use client';

import { useEffect, useState, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import LoadingOverlay from '@/components/layout/LoadingOverlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faMagic, faHandPaper } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import { preloadImages } from '@/utils/helpers';
import { API_BASE_URL, ASSET_URLS } from '@/config/api';

export default function Home() {
  const [loadedImages, setLoadedImages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  
  // Key images to preload
  const keyImages = useMemo(() => [
    ASSET_URLS.CARD_IMAGE('New_Moon'),
    ASSET_URLS.CARD_IMAGE('Full_Moon'),
    ASSET_URLS.CARD_IMAGE('First_Quarter_Moon'),
    ASSET_URLS.CARD_IMAGE('Third_Quarter_Moon'),
    ASSET_URLS.CARD_IMAGE('Waxing_Crescent_Moon'),
    ASSET_URLS.CARD_IMAGE('Waning_Moon'),
    ASSET_URLS.CARD_IMAGE('Blue_Moon'),
    ASSET_URLS.CARD_IMAGE('Supermoon')
  ], []);

  // Gallery images
  const galleryImages = [
    ASSET_URLS.CARD_IMAGE('New_Moon'),
    ASSET_URLS.CARD_IMAGE('Full_Moon'),
    ASSET_URLS.CARD_IMAGE('First_Quarter_Moon'),
    ASSET_URLS.CARD_IMAGE('Third_Quarter_Moon'),
    ASSET_URLS.CARD_IMAGE('Waxing_Crescent_Moon'),
    ASSET_URLS.CARD_IMAGE('Waning_Moon'),
    ASSET_URLS.CARD_IMAGE('Blue_Moon'),
    ASSET_URLS.CARD_IMAGE('Supermoon'),
    ASSET_URLS.CARD_IMAGE('New_Moon_Eclipse'),
    ASSET_URLS.CARD_IMAGE('Full_Moon_Eclipse'),
    ASSET_URLS.CARD_IMAGE('North_Node'),
    ASSET_URLS.CARD_IMAGE('South_Node')
  ];

  const totalImages = keyImages.length + galleryImages.length;

  // Handle image load
  const handleImageLoad = () => {
    setLoadedImages(prev => {
      const newCount = prev + 1;
      if (newCount >= totalImages) {
        setTimeout(() => setIsLoading(false), 500);
      }
      return newCount;
    });
  };

  // Handle image error
  const handleImageError = (imageName: string) => {
    console.log('Failed to load image:', imageName);
    setFailedImages(prev => [...prev, imageName]);
    handleImageLoad(); // Still count it to avoid hanging
  };

  useEffect(() => {
    // Preload key images
    const preloadKeyImages = async () => {
      try {
        await preloadImages(keyImages);
        setLoadedImages(prev => prev + keyImages.length);
      } catch (error) {
        console.log('Some key images failed to load:', error);
        setLoadedImages(prev => prev + keyImages.length);
      }
    };

    preloadKeyImages();

    // Start moon phase animation
    let moonPhaseInterval: NodeJS.Timeout;
    const startMoonPhaseAnimation = () => {
      const phases = ['fas fa-moon', 'fas fa-adjust', 'far fa-circle', 'fas fa-sun'];
      let currentIndex = 0;
      
      moonPhaseInterval = setInterval(() => {
        const moonPhase = document.querySelector('.moon-phase i');
        if (moonPhase) {
          currentIndex = (currentIndex + 1) % phases.length;
          // This would be handled differently with Font Awesome in React
          // For now, we'll just log it
          console.log('Moon phase changed to:', phases[currentIndex]);
        }
      }, 8000);
    };

    startMoonPhaseAnimation();

    return () => {
      if (moonPhaseInterval) clearInterval(moonPhaseInterval);
    };
  }, [keyImages]);

  return (
    <>
      <LoadingOverlay 
        isVisible={isLoading}
        progress={(loadedImages / totalImages) * 100}
      />
      
      <Layout showBanner={true}>
        {/* Hero Section */}
        <section className="hero-section">
          <h2 className="hero-title">Chào mừng đến với Moonology Tarot</h2>
          <p className="hero-subtitle">
            Hãy để các lá bài tarot huyền bí dẫn dắt bạn khám phá những thông điệp sâu sắc từ vũ trụ. 
            Mỗi lá bài đều chứa đựng những ý nghĩa đặc biệt và có thể giúp bạn hiểu rõ hơn về bản thân và tương lai.
          </p>
          <div className="hero-cta">
            <Link href="/cards" className="cta-button">
              <FontAwesomeIcon icon={faMagic} />
              <span>Bắt đầu giải bài</span>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faMoon} />
            </div>
            <h3 className="feature-title">Bộ bài Moonology</h3>
            <p className="feature-description">
              Sử dụng bộ bài tarot Moonology độc đáo với 44 lá bài được thiết kế đặc biệt, 
              mỗi lá đều gắn liền với các giai đoạn của mặt trăng và ý nghĩa huyền bí.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faMagic} />
            </div>
            <h3 className="feature-title">AI Thông minh</h3>
            <p className="feature-description">
              Công nghệ AI tiên tiến sẽ phân tích các lá bài của bạn và đưa ra những lời giải 
              chi tiết, sâu sắc và cá nhân hóa dựa trên kiến thức tarot chuyên sâu.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faMagic} />
            </div>
            <h3 className="feature-title">Tương tác AI</h3>
            <p className="feature-description">
              Bạn có thể đặt câu hỏi thêm cho AI về kết quả giải bài, nhận lời khuyên cụ thể 
              về tình cảm, sự nghiệp, tài chính và nhiều khía cạnh khác của cuộc sống.
            </p>
          </div>
        </section>

        {/* Image Gallery */}
        <section className="image-gallery">
          {galleryImages.map((imagePath, index) => (
            <div key={index} className="gallery-item">
              {!failedImages.includes(imagePath) ? (
                <Image 
                  src={imagePath}
                  alt={imagePath.split('/').pop()?.replace(/\.(jpeg|jpg|png)$/i, '') || ''}
                  width={200}
                  height={300}
                  onLoad={handleImageLoad}
                  onError={() => handleImageError(imagePath)}
                  unoptimized
                />
              ) : (
                <div className="gallery-placeholder" style={{ display: 'flex', width: 200, height: 300 }}>
                  <FontAwesomeIcon icon={faMoon} className="text-4xl text-star-gold" />
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Call to Action */}
        <section className="hero-section">
          <h2 className="hero-title">Sẵn sàng khám phá?</h2>
          <p className="hero-subtitle">
            Hãy để trực giác dẫn dắt bạn và chọn những lá bài mà bạn cảm thấy có sự kết nối. 
            Vũ trụ đang chờ đợi để tiết lộ những bí mật của bạn.
          </p>
          <div className="hero-cta">
            <Link href="/cards" className="cta-button">
              <FontAwesomeIcon icon={faHandPaper} />
              <span>Rút bài ngay</span>
            </Link>
          </div>
        </section>
      </Layout>
    </>
  );
}