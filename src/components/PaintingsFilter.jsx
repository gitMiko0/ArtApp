import React, { useState, useEffect } from "react";
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

    setAppliedFilter({ type: "all", value: "" });
  }, [setAppliedFilter]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setFilterType("search");
      setFilterValue(e.target.value);
    }
  };

  const applyFilter = () => {
    let value = filterValue;
    if (filterType === "title") value = searchTerm;
    if (!value || (Array.isArray(value) && (!value[0] || !value[1]))) {
      console.log("Please select a valid filter value.");
      return;
    }
    setAppliedFilter({ type: filterType, value });
  };

  const clearFilters = () => {
    setFilterType("");
    setFilterValue("");
    setSearchTerm("");
    setAppliedFilter({ type: "all", value: "" });
  };

  return (
    <div className="p-4 w-full">
      <h1 className="text-shadow-lg text-white font-alexbrush text-4xl mb-2">
        Painting Filters
      </h1>

      {/* 2x2 Grid for Radio Buttons  */}
      <div className="mt-6 grid grid-cols-2 gap-4 w-full">
        {[
          { type: "search", label: "Title" },
          { type: "artist", label: "Artist" },
          { type: "gallery", label: "Gallery" },
          { type: "years", label: "Years" },
        ].map(({ type, label }) => (
          <label key={type} className="cursor-pointer w-full">
            <input
              type="radio"
              value={type}
              checked={filterType === type}
              onChange={() => setFilterType(type)}
              className="hidden peer"
            />
            <div
              className={`p-3 rounded-xl border-2 font-quicksand text-white text-center transition-all duration-300 transform w-full flex justify-center items-center
                ${
                  filterType === type
                    ? "bg-[#ae752f] border-[#8b5a2b] scale-105 shadow-md"
                    : "bg-[#383838] border-[#222]"
                } 
                hover:scale-105 hover:bg-[#c48a3a]`}
            >
              {label}
            </div>
          </label>
        ))}
      </div>

      {/* Conditional Input Fields (Fixed Width) */}
      <div className="w-full mt-4">
        <div className="flex w-full">
          {filterType === "search" && (
            <div className="relative w-full">
            <input
              type="text"
              className="w-full text-white backdrop-blur bg-white bg-opacity-40 font-quicksand rounded-2xl p-2 pl-4 pr-10 placeholder-white"
              placeholder="Search by title..."
              onKeyDown={handleSearch}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={filterType !== "search"}
            />
            {/* Search Icon */}
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>          
          )}

          {filterType === "artist" && (
            <select
              className="h-10 custom-scrollbar w-full font-quicksand text-white bg-[#ae752f] p-1 rounded-xl transition-all duration-300"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            >
              <option value="">Select Artist</option>
              {artists.map((artist) => (
                <option key={artist.artistId} value={artist.artistId}>
                  {artist.firstName} {artist.lastName}
                </option>
              ))}
            </select>
          )}

          {filterType === "gallery" && (
            <select
              className="h-10 custom-scrollbar w-full font-quicksand text-white bg-[#ae752f] p-1 rounded-xl transition-all duration-300"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            >
              <option value="">Select Gallery</option>
              {galleries.map((gallery) => (
                <option key={gallery.galleryId} value={gallery.galleryId}>
                  {gallery.galleryName}
                </option>
              ))}
            </select>
          )}

          {filterType === "years" && (
            <div className="flex w-full space-x-2">
              <input
                className="w-1/2 text-white text-center backdrop-blur bg-white bg-opacity-40 font-quicksand rounded-2xl p-2 placeholder-white transition-all duration-300"
                inputMode="numeric"
                type="number"
                placeholder="Start Year"
                onChange={(e) =>
                  setFilterValue([e.target.value, filterValue[1] || ""])
                }
                value={filterValue[0] || ""}
              />
              <input
                className="w-1/2 text-white text-center backdrop-blur bg-white bg-opacity-40 font-quicksand rounded-2xl p-2 placeholder-white transition-all duration-300"
                type="number"
                inputMode="numeric"
                placeholder="End Year"
                onChange={(e) =>
                  setFilterValue([filterValue[0] || "", e.target.value])
                }
                value={filterValue[1] || ""}
              />
            </div>
          )}
        </div>
      </div>

      {filterType === "" && (
        <div className="h-10 custom-scrollbar w-full font-quicksand text-white bg-white backdrop-blur bg-opacity-30 p-2 rounded-xl">
          Select filter.
        </div>
      )}      

      <div className="flex gap-4 justify-center mt-4">
        {/* Clear Button */}
        <button
          onClick={clearFilters}
          className="relative px-4 py-2 bg-red-900 text-white rounded-lg overflow-hidden group transition-colors duration-300 ease-in-out"
        >
          <span className="absolute inset-0 bg-red-700 scale-x-0 origin-center transition-transform duration-300 ease-in-out group-hover:scale-x-100 z-0"></span>
          <span className="relative z-10">Clear</span>
        </button>

        {/* Filter Button */}
        <button
          onClick={applyFilter}
          className="relative px-4 py-2 bg-blue-900 text-white rounded-lg overflow-hidden group transition-colors duration-300 ease-in-out"
        >
          <span className="absolute inset-0 bg-blue-700 scale-x-0 origin-center transition-transform duration-300 ease-in-out group-hover:scale-x-100 z-0"></span>
          <span className="relative z-10">Filter</span>
        </button>
      </div>
    </div>
  );
};

export default PaintingsFilter;
