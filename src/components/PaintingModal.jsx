import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import PaintingImage from "./PaintingImage";
import { fetchData } from "../services/apiServices";
import FavoriteButton from "./FavoriteButton";

Modal.setAppElement("#root");

const PaintingModal = ({ painting, onClose, onAddToFavorites }) => {
  if (!painting) return null;

  // Parse jsonAnnotations
  let dominantColors = [];
  try {
    const annotations = JSON.parse(painting.jsonAnnotations);
    dominantColors = annotations.dominantColors || [];
  } catch (error) {
    console.error("Error parsing jsonAnnotations:", error);
  }

  const [gallery, setGallery] = useState(null);
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchArtData = async () => {
      try {
        if (painting.galleryId) {
          const galleryResponse = await fetchData(`galleries/${painting.galleryId}`);
          setGallery(galleryResponse);
        }
        if (painting.artistId) {
          const artistResponse = await fetchData(`artists/${painting.artistId}`);
          setArtist(artistResponse);
          console.log("Artist ID:", painting.artistId, "Data:", artistResponse);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
  
    fetchArtData();
  }, [painting.galleryId, painting.artistId]);
  


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
            <h2 className="font-quicksand text-3xl font-semibold mb-2">
              {painting.title}
            </h2>
            {artist && (
            <p className="font-quicksand text-xl font-semibold mb-2">
                {artist.firstName} {artist.lastName}
            </p> )}

            <p className="font-quicksand text-sm text-gray-800 mb-4">
              {painting.description || "No description available."}
            </p>

            {/* Painting Info */}
            <ul className="font-quicksand text-sm text-gray-800 space-y-2">
              <li><strong>Year:</strong> {painting.yearOfWork || "Unknown"}</li>
              <li><strong>Medium:</strong> {painting.medium || "Not specified"}</li>
              <li><strong>Dimensions:</strong> {painting.width} × {painting.height} cm</li>
              <li><strong>MSRP:</strong> ${painting.MSRP}</li>
              <li>
                <strong>Copyright:</strong>{" "}
                <span
                    dangerouslySetInnerHTML={{ // This is for handling copyright symbol (as "&copy;" string) in the backend
                    __html: painting.copyrightText || "© N/A",
                    }}
                />
                </li>

            </ul>

            {/* Gallery Info */}
            {gallery && (
              <>
                <h3 className="mt-4 font-quicksand font-semibold text-md">
                  Gallery Information
                </h3>
                <ul className="font-quicksand text-sm text-gray-800 space-y-2">
                  <li><strong>Name:</strong> {gallery.galleryName}</li>
                  <li><strong>Location:</strong> {gallery.galleryCity}, {gallery.galleryCountry}</li>
                  <li>
                    <strong>Museum Link:</strong>{" "}
                    {gallery.galleryWebSite ? (
                    <a
                        href={gallery.galleryWebSite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Visit Museum
                    </a>
                    ) : (
                    <p>Unavailable</p>
                    )}

                  </li>
                </ul>
              </>
            )}

            {/* Links */}
            <ul className="flex font-quicksand text-sm mt-2 text-blue-600 space-x-4">
              {painting.wikiLink && (
                <li>
                  <a href={painting.wikiLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Wikipedia
                  </a>
                </li>
              )}
              {painting.googleLink && (
                <li>
                  <a href={painting.googleLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Google Info
                  </a>
                </li>
              )}
            </ul>

            {/* Dominant Colors */}
            <div className="mt-4">
            <p className="font-quicksand font-bold mb-2">Dominant Colors</p> {/* Added margin-bottom for spacing */}
            <div className="flex gap-2">
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

            <div>
              <FavoriteButton item={{
                        id: painting.paintingId,
                        name: painting.title                        
                      }} 
                type="painting" onAddToFavorites={onAddToFavorites} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PaintingModal;
