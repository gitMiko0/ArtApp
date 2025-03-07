import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">ArtApp</Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li>
            <Link to="/artists" className="navbar-link">Artists</Link>
          </li>
          <li>
            <Link to="/genres" className="navbar-link">Genres</Link>
          </li>
          <li>
            <Link to="/paintings" className="navbar-link">Paintings</Link>
          </li>
          <li>
            <Link to="/login" className="navbar-link">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
