import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      <LoginView />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<GalleryView />} />
            <Route path="/artists" element={<ArtistView />} />
            <Route path="/genres" element={<GenreView />} />
            <Route path="/paintings" element={<PaintingView />} />
            <Route path="/login" element={<LoginView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
