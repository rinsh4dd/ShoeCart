import React from 'react';
import PropTypes from 'prop-types';

function ErrorResponse({ 
  message = "Something went wrong!", 
  title = "Error", 
  onRetry, 
  retryText = "Try again",
  className = "",
  icon
}) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div 
      role="alert"
      aria-live="assertive"
      className={`flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border border-red-100 ${className}`}
    >
      {icon || (
        <svg 
          className="w-12 h-12 text-red-500 mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      )}
      
      <h2 className="text-xl font-semibold text-red-800 mb-1">{title}</h2>
      <p className="text-red-600 text-center mb-6">{message}</p>
      
      <button
        onClick={handleRetry}
        className="px-5 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
      >
        {retryText}
      </button>
    </div>
  );
}

ErrorResponse.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
  onRetry: PropTypes.func,
  retryText: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.node
};

export default ErrorResponse;