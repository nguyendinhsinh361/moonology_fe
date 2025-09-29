import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/reading.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Providers } from './providers';
import SuppressHydrationWarning from './suppressHydrationWarning';

// Prevent Font Awesome from adding its CSS since we did it manually above
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '🌙 Moonology Tarot Reading',
  description: 'Khám phá những thông điệp từ vũ trụ qua các lá bài tarot huyền bí',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <SuppressHydrationWarning />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}