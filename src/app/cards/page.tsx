'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import LoadingScreen from '@/components/layout/LoadingScreen';
import StatusIndicator from '@/components/ui/StatusIndicator';
import TarotCard from '@/components/cards/TarotCard';
import DrawnCard from '@/components/cards/DrawnCard';
import CardDeck from '@/components/cards/CardDeck';
import SelectionSummary from '@/components/cards/SelectionSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMoon, faSpinner, faHandPaper, faCheck, 
  faEye, faRefresh, faSyncAlt, faFilter, faSearch, faStar
} from '@fortawesome/free-solid-svg-icons';
import { useCards } from '@/context/CardContext';
import { debounce } from '@/utils/helpers';

export default function CardsPage() {
  const router = useRouter();
  const { 
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
  } = useCards();

  const [isShuffling, setIsShuffling] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [userThoughts, setUserThoughts] = useState('');
  const [showThoughtsInput, setShowThoughtsInput] = useState(false);

  // Load cards when the page is accessed
  useEffect(() => {
    // Load cards when component mounts
    loadCards();
  }, [loadCards]);

  // Extract categories from cards
  useEffect(() => {
    if (allCards.length > 0) {
      const categorySet = new Set(
        allCards
          .map(card => card.kind || card.category)
          .filter(Boolean) as string[]
      );
      const uniqueCategories = Array.from(categorySet);
      setCategories(uniqueCategories);
    }
  }, [allCards]);

  // Handle shuffle deck
  const handleShuffleDeck = () => {
    if (allCards.length === 0) return;
    
    setIsShuffling(true);
    shuffleDeck();
    
    // Simulate shuffling time
    setTimeout(() => {
      setIsShuffling(false);
      setIsDrawing(true);
    }, 2000);
  };

  // Handle draw cards
  const handleDrawCards = () => {
    if (allCards.length === 0) return;
    
    setIsDrawing(false);
    
    // Draw 3 random cards
    drawRandomCards(3);
    setHasDrawn(true);
  };

  // Handle category filter change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setCategoryFilter(category);
    filterCards(category, searchFilter);
  };

  // Handle search filter change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setSearchFilter(search);
    debouncedFilter(search);
  };

  // Debounced filter function
  const debouncedFilter = debounce((search: string) => {
    filterCards(categoryFilter, search);
  }, 300);

  // Handle start reading
  const handleStartReading = () => {
    if (selectedCards.length === 0) return;
    
    // Store selected cards and user thoughts in sessionStorage for the reading page
    sessionStorage.setItem('selectedCards', JSON.stringify(selectedCards));
    sessionStorage.setItem('userThoughts', userThoughts);
    
    // Navigate to reading page
    router.push('/reading');
  };

  return (
    <Layout>
      {isLoading ? (
        <LoadingScreen message="Đang kết nối với vũ trụ..." subMessage="Vui lòng đợi trong giây lát để tải các lá bài từ API" />
      ) : (
        <div className="cards-container">
          <StatusIndicator 
            type={error ? 'error' : 'success'} 
            message={error ? `Lỗi: ${error}` : `Đã tải thành công các lá bài từ vũ trụ`} 
          />

          <h2 className="section-title">Chọn các lá bài của bạn</h2>
          <p className="text-center text-text-secondary mb-8">
            Hãy để trực giác dẫn dắt bạn và chọn những lá bài mà bạn cảm thấy có sự kết nối
          </p>

          {/* User Thoughts Input Section */}
          <div className="user-thoughts-section">
            <div className="thoughts-header">
              <h3 className="thoughts-title">
                <FontAwesomeIcon icon={faMoon} className="thoughts-icon" />
                Suy nghĩ và mong muốn của bạn
              </h3>
              <p className="thoughts-description">
                Hãy chia sẻ những điều bạn đang băn khoăn, mong muốn hoặc câu hỏi mà bạn muốn tìm câu trả lời. 
                Điều này sẽ giúp vũ trụ hiểu rõ hơn về tình huống của bạn và đưa ra lời giải chính xác hơn.
              </p>
            </div>
            
            <div className="thoughts-input-container">
              {!showThoughtsInput ? (
                <button 
                  className="thoughts-toggle-btn"
                  onClick={() => setShowThoughtsInput(true)}
                >
                  <FontAwesomeIcon icon={faMoon} />
                  <span>Chia sẻ suy nghĩ của bạn</span>
                </button>
              ) : (
                <div className="thoughts-input-wrapper">
                  <textarea
                    className="thoughts-textarea"
                    placeholder="Hãy viết ra những điều bạn đang băn khoăn, mong muốn hoặc câu hỏi mà bạn muốn tìm câu trả lời..."
                    value={userThoughts}
                    onChange={(e) => setUserThoughts(e.target.value)}
                    rows={4}
                  />
                  <div className="thoughts-actions">
                    <button 
                      className="thoughts-save-btn"
                      onClick={() => setShowThoughtsInput(false)}
                      disabled={!userThoughts.trim()}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                      <span>Lưu suy nghĩ</span>
                    </button>
                    <button 
                      className="thoughts-cancel-btn"
                      onClick={() => {
                        setShowThoughtsInput(false);
                        setUserThoughts('');
                      }}
                    >
                      <FontAwesomeIcon icon={faRefresh} />
                      <span>Bỏ qua</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {userThoughts && (
              <div className="thoughts-preview">
                <div className="thoughts-preview-header">
                  <FontAwesomeIcon icon={faStar} className="preview-icon" />
                  <span>Suy nghĩ của bạn:</span>
                </div>
                <div className="thoughts-preview-content">
                  {userThoughts}
                </div>
                <button 
                  className="thoughts-edit-btn"
                  onClick={() => setShowThoughtsInput(true)}
                >
                  <FontAwesomeIcon icon={faRefresh} />
                  <span>Chỉnh sửa</span>
                </button>
              </div>
            )}
          </div>

          {/* Card Shuffling and Drawing Section */}
          <div className="card-shuffling-section">
            <div className="deck-container">
              <CardDeck 
                cardCount={allCards.length} 
                isShuffling={isShuffling} 
                onClick={handleShuffleDeck} 
              />
              
              <div className="deck-info">
                <h3>Bộ bài Moonology Tarot</h3>
                <p>{allCards.length} lá bài có sẵn</p>
                <div className="shuffle-status">
                  {isShuffling ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin />
                      <span>Đang sào bài...</span>
                    </>
                  ) : isDrawing ? (
                    <>
                      <FontAwesomeIcon icon={faStar} />
                      <span>Bộ bài đã được sào xong</span>
                    </>
                  ) : hasDrawn ? (
                    <>
                      <FontAwesomeIcon icon={faCheck} />
                      <span>Đã rút xong 3 lá bài</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faMoon} />
                      <span>Sẵn sàng để sào bài</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="shuffle-controls">
              {!isDrawing && !hasDrawn ? (
                <button 
                  className={`shuffle-btn ${isShuffling ? 'animating' : ''}`}
                  onClick={handleShuffleDeck}
                  disabled={isShuffling}
                >
                  {isShuffling ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin />
                      <span className="btn-text">Đang sào bài...</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faMoon} />
                      <span className="btn-text">Sào bài</span>
                    </>
                  )}
                  <div className="shuffle-animation"></div>
                </button>
              ) : isDrawing ? (
                <button 
                  className="draw-btn"
                  onClick={handleDrawCards}
                >
                  <FontAwesomeIcon icon={faHandPaper} />
                  <span className="btn-text">Rút 3 lá bài</span>
                </button>
              ) : (
                <button 
                  className="draw-btn"
                  style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                  disabled
                >
                  <FontAwesomeIcon icon={faCheck} />
                  <span className="btn-text">Hoàn thành</span>
                </button>
              )}
            </div>

            {/* Drawn Cards Area */}
            {hasDrawn && (
              <div className={`drawn-cards-area ${hasDrawn ? 'show' : ''}`}>
                <div className="draw-message">
                  Các lá bài của bạn đã được chọn bởi vũ trụ
                </div>
                <div className="drawn-cards-container">
                  {selectedCards.map((card, index) => (
                    <DrawnCard key={card.id} card={card} index={index} />
                  ))}
                </div>
                
                {/* Start Reading Button - Right below the 3 cards */}
                <div className="start-reading-section">
                  <button 
                    className="start-reading-btn"
                    onClick={handleStartReading}
                  >
                    <FontAwesomeIcon icon={faStar} className="start-reading-btn-icon" />
                    <span>Bắt đầu giải bài</span>
                    <div className="start-reading-btn-glow"></div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Selection Summary */}
          <SelectionSummary 
            selectedCards={selectedCards}
            maxCards={maxSelectedCards}
            onRemoveCard={removeSelectedCard}
          />

          {/* Filter Controls */}
          <div className="filter-controls">
            <div className="filter-group">
              <label htmlFor="categoryFilter">
                <FontAwesomeIcon icon={faFilter} /> Danh mục:
              </label>
              <select 
                id="categoryFilter"
                value={categoryFilter}
                onChange={handleCategoryChange}
              >
                <option value="">Tất cả danh mục</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="searchFilter">
                <FontAwesomeIcon icon={faSearch} /> Tìm kiếm:
              </label>
              <input 
                type="text" 
                id="searchFilter" 
                placeholder="Nhập từ khóa..." 
                value={searchFilter}
                onChange={handleSearchChange}
              />
            </div>
          </div>


          {/* Controls */}
          <div className="controls">
            <button onClick={resetSelection} className="btn-secondary">
              <FontAwesomeIcon icon={faRefresh} /> Chọn lại
            </button>
            <button onClick={loadCards} className="btn-secondary">
              <FontAwesomeIcon icon={faSyncAlt} /> Tải lại dữ liệu
            </button>
          </div>

          {/* Card Grid */}
          <div className="card-grid">
            {filteredCards.length === 0 ? (
              <div className="col-span-full text-center py-10 text-text-secondary">
                <FontAwesomeIcon icon={faSearch} className="text-5xl text-text-muted mb-4" />
                <h3 className="mb-3 text-text-primary text-xl font-bold">Không tìm thấy lá bài nào</h3>
                <p>Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
              </div>
            ) : (
              filteredCards.map(card => (
                <TarotCard 
                  key={card.id} 
                  card={card} 
                  isSelected={selectedCards.some(c => c.id === card.id)}
                  onClick={() => toggleCardSelection(card)}
                />
              ))
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
