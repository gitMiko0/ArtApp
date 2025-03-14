import React, { useState } from "react";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/funwebdev/image/upload";
const PLACEHOLDER_IMAGE = "/assets/placeholder.jpg";  // Adjust to your actual placeholder image path
// Placeholder Image Credit: https://www.istockphoto.com/vector/thumbnail-image-vector-graphic-gm1147544807-309589937
const PaintingImage = ({ painting, size = "w_300" }) => {
  const [imageError, setImageError] = useState(false);

  const imageUrl = painting && painting.imageFileName
    ? `${CLOUDINARY_BASE_URL}/${size}/art/paintings/${painting.imageFileName}`
    : PLACEHOLDER_IMAGE;

  const handleError = () => {
    setImageError(true);
  };

  return (
    <img
      src={imageError ? PLACEHOLDER_IMAGE : imageUrl}
      alt={painting ? painting.title : "Placeholder image"}
      className="max-h-full max-w-full object-contain rounded"
      onError={handleError}  // Trigger handleError if image fails to load
    />
  );
};

export default PaintingImage;
