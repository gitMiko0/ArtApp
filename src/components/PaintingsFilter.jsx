import React, { useState, useEffect } from 'react';
import { fetchData } from "../services/apiServices";

const PaintingsFilter = ({ filterType, setFilterType, filterValue, searchTerm, setFilterValue, setSearchTerm }) => {
  const [artists, setArtists] = useState([]);
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      const [artistsData, galleriesData] = await Promise.all([
        fetchData("artists"),
        fetchData("galleries"),
      ]);

      setArtists(artistsData.sort((a, b) => a.lastName.localeCompare(b.lastName)));
      setGalleries(galleriesData.sort((a, b) => a.galleryName.localeCompare(b.galleryName)));
    };
    fetchFilters();
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setFilterType("search");
      setFilterValue(e.target.value);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-shadow-lg text-white font-alexbrush text-4xl mb-2">Painting Filters</h1>
      <div className="relative">
  <input
    className="text-white backdrop-blur bg-white bg-opacity-40 font-quicksand rounded-2xl p-2 pl-10 mb-4 w-full placeholder-white"
    type="text"
    placeholder="Search by title..."
    onKeyDown={handleSearch}
    value={searchTerm}
  />
  <svg
    className="absolute left-3 bottom-4 -translate-y-1/2 w-5 h-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
</div>

      <h2 className="text-shadow-lg text-white font-alexbrush text-4xl mb-2">Filter by</h2>
      <select
        className="custom-scrollbar w-9/12 font-quicksand text-white bg-[#ae752f] m-1 p-1 rounded-xl"
        value={filterType === "artist" ? filterValue : ""}
        onChange={(e) => {
          setFilterType("artist");
          setFilterValue(e.target.value);
        }}
      >
        <option value="">Artist</option>
        {artists.map((artist) => (
          <option key={artist.artistId} value={artist.artistId}>
            {artist.firstName} {artist.lastName}
          </option>
        ))}
      </select>

      <select
        className="custom-scrollbar w-9/12 font-quicksand text-white bg-[#ae752f] m-1 p-1 rounded-xl"
        value={filterType === "gallery" ? filterValue : ""}
        onChange={(e) => {
          setFilterType("gallery");
          setFilterValue(e.target.value);
        }}
      >
        <option value="">Gallery</option>
        {galleries.map((gallery) => (
          <option key={gallery.galleryId} value={gallery.galleryId}>
            {gallery.galleryName}
          </option>
        ))}
      </select>

      <h3 className="text-shadow-lg text-white font-alexbrush text-4xl m-2">Filter by year</h3>

      <form className="flex justify-center">
        <input
        className="m-2 text-white text-center backdrop-blur bg-white bg-opacity-40 font-quicksand rounded-2xl mb-4 w-full placeholder-white"
          type="number"
          min="1"
          max="9999"
          placeholder="Start Year"
          onChange={(e) => {
            setFilterType("years");
            setFilterValue((prevValue) => [e.target.value, prevValue[1] || ""]);
          }}
          value={filterType === "years" ? filterValue[0] || "" : ""}
        />
        <input
        className="m-2 p-2 text-white text-center backdrop-blur bg-white bg-opacity-40 font-quicksand rounded-2xl mb-4 w-full placeholder-white"
          type="number"
          min="1"
          max="9999"
          placeholder="End Year"
          onChange={(e) => {
            setFilterType("years");
            setFilterValue((prevValue) => [prevValue[0] || "", e.target.value]);
          }}
          value={filterType === "years" ? filterValue[1] || "" : ""}
        />
      </form>
      <button>
        Clear
      </button>
      <button>
        Filter
      </button>
    </div>
  );
};
  
  export default PaintingsFilter;  