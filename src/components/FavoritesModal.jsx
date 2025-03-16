import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import FavoriteButton from "./FavoriteButton";
const FavoritesModal = ({ favorites, isOpen, onClose, onClearFavorites }) => {
    const paintings = favorites.filter((item) => item.type === "painting");
    const artists = favorites.filter((item) => item.type === "artist");
    const galleries = favorites.filter((item) => item.type === "gallery");
  
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Favorite Items"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"
      >
        <div className="relative font-quicksand bg-white backdrop-blur bg-opacity-80 w-3/4 h-3/4 rounded-xl shadow-lg p-6 flex flex-col">
           {/* Clear Favorites Button */}
            <button
            onClick={onClearFavorites}
            className="absolute top-4 right-16 px-3 py-1 bg-red-900 text-white rounded-lg text-sm transition-colors duration-600 hover:bg-red-700"
            >
            Clear
            </button>

            {/* Close Button */}
            <button
            onClick={onClose}
            className="absolute top-4 right-4 px-3 py-1 bg-red-900 text-white rounded-lg text-sm transition-colors duration-600 hover:bg-red-700"
            >
            ✕
            </button>

          <h2 className="text-4xl font-alexbrush font-semibold text-center mb-1">
            My Favorites
          </h2>
  
          {favorites.length === 0 ? (
            <p className="text-center text-gray-600">No favorites added yet.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow min-h-0">
                {/* Paintings Column */}
                <div className="flex flex-col flex-grow min-h-0">
                  <h3 className="text-xl font-semibold text-center mb-2">Paintings</h3>
                  <div className="custom-scrollbar overflow-y-auto flex-grow min-h-0 px-2">
                    {paintings.length === 0 ? (
                      <p className="text-center text-gray-500">No favorite paintings.</p>
                    ) : (
                      paintings.map((painting) => (
                        <div
                          key={painting.id}
                          className="flex flex-col items-center bg-gray-100 rounded-lg shadow-md p-4 mb-4"
                        >
                          <h4 className="font-quicksand text-lg text-center mb-4">
                            {painting.name}
                          </h4>
                          <FavoriteButton item={painting} type="painting" />
                        </div>
                      ))
                    )}
                  </div>
                </div>
  
                {/* Artists Column */}
                <div className="flex flex-col flex-grow min-h-0">
                  <h3 className="text-xl font-semibold text-center mb-2">Artists</h3>
                  <div className="custom-scrollbar overflow-y-auto flex-grow min-h-0 px-2">
                    {artists.length === 0 ? (
                      <p className="text-center text-gray-500">No favorite artists.</p>
                    ) : (
                      artists.map((artist) => (
                        <div
                          key={artist.id}
                          className="flex flex-col items-center bg-gray-100 rounded-lg shadow-md p-4 mb-4"
                        >
                          <h4 className="font-quicksand text-lg mb-4 text-center ">
                            {artist.name}
                          </h4>
                          <FavoriteButton item={artist} type="artist" />
                        </div>
                      ))
                    )}
                  </div>
                </div>
  
                {/* Galleries Column */}
                <div className="flex flex-col flex-grow min-h-0">
                  <h3 className="text-xl font-semibold text-center mb-2">Galleries</h3>
                  <div className="custom-scrollbar overflow-y-auto flex-grow min-h-0 px-2">
                    {galleries.length === 0 ? (
                      <p className="text-center text-gray-500">No favorite galleries.</p>
                    ) : (
                      galleries.map((gallery) => (
                        <div
                          key={gallery.id}
                          className="flex flex-col items-center bg-gray-100 rounded-lg shadow-md p-4 mb-4"
                        >
                          <h4 className="font-quicksand text-lg mb-4 text-center ">
                            {gallery.name}
                          </h4>
                          <FavoriteButton item={gallery} type="gallery" />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    );
  };
  
  export default FavoritesModal;
  