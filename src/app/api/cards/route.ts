import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { API_ENDPOINTS } from '@/config/api';

export async function GET(request: NextRequest) {
  try {
    // Forward the request to the backend API
    const response = await fetch(API_ENDPOINTS.CARDS, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching cards:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Unknown error fetching cards',
        cards: [] 
      },
      { status: 500 }
    );
  }
}
