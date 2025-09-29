import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

// Đã bỏ Header component vì đã chuyển thanh điều hướng sang Navigation
// Giữ lại component này để hiển thị banner ở trang chủ
const Header: React.FC = () => {
  return (
    <div className="header-banner">
      <div className="moon-phase">
        <FontAwesomeIcon icon={faMoon} />
      </div>
      <h1>🌙 Moonology Tarot Reading</h1>
      <p>Khám phá những thông điệp từ vũ trụ qua các lá bài tarot huyền bí</p>
    </div>
  );
};

export default Header;
