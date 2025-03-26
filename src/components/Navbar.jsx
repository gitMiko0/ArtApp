import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FavoritesModal from './FavoritesModal';
import { useFavorites } from '../hooks/FavoritesProvider';

const Navbar = () => {
  const location = useLocation();
  const { favorites, handleClearFavorites } = useFavorites(); // Use context for live updates
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="font-quicksand fixed top-0 left-0 right-0 backdrop-blur">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-waterfall flex items-center text-white text-4xl">
          <img src="/assets/logo.png" alt="logo" className="h-12 w-12 m-2 mt-0 mb-0" />
          Elysiana
        </Link>
        <ul className="flex space-x-8">
          {favorites.length > 0 && (
            <li className="relative group">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-white text-lg relative overflow-hidden block py-2 px-4 transition-all duration-300 ease-in-out transform hover:scale-110"
              >
                <span className="relative z-10">Favorites</span>
                <span
                  className="absolute left-0 w-full h-7 bg-[#21130d] transition-transform duration-300 ease-in-out scale-x-0 group-hover:scale-x-100"
                ></span>
              </button>
            </li>
          )}
          {['Artists', 'Paintings', 'Genres', 'Galleries', 'Login'].map((item) => {
            const isActive = location.pathname === `/${item.toLowerCase()}`;
            return (
              <li key={item} className="font-quicksand relative group mr-2">
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="text-white text-lg relative overflow-hidden block py-2 px-2 transition-all duration-300 ease-in-out transform hover:scale-110"
                >
                  <span className="relative z-10">{item}</span>
                  <span
                    className={`absolute left-0 w-full h-7 bg-[#21130d] transition-transform duration-300 ease-in-out 
                      ${isActive ? 'scale-x-120' : 'scale-x-0 group-hover:scale-x-100'}`}
                  ></span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {isModalOpen && (
        <FavoritesModal 
          favorites={favorites} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onClearFavorites={handleClearFavorites}
        />
      )}
    </nav>
  );
};

export default Navbar;
