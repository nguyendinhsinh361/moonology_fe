'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import LoadingScreen from '@/components/layout/LoadingScreen';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMoon, faSpinner, faArrowLeft, faComments,
  faPaperPlane, faMagic, faRedo, faDownload,
  faLightbulb, faStar, faGem
} from '@fortawesome/free-solid-svg-icons';
import { TarotCard } from '@/types/api';
import { formatAIResponse } from '@/utils/helpers';
import { API_ENDPOINTS, ASSET_URLS } from '@/config/api';

export default function ReadingPage() {
  const router = useRouter();
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [userThoughts, setUserThoughts] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [interpretation, setInterpretation] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [readingId, setReadingId] = useState<string | null>(null);
  const hasCalledAPI = useRef(false);

  // Get suggestions from API
  const getSuggestions = useCallback(async () => {
    // Only get suggestions if we have a session_id
    if (!readingId) {
      console.log('Skipping suggestions request - no session_id available');
      return;
    }
    
    try {
      console.log('Getting suggestions with session_id:', readingId);
      const response = await fetch(API_ENDPOINTS.SUGGESTIONS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          cards: selectedCards,
          session_id: readingId
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Suggestions API Response:', data);
      
      if (data.success && data.suggestions) {
        setSuggestions(data.suggestions);
      } else if (data.suggestions) {
        // Alternative response format
        setSuggestions(data.suggestions);
      }
    } catch (error) {
      console.error('Error getting suggestions:', error);
    }
  }, [readingId, selectedCards]);

  // Get reading from API
  const getReading = useCallback(async (cards: TarotCard[], thoughts: string = '') => {
    // Prevent multiple API calls
    if (hasCalledAPI.current) {
      console.log('API already called, skipping...');
      return;
    }
    
    hasCalledAPI.current = true;
    console.log('Calling API for reading...');
    setIsLoading(true);
    
    // Use user thoughts if available, otherwise use default message
    let userInput = ""
    if (thoughts.trim()) {
      userInput = `Trước khi rút bài tôi đã thực sự suy nghĩ về: "${thoughts.trim()}". Xin hãy giải thích ý nghĩa của các thẻ tôi bốc ra ở trên chi tiết giúp tôi`
    } else {
      userInput = "Xin hãy giải thích ý nghĩa của các thẻ tôi bốc ra ở trên chi tiết giúp tôi";
    }
    
    try {
      const response = await fetch(API_ENDPOINTS.CHAT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          cards,
          user_input: userInput
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      // Handle different response formats
      if (data.success && data.reading) {
        // Original format with reading object
        console.log('Using reading.interpretation format');
        setInterpretation(data.reading.interpretation || '');
        setReadingId(data.reading.id || null);
        
        // Get suggestions after setting readingId
        // Using setTimeout to ensure readingId is updated before calling getSuggestions
        setTimeout(() => getSuggestions(), 100);
      } else if (data.response && data.response.output) {
        // New format with response.output
        console.log('Using response.output format');
        const outputText = data.response.output || '';
        console.log('Setting interpretation to:', outputText);
        setInterpretation(outputText);
        setReadingId(data.session_id || null);
        
        // Get suggestions after setting readingId
        // Using setTimeout to ensure readingId is updated before calling getSuggestions
        setTimeout(() => getSuggestions(), 100);
      } else {
        console.error('Unexpected API response format:', data);
        throw new Error(data.message || 'Unknown error getting reading');
      }
    } catch (error) {
      console.error('Error getting reading:', error);
      setInterpretation('Đã xảy ra lỗi khi lấy kết quả giải bài. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  }, [getSuggestions]);

  useEffect(() => {
    // Get selected cards and user thoughts from sessionStorage
    const storedCards = sessionStorage.getItem('selectedCards');
    const storedThoughts = sessionStorage.getItem('userThoughts');
    
    if (!storedCards) {
      router.push('/cards');
      return;
    }

    try {
      const cards = JSON.parse(storedCards);
      setSelectedCards(cards);
      
      // Set user thoughts if available
      if (storedThoughts) {
        setUserThoughts(storedThoughts);
      }
      
      // Get reading from API with user thoughts
      getReading(cards, storedThoughts || '');
    } catch (error) {
      console.error('Error parsing stored data:', error);
      router.push('/cards');
    }

  }, [getReading, router]);

  // Send chat message to API
  const sendChatMessage = async () => {
    if (!chatMessage.trim() || isChatLoading) return;
    
    setIsChatLoading(true);
    
    // Add user message to chat history
    const userMessage = { role: 'user', content: chatMessage };
    setChatHistory(prev => [...prev, userMessage]);
    
    // Clear input
    setChatMessage('');
    
    try {
      const response = await fetch(API_ENDPOINTS.CHAT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          user_input: userMessage.content,
          session_id: readingId
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      console.log('Chat API Response:', data);
      if (data.success || data.response) {
        // Add assistant message to chat history
        const responseText = data.response?.output || data.message || '';
        console.log('Setting chat response to:', responseText);
        setChatHistory(prev => [...prev, { role: 'assistant', content: responseText }]);
        
        // Get new suggestions with updated session_id
        getSuggestions();
      } else {
        throw new Error(data.message || 'Unknown error sending chat message');
      }
    } catch (error) {
      console.error('Error sending chat message:', error);
      // Add error message to chat history
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: 'Xin lỗi, đã xảy ra lỗi khi xử lý tin nhắn của bạn. Vui lòng thử lại sau.' 
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setChatMessage(suggestion);
  };

  // Handle new reading
  const handleNewReading = () => {
    // Clear session storage and navigate to cards page
    sessionStorage.removeItem('selectedCards');
    router.push('/cards');
  };

  // Handle download reading
  const handleDownloadReading = () => {
    // Create content for download
    let content = `# Moonology Tarot Reading\n\n`;
    
    // Add cards
    content += `## Các lá bài đã chọn\n\n`;
    selectedCards.forEach(card => {
      content += `- ${card.card || card.title}\n`;
    });
    
    content += `\n## Kết quả giải bài\n\n${interpretation}\n\n`;
    
    // Add chat history if any
    if (chatHistory.length > 0) {
      content += `## Cuộc trò chuyện\n\n`;
      chatHistory.forEach(msg => {
        const role = msg.role === 'user' ? 'Bạn' : 'AI';
        content += `### ${role}:\n${msg.content}\n\n`;
      });
    }
    
    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'moonology-tarot-reading.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <Layout>
        <LoadingScreen message="Đang phân tích các lá bài..." subMessage="Vui lòng đợi trong giây lát" />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="reading-container">
        <h2 className="section-title">Kết quả giải bài Tarot</h2>
        
        {/* Selected Cards */}
        <div className="selected-cards-section">
          <h3 className="subsection-title">Các lá bài đã chọn</h3>
          <div className="selected-cards-display">
            {selectedCards.map((card, index) => (
              <div key={card.id} className="selected-card">
                <div className="selected-card-image">
                  <Image 
                    src={ASSET_URLS.CARD_IMAGE(card.card || card.title || '')}
                    alt={card.card || card.title || ''}
                    width={150}
                    height={225}
                    unoptimized
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const placeholder = e.currentTarget.nextElementSibling;
                      if (placeholder) {
                        (placeholder as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  <div className="selected-card-placeholder" style={{ display: 'none' }}>
                    <FontAwesomeIcon icon={faMoon} />
                  </div>
                </div>
                <div className="selected-card-name">{card.card || card.title}</div>
                <div className="selected-card-position">Vị trí {index + 1}</div>
              </div>
            ))}
          </div>
          
        </div>
        
        {/* Reading Interpretation */}
        <div className="reading-interpretation">
          <h3 className="subsection-title">Lời giải từ vũ trụ</h3>
          {interpretation ? (
            <div 
              className="interpretation-content"
              dangerouslySetInnerHTML={{ __html: formatAIResponse(interpretation) }}
            ></div>
          ) : (
            <div className="interpretation-loading">
              <div className="loading-spinner">
                <FontAwesomeIcon icon={faSpinner} spin />
              </div>
              <p>Đang phân tích và tạo lời giải từ vũ trụ...</p>
              <p className="loading-subtext">Vui lòng đợi trong giây lát</p>
            </div>
          )}
          
          {/* Start Reading Button - Show when no interpretation yet */}
          {!interpretation && (
            <div className="start-reading-section">
              <button 
                className="start-reading-btn"
                onClick={() => {
                  // Scroll to interpretation section
                  const interpretationSection = document.querySelector('.reading-interpretation');
                  if (interpretationSection) {
                    interpretationSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <FontAwesomeIcon icon={faStar} className="start-reading-btn-icon" />
                <span>Bắt đầu giải bài</span>
                <div className="start-reading-btn-glow"></div>
              </button>
            </div>
          )}
        </div>
        
        {/* Chat Section */}
        <div className="chat-section">
          <h3 className="subsection-title">
            <FontAwesomeIcon icon={faComments} /> Hỏi thêm về kết quả giải bài
          </h3>
          
          {/* Chat Messages */}
          <div className="chat-messages">
            {chatHistory.length === 0 ? (
              <div className="chat-empty-state">
                <div className="chat-empty-icon">
                  <FontAwesomeIcon icon={faMagic} />
                </div>
                <p>Hãy đặt câu hỏi về kết quả giải bài để nhận thêm thông tin chi tiết</p>
              </div>
            ) : (
              chatHistory.map((msg, index) => (
                <div 
                  key={index} 
                  className={`chat-message ${msg.role === 'user' ? 'user-message' : 'ai-message'}`}
                >
                  <div className="message-content">
                    {msg.role === 'assistant' ? (
                      <div 
                        dangerouslySetInnerHTML={{ __html: formatAIResponse(msg.content) }}
                      ></div>
                    ) : (
                      <p>{msg.content}</p>
                    )}
                  </div>
                </div>
              ))
            )}
            
            {isChatLoading && (
              <div className="chat-message ai-message">
                <div className="message-content loading">
                  <FontAwesomeIcon icon={faSpinner} spin />
                  <span>...</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Chat Input */}
          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              placeholder="Nhập câu hỏi của bạn..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
            />
            <button 
              className="chat-send-btn"
              onClick={sendChatMessage}
              disabled={isChatLoading || !chatMessage.trim()}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
          
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="chat-suggestions">
              <div className="suggestions-header">
                <FontAwesomeIcon icon={faLightbulb} className="suggestions-icon" />
                <span className="suggestions-title">Gợi ý câu hỏi</span>
              </div>
              <div className="suggestions-grid">
                {suggestions.map((suggestion, index) => (
                  <div 
                    key={index} 
                    className="suggestion-card group"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="suggestion-card-header">
                      <FontAwesomeIcon 
                        icon={index === 0 ? faStar : index === 1 ? faGem : faMoon} 
                        className="suggestion-card-icon"
                      />
                      <span className="suggestion-card-number">{index + 1}</span>
                    </div>
                    <div className="suggestion-card-content">
                      {suggestion}
                    </div>
                    <div className="suggestion-card-footer">
                      <FontAwesomeIcon icon={faPaperPlane} className="suggestion-card-arrow" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="reading-actions">
          <button className="action-btn" onClick={handleNewReading}>
            <FontAwesomeIcon icon={faRedo} /> Giải bài mới
          </button>
          <button className="action-btn secondary" onClick={() => router.push('/cards')}>
            <FontAwesomeIcon icon={faArrowLeft} /> Quay lại chọn bài
          </button>
          <button className="action-btn secondary" onClick={handleDownloadReading}>
            <FontAwesomeIcon icon={faDownload} /> Tải kết quả
          </button>
        </div>
      </div>
    </Layout>
  );
}
