import React from 'react';

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  subMessage?: string;
  progress?: number;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  message = 'Đang kết nối với vũ trụ...',
  subMessage = 'Tải các hình ảnh huyền bí',
  progress = 0
}) => {
  if (!isVisible) return null;

  return (
    <div className={`loading-overlay ${!isVisible ? 'hidden' : ''}`} id="loadingOverlay">
      <div className="loading-spinner"></div>
      <div className="loading-text">{message}</div>
      <div className="loading-subtext">{subMessage}</div>
      <div className="loading-progress">
        <div 
          className="loading-progress-bar" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
