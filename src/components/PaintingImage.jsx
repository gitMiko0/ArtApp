import React, { useState } from "react";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/funwebdev/image/upload";
const PLACEHOLDER_IMAGE = "/assets/placeholder.jpg"; // Adjust as needed

const PaintingImage = ({ painting, size = "w_300" }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const imageUrl = painting && painting.imageFileName
    ? `${CLOUDINARY_BASE_URL}/${size}/art/paintings/${painting.imageFileName}`
    : PLACEHOLDER_IMAGE;

  const handleError = () => {
    setImageError(true);
    setIsLoading(false); // Stop loading if error occurs
  };

  const handleLoad = () => {
    setIsLoading(false); // Hide skeleton once the image loads
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Loading Skeleton */}
      {isLoading && !imageError && (
        <div className="absolute inset-0 bg-gray-400 animate-pulse rounded w-full h-full"></div>
      )}

      {/* Image Element */}
      <img
        src={imageError ? PLACEHOLDER_IMAGE : imageUrl}
        alt={painting ? painting.title : "Placeholder image"}
        className={`max-h-full max-w-full object-contain rounded transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
};

export default PaintingImage;
