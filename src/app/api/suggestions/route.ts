import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { API_ENDPOINTS } from '@/config/api';

// Default fallback suggestions
const DEFAULT_SUGGESTIONS = [
  'Bạn có thể giải thích thêm về ý nghĩa của lá bài đầu tiên không?',
  'Lá bài này có ý nghĩa gì đối với tình cảm của tôi?',
  'Tôi nên làm gì để cải thiện tình hình hiện tại?',
  'Có điều gì tôi cần lưu ý trong thời gian tới không?',
  'Lá bài này có liên quan gì đến sự nghiệp của tôi không?'
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Check if session_id is provided
    if (!body.session_id) {
      console.error('Missing session_id in suggestions request');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Session ID is required',
          suggestions: DEFAULT_SUGGESTIONS
        },
        { status: 400 }
      );
    }
    
    // Forward the request to the backend API
    const response = await fetch(API_ENDPOINTS.SUGGESTIONS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Unknown error fetching suggestions',
        suggestions: DEFAULT_SUGGESTIONS
      },
      { status: 500 }
    );
  }
}

// Remove GET method as session_id is required
export async function GET(request: NextRequest) {
  // Return error as session_id is required
  console.log('GET request to suggestions API - rejecting as session_id is required');
  return NextResponse.json(
    { 
      success: false, 
      message: 'Session ID is required. Please use POST method with session_id.',
      suggestions: DEFAULT_SUGGESTIONS
    },
    { status: 400 }
  );
}
