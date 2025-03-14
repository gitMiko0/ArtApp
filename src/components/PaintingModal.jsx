import React from "react";
import Modal from "react-modal";
import PaintingImage from "./PaintingImage";

Modal.setAppElement("#root");

const PaintingModal = ({ painting, onClose, onAddToFavorites }) => {
  if (!painting) return null;

  // Parse jsonAnnotations (since it is stored as a string)
  let dominantColors = [];
  try {
    const annotations = JSON.parse(painting.jsonAnnotations);
    dominantColors = annotations.dominantColors || [];
  } catch (error) {
    console.error("Error parsing jsonAnnotations:", error);
  }

  return (
    <Modal
      isOpen={!!painting}
      onRequestClose={onClose}
      contentLabel="Painting Details"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"
    >
      <div className="bg-white backdrop-blur bg-opacity-80 w-3/4 h-3/4 rounded-xl shadow-lg flex flex-col md:flex-row">
        {/* Left Column: Painting Image */}
        <div className="w-full md:w-1/2 p-4 h-full flex items-center justify-center overflow-hidden rounded-l-xl">
        <PaintingImage
            painting={painting}
            size="w_800"
            className="w-full h-full object-cover"
        />
        </div>


        {/* Right Column: Painting Details */}
        <div className="w-full md:w-2/3 p-4 pl-2 flex flex-col justify-between">
          <div className="custom-scrollbar pr-2 overflow-y-auto">
            <h2 className="font-quicksand text-xl font-semibold mb-2">{painting.title}</h2>
            <p className="font-quicksand text-sm text-gray-700 mb-4">
              {painting.description || "No description available."}
            </p>

            {/* Display dominant colors */}
            <div className="flex gap-2 mt-4">
              {dominantColors.map((color, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.web }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="font-quicksand mb-4 mt-2 flex gap-4 justify-center translate-y-4 animate-fade-in">
            <button
            onClick={onClose}
            className="relative px-4 py-2 bg-slate-500 text-black rounded-lg overflow-hidden group transition-colors duration-300 ease-in-out"
            >
            <span className="absolute inset-0 bg-red-900 scale-x-0 origin-center transition-transform duration-300 ease-in-out group-hover:scale-x-100 z-0"></span>
            <span className="relative z-10 text-white">Close</span>
            </button>

            <button
            className="relative px-4 py-2 bg-[#ae752f] text-white rounded-lg overflow-hidden group transition-colors duration-300 ease-in-out"
            onClick={() => onAddToFavorites(painting)}
            >
            <span className="absolute inset-0 bg-[#21130d] scale-x-0 origin-center transition-transform duration-300 ease-in-out group-hover:scale-x-100 z-0"></span>
            <span className="relative z-10">Add to Favorites</span>
            </button>
  
            </div>
        </div>
      </div>
    </Modal>
  );
};

export default PaintingModal;
