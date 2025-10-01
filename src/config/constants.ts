/**
 * Application Constants
 * Centralized configuration for application-wide constants
 * Uses environment variables with fallback values
 */

// Backend API URL
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

// Other constants
export const MAX_SELECTED_CARDS = parseInt(process.env.NEXT_PUBLIC_MAX_SELECTED_CARDS || '3', 10);
export const DEFAULT_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_DEFAULT_TIMEOUT || '30000', 10); // 30 seconds

// Environment
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
