import React from 'react';

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="w-12 h-12 border-4 border-gray-700 border-t-teal-400 rounded-full animate-spin mb-4"></div>
            <p className="text-lg opacity-80 animate-pulse">Loading...</p>
        </div>
    );
};

export default Loading;
