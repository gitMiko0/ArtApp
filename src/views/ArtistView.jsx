import React, { useState } from 'react';

const ArtistView = () => {
  const background = "/assets/loginBackground.jpg"; //in public folder
  
  return (
    <div 
      className="pt-12 flex h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex h-full w-full bg-black bg-opacity-40">
        {/* 
          Left column - 1/6 width 
          List of artist names for users to choose from, this is the decider data that fills in the
          remaining containers on the page
           */}
        <div className="w-1/6 bg-gray-100 bg-opacity-50 p-4">
          {/* Left Column Content - https://nodea1.onrender.com/api/artists */}
        </div>

        {/* Middle column - 2/6 width */}
        <div className="w-2/6 bg-white bg-opacity-50 p-4">
          {/* Add content for the middle column here */}
        </div>

        {/* Right column - 3/6 width */}
        <div className="w-3/6 bg-gray-200 bg-opacity-50 p-4">
          {/* Add content for the right column here */}
        </div>
      </div>
    </div>
  );
};

export default ArtistView;
