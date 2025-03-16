import React from "react";

/**
 * Reusable Loading component for displaying a loading animation while waiting for data.
 * This current implementation is a bit hardcoded, should be improved to adjust to screen height.
 */
const Loading = ({ count = 11 }) => {
    const placeholderDivs = [];
    for (let i = 0; i < count; i++) {
      placeholderDivs.push(
        <div key={i} className="mt-0 space-y-4 flex justify-center">
          <div className="w-11/12 mt-4 h-10 backdrop-blur bg-opacity-30 items-center bg-white rounded-xl"></div>
        </div>
      );
    }
  
    return (
    <div className="mt-10">
      <div className="animate-pulse">{placeholderDivs}</div>;
    </div>
    );
  };

export default Loading;
