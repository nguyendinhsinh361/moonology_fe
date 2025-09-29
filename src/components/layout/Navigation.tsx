import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faInfoCircle, 
  faMagic, 
  faBlog, 
  faEnvelope,
  faBars,
  faXmark
} from '@fortawesome/free-solid-svg-icons';

const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="main-nav">
      <div className="container">
        <div className="nav-brand">
          <Link href="/" onClick={closeMobileMenu}>
            <span className="brand-icon">🌙</span>
            <span className="brand-name">Moonology</span>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button" 
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
        >
          <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} />
        </button>
        
        {/* Navigation Links */}
        <ul className={`nav-list ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li className="nav-item">
            <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`} onClick={closeMobileMenu}>
              <FontAwesomeIcon icon={faHome} />
              <span>Trang chủ</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`} onClick={closeMobileMenu}>
              <FontAwesomeIcon icon={faInfoCircle} />
              <span>Về chúng tôi</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/cards" className={`nav-link ${pathname.includes('/cards') || pathname.includes('/reading') ? 'active' : ''}`} onClick={closeMobileMenu}>
              <FontAwesomeIcon icon={faMagic} />
              <span>Bói Moonology</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/blog" className={`nav-link ${pathname.includes('/blog') ? 'active' : ''}`} onClick={closeMobileMenu}>
              <FontAwesomeIcon icon={faBlog} />
              <span>Blog</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/contact" className={`nav-link ${pathname === '/contact' ? 'active' : ''}`} onClick={closeMobileMenu}>
              <FontAwesomeIcon icon={faEnvelope} />
              <span>Liên hệ</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
