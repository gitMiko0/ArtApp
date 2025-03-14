import React from "react";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/funwebdev/image/upload";

const PaintingImage = ({ painting, size = "w_300" }) => {
  if (!painting || !painting.imageFileName) return null;

  return (
    <img
      src={`${CLOUDINARY_BASE_URL}/${size}/art/paintings/${painting.imageFileName}`}
      alt={painting.title}
      className="max-h-full max-w-full object-contain rounded"
    />
  );
};

export default PaintingImage;
