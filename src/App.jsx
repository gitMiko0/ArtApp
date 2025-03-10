import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ArtistView from './views/ArtistView';
import GalleryView from './views/GalleryView';
import GenreView from './views/GenreView';
import LoginView from './views/LoginView';
import PaintingView from './views/PaintingView';
import './App.css';

const AppContent = () => {
  const location = useLocation();
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(false); 
    const timeout = setTimeout(() => setFade(true), 10);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div className={`transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}>
      <Routes>
        {/* Set the default route to redirect to /login */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Login page */}
        <Route path="/login" element={<LoginView />} />
        {/* Routes that include Navbar */}
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/artists" element={<ArtistView />} />
                  <Route path="/genres" element={<GenreView />} />
                  <Route path="/galleries" element={<GalleryView />} />
                  <Route path="/paintings" element={<PaintingView />} />
                  <Route path="/" element={<GalleryView />} />
                </Routes>
              </main>
            </>
          }
        />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <AppContent />
      </div>
    </Router>
  );
};

export default App;
