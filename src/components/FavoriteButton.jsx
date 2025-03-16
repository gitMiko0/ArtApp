// components/FavoriteButton.js
import React from 'react';
import { useFavorites } from '../hooks/FavoritesProvider';

const FavoriteButton = ({ item, type }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleFavorite = () => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite({
        id: item.id,
        name: item.name,
        type: type
      });
    }
  };

  const isFav = isFavorite(item.id);

  return (
    <button
      onClick={handleFavorite}
      className={`relative px-4 py-2 ${isFav ? 'bg-red-900' : 'bg-[#ae752f]'} text-white rounded-lg overflow-hidden group transition-colors duration-300 ease-in-out`}
    >
      <span className={`absolute inset-0 ${isFav ? 'bg-red-700' : 'bg-[#21130d]'} scale-x-0 origin-center transition-transform duration-300 ease-in-out group-hover:scale-x-100 z-0`}></span>
      <span className="relative z-10">{isFav ? 'Remove from Favorites' : 'Add to Favorites'}</span>
    </button>
  );
};

export default FavoriteButton;
