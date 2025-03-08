import React, { useState } from 'react';

const GalleryView = () => {
  const background = "/assets/paintingsBG.jpg";
  return (
    <div
      className="pt-12 flex h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex backdrop-blur h-full w-full bg-black bg-opacity-40">
        {/* Left column - 2/6 width */}
        <div className="font-quicksand custom-scrollbar w-3/12 bg-gray-200 bg-opacity-40 p-4 overflow-y-auto">
          <h2 className="font-alexbrush text-2xl mb-2">Galleries</h2>
        </div>

        {/* Middle column - 2/6 width */}
        <div className="font-quicksand custom-scrollbar w-4/12 bg-gray-200 bg-opacity-40 p-4 overflow-y-auto">
          <h2 className="font-alexbrush text-2xl mb-2">Gallery Details</h2>
        </div>

        {/* Right column - 2/6 width source https://nodea1.onrender.com/api/paintings/artist/:Id
            Paintings for the selected artist sorted by title (thumbnail, painting, title, year)
            The user should be able to changesort order between painting title
            and year The user should be able to select a painting (click a button or a
            hyperlink or a row, it’s up to you), which will display the single painting modal dialog
        */}
        <div className="w-5/12 bg-gray-200 bg-opacity-50 p-4">
          <h2 className="font-alexbrush text-2xl mb-2">Paintings</h2>
        </div>
      </div>
    </div>
  );
};

export default GalleryView;
