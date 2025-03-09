import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 backdrop-blur">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-waterfall flex items-center text-white text-4xl">
          <img src="/assets/logo.png" alt="logo" className="h-12 w-12 mr-2" />
          Elysiana
        </Link>
        <ul className="flex space-x-8"> {/* navbar items animation credit: https://getdevdone.com/blog/our-favorite-navigation-menu-effects.html */}
          {['Artists', 'Paintings', 'Genres', 'Galleries', 'Login'].map((item) => {
            const isActive = location.pathname === `/${item.toLowerCase()}`;

            return (
              <li key={item} className="font-quicksand relative group">
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="text-white text-lg relative overflow-hidden block py-2 px-4 transition-all duration-300 ease-in-out transform hover:scale-110"
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
    </nav>
  );
};

export default Navbar;
