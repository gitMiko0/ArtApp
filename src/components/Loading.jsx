import React from "react";

/**
 * Reusable Loading component for displaying a loading animation while waiting for data.
 */
const Loading = ({ count = 10 }) => {
    const placeholderDivs = [];
    for (let i = 0; i < count; i++) {
      placeholderDivs.push(
        <div key={i} className="mt-0 space-y-4 flex justify-center">
          <div className="w-11/12 mt-4 h-8 backdrop-blur bg-opacity-50 items-center bg-gray-300 rounded-xl"></div>
        </div>
      );
    }
  
    return <div className="animate-pulse">{placeholderDivs}</div>;
  };

export default Loading;
