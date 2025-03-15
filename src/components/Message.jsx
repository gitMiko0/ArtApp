import React from 'react';

const Message = ({ text }) => {
  return (
    <div className="mt-4 flex items-center justify-center">
      <div className="w-80 bg-white bg-opacity-30 backdrop-blur-md rounded-lg p-4 shadow-md">
        <p className="text-black font-quicksand">{text}</p>
      </div>
    </div>
  );
};

export default Message;
