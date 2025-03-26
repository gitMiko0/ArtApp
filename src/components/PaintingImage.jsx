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
      console.log("Generated imageKey:", imageKey);

      const cachedImage = localStorage.getItem(imageKey);
      console.log("Cached image:", cachedImage); // Log the cached image

      if (cachedImage && cachedImage !== PLACEHOLDER_IMAGE) {
        setImageUrl(cachedImage); // Set cached image if available and not placeholder
        console.log("Using cached image:", cachedImage);
        setIsLoading(false); // Stop loading
      } else {
        // Construct new image URL if not cached or if placeholder
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
    if (imageKey && !imageError && imageUrl !== PLACEHOLDER_IMAGE) {
      // Cache the image URL after it loads successfully
      console.log("Caching image:", imageUrl);
      localStorage.setItem(imageKey, imageUrl); // Only store if it's not the placeholder
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
