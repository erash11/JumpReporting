import React from 'react';

/**
 * Loading spinner component
 * Displays while data is being fetched or processed
 */
export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-xl text-gray-700 font-semibold">{message}</p>
      </div>
    </div>
  );
}
