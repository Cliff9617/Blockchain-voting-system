import React from 'react';

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-dark-green-100 p-8 text-center animate-slide-up">
      <div className="flex items-center justify-center space-x-4 mb-4">
        <div className="w-10 h-10 border-4 border-dark-green-200 border-t-dark-green-600 rounded-full animate-spin"></div>
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" style={{ animationDelay: '0.4s' }}></div>
      </div>
      <h3 className="text-xl font-bold text-dark-green-900 mb-2">Please Wait</h3>
      <p className="text-lg text-dark-green-700">{message}</p>
      <p className="text-sm text-dark-green-600 mt-2">Please wait while we process your request</p>
    </div>
  );
};

export default Loading;
