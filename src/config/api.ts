/**
 * API Configuration
 * Centralized configuration for API endpoints
 */

import { BACKEND_URL } from './constants';

// Base API URL - Trực tiếp đến backend
export const API_BASE_URL = BACKEND_URL;

// API Endpoints - Tất cả đều trỏ trực tiếp đến backend
export const API_ENDPOINTS = {
  // Cards
  CARDS: `${API_BASE_URL}/api/cards`,
  CARDS_BY_CATEGORY: (category: string) => `${API_BASE_URL}/api/cards/category/${category}`,
  RANDOM_CARD: `${API_BASE_URL}/api/cards/random`,
  
  // Chat
  CHAT: `${API_BASE_URL}/api/chat`,
  
  // Suggestions
  SUGGESTIONS: `${API_BASE_URL}/api/suggestions`,
};

// Asset URLs - Trỏ trực tiếp đến backend
export const ASSET_URLS = {
  // Images
  CARD_IMAGE: (cardName: string) => {
    // Xử lý các trường hợp đặc biệt
    // 1. Thay thế dấu cách bằng dấu gạch dưới
    // 2. Đảm bảo các từ "in", "of", "and" được viết hoa khi nằm trong tên bài
    const formattedName = cardName
      .replace(/ /g, '_')
      .replace(/_in_/i, '_In_')
      .replace(/_of_/i, '_Of_')
      .replace(/_and_/i, '_And_');
    
    return `${API_BASE_URL}/source/image_re/${formattedName}.png`;
  },
};
