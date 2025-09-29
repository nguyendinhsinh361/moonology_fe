import React from 'react';
import Header from './Header';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
  showBanner?: boolean;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, showBanner = false, className = '' }) => {
  return (
    <div className="cosmic-bg">
      <Navigation />
      <div className={`container responsive-container ${className}`}>
        {showBanner && <Header />}
        {children}
      </div>
    </div>
  );
};

export default Layout;
