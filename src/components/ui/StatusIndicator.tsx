import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface StatusIndicatorProps {
  type: 'success' | 'error' | 'loading';
  message: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ type, message }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return faCheckCircle;
      case 'error':
        return faExclamationCircle;
      case 'loading':
        return faSpinner;
      default:
        return faCheckCircle;
    }
  };

  return (
    <div className={`status-indicator ${type}`} id="statusIndicator">
      <FontAwesomeIcon icon={getIcon()} spin={type === 'loading'} />
      <span>{message}</span>
    </div>
  );
};

export default StatusIndicator;
