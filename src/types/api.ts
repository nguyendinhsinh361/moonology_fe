// API Types for Moonology Tarot

export interface TarotCard {
  id: string | number;
  card: string;
  kind?: string;
  category?: string;
  short_meam?: string;
  short_meaning?: string;
  content?: {
    overall_meaning?: string;
    [key: string]: any;
  };
  description?: string;
  image_url?: string;
  image_url_jpeg?: string;
  image_url_jpg?: string;
  [key: string]: any;
}

export interface CardsResponse {
  cards: TarotCard[];
  success?: boolean;
  message?: string;
}

export interface ReadingResponse {
  reading: {
    id: string;
    cards: TarotCard[];
    interpretation: string;
    created_at: string;
    [key: string]: any;
  };
  success?: boolean;
  message?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

export interface ChatResponse {
  message: string;
  success: boolean;
  chat_id?: string;
  messages?: ChatMessage[];
}

export interface SuggestionResponse {
  suggestions: string[];
  success: boolean;
}
