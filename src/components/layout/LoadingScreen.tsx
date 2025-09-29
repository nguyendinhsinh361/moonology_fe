import React from 'react';

interface LoadingScreenProps {
  message?: string;
  subMessage?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Đang kết nối với vũ trụ...',
  subMessage = 'Vui lòng đợi trong giây lát'
}) => {
  return (
    <div className="loading-screen" id="loadingScreen">
      <div className="loading-spinner"></div>
      <div className="loading-text">{message}</div>
      <div className="loading-subtext">{subMessage}</div>
    </div>
  );
};

export default LoadingScreen;
