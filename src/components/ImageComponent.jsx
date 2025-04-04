import React, { useState, useEffect } from "react";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/funwebdev/image/upload"; // Requirements changed for image source, but this is left here intentionally.
const PLACEHOLDER_IMAGE = "/assets/placeholder.jpg"; // Placeholder for missing images

const LOCAL_BASE_PATH = "/art-images"; // Base path for all image types

const ImageComponent = ({ id, type = "painting", size = "full" }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(PLACEHOLDER_IMAGE); // Default to placeholder

  // Define subdirectories based on the type
  const typeDirectoryMap = {
    painting: "paintings",
    artist: "artists",
    genre: "genres",
  };

  const subDir = typeDirectoryMap[type] || "paintings"; // Default to paintings if type is invalid

  const imageFileName = id ? `${id}.jpg` : null; // Ensure ID-based filenames

  // For genre, we don't need size directories, so we ignore `size`
  const imageKey = imageFileName ? `${type}-${id}-${size}` : null; // Unique cache key, still include size for painting and artist

  // Determine the path for image
  const localImagePath = imageFileName
    ? type === "genre"
      ? `${LOCAL_BASE_PATH}/${subDir}/${imageFileName}` // Genre doesn't use size
      : `${LOCAL_BASE_PATH}/${subDir}/${size}/${imageFileName}` // Other types use size
    : null;

  useEffect(() => {
    if (localImagePath) {
      console.log("Generated local image path:", localImagePath);

      const cachedImage = localStorage.getItem(imageKey);
      console.log("Cached image:", cachedImage);

      if (cachedImage && cachedImage !== PLACEHOLDER_IMAGE) {
        setImageUrl(cachedImage); // Use cached image
        console.log("Using cached image:", cachedImage);
        setIsLoading(false);
      } else {
        setImageUrl(localImagePath); // Set local image path
      }
    }
  }, [localImagePath, imageKey]);

  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    if (imageKey && !imageError && imageUrl !== PLACEHOLDER_IMAGE) {
      console.log("Caching image:", imageUrl);
      localStorage.setItem(imageKey, imageUrl);
    }
    setIsLoading(false);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {isLoading && !imageError && (
        <div className="absolute inset-0 bg-gray-400 animate-pulse rounded w-full h-full"></div>
      )}
      <img
        src={imageError ? PLACEHOLDER_IMAGE : imageUrl}
        alt={id ? `${type} image` : "Placeholder image"}
        className={`max-h-full max-w-full object-contain rounded transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
};

export default ImageComponent;
