import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ArtistView from './views/ArtistView';
import GalleryView from './views/GalleryView';
import GenreView from './views/GenreView';
import LoginView from './views/LoginView';
import PaintingView from './views/PaintingView';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
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
    </Router>
  );
};

export default App;
