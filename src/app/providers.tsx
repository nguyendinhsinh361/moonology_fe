'use client';

import React from 'react';
import { CardProvider } from '@/context/CardContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CardProvider>
      {children}
    </CardProvider>
  );
}
