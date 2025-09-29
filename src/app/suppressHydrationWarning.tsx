'use client';

import { useEffect } from 'react';

export default function SuppressHydrationWarning() {
  useEffect(() => {
    // Tắt cảnh báo hydration trong console
    const originalConsoleError = console.error;
    console.error = (...args: any[]) => {
      if (args[0]?.includes('Warning: Extra attributes from the server')) {
        return;
      }
      originalConsoleError(...args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  return null;
}
