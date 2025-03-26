import React, { useState, useEffect } from "react";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/funwebdev/image/upload";
const PLACEHOLDER_IMAGE = "/assets/placeholder.jpg";

const PaintingImage = ({ painting, size = "w_300" }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(PLACEHOLDER_IMAGE); // Default to placeholder

  const imageFileName = painting && painting.imageFileName;
  const imageKey = imageFileName ? `${imageFileName}-${size}` : null;
  useEffect(() => {
    if (imageFileName && size) {
      const cachedImage = localStorage.getItem(imageKey);
      
      if (cachedImage) {
        setImageUrl(cachedImage); // Set cached image if available
        console.log("Using cached image:", cachedImage, imageKey);
        setIsLoading(false); // Stop loading
      } else {
        // Construct new image URL if not cached
        const newImageUrl = `${CLOUDINARY_BASE_URL}/${size}/art/paintings/${imageFileName}`;
        setImageUrl(newImageUrl); // Set URL while loading
      }
    }
  }, [imageFileName, size, imageKey]);

  const handleError = () => {
    setImageError(true);
    setIsLoading(false); // Stop loading if there's an error
  };

  const handleLoad = () => {
    if (imageKey && !imageError) {
      // Cache the image URL after it loads successfully
      localStorage.setItem(imageKey, imageUrl);
    }
    setIsLoading(false); // Hide loading skeleton after image loads
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
