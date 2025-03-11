import React, { useState } from 'react';
import LoadingFetch from "../hooks/useFetch";
import PaintingsList from "../components/PaintingsList";

const PaintingView = () => {
  const background = "/assets/loginBackground.jpg"; // Background image path

  return (
    <div
    className="pt-12 flex h-screen w-screen bg-cover bg-center"
    style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex w-4/12">
      </div>
      <div className="font-quicksand custom-scrollbar w-9/12 bg-gray-200 bg-opacity-20 p-4 overflow-y-auto">
      </div>
    </div>
  );
};

export default PaintingView;
