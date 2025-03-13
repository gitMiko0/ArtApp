import React, { useState, useEffect } from 'react';
import { fetchData } from "../services/apiServices";

const PaintingsFilter = ({ filterType, setFilterType, filterValue, searchTerm, setFilterValue, setSearchTerm }) => {
    const [artistsList, setArtistsList] = useState([]);
    const [galleriesList, setGalleriesList] = useState([]);

    useEffect(() => {
      const fetchFilters = async () => {
        const [artistsData, galleriesData] = await Promise.all([
          fetchData("artists"),
          fetchData("galleries"),
        ]);
        setArtistsList(artistsData);
        setGalleriesList(galleriesData);
      };
      fetchFilters();
    }, []);
  
    return (
      <div className="p-4">
       <input
        type="text"
        placeholder="Search by title..."
        onKeyDown={(e) => {
            if (e.key === "Enter") {
            setFilterType("search");
            setFilterValue(e.target.value);
            }
        }}
        value={searchTerm}
        />

  
        <h2 className="text-lg font-bold mb-4">Filter By:</h2>
  
        <select
        onChange={(e) => {
            setFilterType("artist");
            setFilterValue(e.target.value);
        }}
        value={filterType === "artist" ? filterValue : ""}
        >

          <option value="">Select Artist</option>
          {artistsList.sort((a, b) => a.lastName.localeCompare(b.lastName)).map((artist) => (
            <option key={artist.artistId} value={artist.artistId}>
              {artist.firstName} {artist.lastName}
            </option>
          ))}
        </select>
  
        <select
        onChange={(e) => {
            setFilterType("gallery");
            setFilterValue(e.target.value);
        }}
        value={filterType === "gallery" ? filterValue : ""}
        >

          <option value="">Select Gallery</option>
          {galleriesList.sort((a, b) => a.galleryName.localeCompare(b.galleryName)).map((gallery) => (
            <option key={gallery.galleryId} value={gallery.galleryId}>
              {gallery.galleryName}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default PaintingsFilter;  