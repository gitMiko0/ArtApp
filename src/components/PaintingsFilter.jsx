import React, { useState, useEffect } from 'react';
import { fetchData } from "../services/apiServices";

const PaintingsFilter = ({ setAppliedFilter }) => {
  const [filterType, setFilterType] = useState(""); 
  const [filterValue, setFilterValue] = useState(""); 
  const [searchTerm, setSearchTerm] = useState(""); 
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

    setAppliedFilter({ type: "all", value: "" }); //show all paintings by default
  }, [setAppliedFilter]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setFilterType("search");
      setFilterValue(e.target.value);
    }
  };

  const applyFilter = () => {
    let value = filterValue;

    if (filterType === "title") {
      value = searchTerm;
    }

    if (!value || (Array.isArray(value) && (!value[0] || !value[1]))) {
      console.log("Please select a valid filter value.");
      return;
    }

    setAppliedFilter({ type: filterType, value });
  };

  useEffect(() => {
    if (filterType === "search") {
      setFilterValue(searchTerm);
    } else if (filterType !== "years") {
      setFilterValue("");
    } else {
      setFilterValue(["", ""]);
    }
  }, [filterType, searchTerm]);

  const clearFilters = () => {
    setFilterType("");
    setFilterValue("");
    setSearchTerm("");
    setAppliedFilter({ type: "all", value: "" }); // show all paintings initially
  };

  return (
    <div className="p-4">
      <h1 className="text-shadow-lg text-white font-alexbrush text-4xl mb-2">Painting Filters</h1>
      
      <label className="mb-4 block text-white flex">
        <input type="radio" value="search" checked={filterType === "search"} onChange={() => setFilterType("search")} className="mr-2" />
        <input
          className="text-white backdrop-blur bg-white bg-opacity-40 font-quicksand rounded-2xl p-2 pl-4 w-full placeholder-white"
          type="text"
          placeholder="Search by title..."
          onKeyDown={handleSearch}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={filterType !== "search"}
        />
        {/* Search Icon in svg element from: https://flowbite.com/docs/forms/search-input/ */}
        <svg 
          className="relative right-7 top-2 w-6 h-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </label>

      <label className="mb-4 block text-white">
        <div className="mr-2 flex">
          <input type="radio" value="artist" checked={filterType === "artist"} onChange={() => setFilterType("artist")}
                 className="mr-2" />
          <select
          className="custom-scrollbar w-full font-quicksand text-white bg-[#ae752f] p-1 rounded-xl"
          value={filterType === "artist" ? filterValue : ""}
          onChange={(e) => setFilterValue(e.target.value)}
          disabled={filterType !== "artist"}
        >
          <option value="">Select Artist</option>
          {artists.map((artist) => (
            <option key={artist.artistId} value={artist.artistId}>
              {artist.firstName} {artist.lastName}
            </option>
          ))}
        </select>
        </div>

      </label>

      <label className="mb-4 block text-white flex">
        <input type="radio" value="gallery" checked={filterType === "gallery"} onChange={() => setFilterType("gallery")} className="mr-2" />
        <select
          className="custom-scrollbar w-full font-quicksand text-white bg-[#ae752f] p-1 rounded-xl"
          value={filterType === "gallery" ? filterValue : ""}
          onChange={(e) => setFilterValue(e.target.value)}
          disabled={filterType !== "gallery"}
        >
          <option value="">Select Gallery</option>
          {galleries.map((gallery) => (
            <option key={gallery.galleryId} value={gallery.galleryId}>
              {gallery.galleryName}
            </option>
          ))}
        </select>
      </label>

      <label className="mb-4 block text-white flex">
        <input type="radio" value="years" checked={filterType === "years"} onChange={() => setFilterType("years")} className="mr-2" />
        <div className="flex space-x-2">
          <input
            className="w-1/2 text-white text-center backdrop-blur bg-white bg-opacity-40 font-quicksand rounded-2xl p-2 placeholder-white"
            type="text"
            min="1"
            max="9999"
            placeholder="Start Year"
            onChange={(e) => setFilterValue([e.target.value, filterValue[1] || ""])}
            value={filterType === "years" ? filterValue[0] || "" : ""}
            disabled={filterType !== "years"}
          />
          <input
            className="w-1/2 text-white text-center backdrop-blur bg-white bg-opacity-40 font-quicksand rounded-2xl p-2 placeholder-white"
            type="text"
            min="1"
            max="9999"
            placeholder="End Year"
            onChange={(e) => setFilterValue([filterValue[0] || "", e.target.value])}
            value={filterType === "years" ? filterValue[1] || "" : ""}
            disabled={filterType !== "years"}
          />
        </div>
      </label>

      <div className="flex gap-4">
        <button onClick={clearFilters} className="bg-red-500 text-white px-4 py-2 rounded">Clear</button>
        <button onClick={applyFilter} className="bg-blue-500 text-white px-4 py-2 rounded">Filter</button>
      </div>
    </div>
  );
};

export default PaintingsFilter;
