import React, { useEffect, useState } from "react";
import { fetchData } from "../services/apiServices";
import PaintingModal from "./PaintingModal";
import PaintingImage from "./PaintingImage";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/funwebdev/image/upload";

/**
 * PaintingsList Component
 *
 * This component fetches and displays paintings based on different query types.
 *
 * @param {string} queryType - The type of query (e.g., "artist", "gallery", "search", "years").
 * @param {string|array} queryValue - The value associated with the query type.
 * @param {string} [size="w_200"] - The width size of the painting image from Cloudinary. Default 200
 * @param {number} [columns=1] - The number of columns in the grid layout. Default 1
 * @param {string} [defaultSort="sortByTitle"] - The default sort option for the paintings. Default is alphabetical title sort
 * @returns {JSX.Element} PaintingsList component
 */
const PaintingsList = ({ queryType, queryValue, size = "w_200", columns = 1, defaultSort = "sortByTitle"}) => {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState(defaultSort); // default initial state is sorted by Title
  const [sortedPaintings, setSortedPaintings] = useState([]);
  const [selectedPainting, setSelectedPainting] = useState(null); // none by default
  useEffect(() => {
    const sortPaintings = (paintings) => {
      return [...paintings].sort((a, b) => {
        switch (sortOption) {
          case "sortByArtist": 
            return (a.artistName || "").localeCompare(b.artistName || "");
          case "sortByTitle": 
            return (a.title || "").localeCompare(b.title || "");
          case "sortByGallery": 
            return (a.galleryName || "").localeCompare(b.galleryName || "");
          case "sortByYear": 
            return (a.yearOfWork || 0) - (b.yearOfWork || 0);
          default: 
            return 0;
        }
      });
    };
  
    setSortedPaintings(sortPaintings(paintings));
  }, [paintings, sortOption]); // Runs whenever paintings or sortOption changes
  


  useEffect(() => {
    const loadPaintings = async () => {
      setLoading(true);
      setError(null);
      try {
        let route = "paintings";
        switch (queryType) {
          case "artist":
            route = `paintings/artist/${queryValue}`;
            break;
          case "gallery":
            route = `paintings/galleries/${queryValue}`;
            break;
          case "search":
            route = `paintings/search/${queryValue}`;
            break;
          case "genres":
            route = `paintings/genre/${queryValue}`;
            break;
          case "years":
            if (Array.isArray(queryValue) && queryValue.length === 2) {
              route = `paintings/years/${queryValue[0]}/${queryValue[1]}`;
            }
            break;
          case "all":
            route = "paintings";
            break;
          default:
            console.warn("Invalid queryType:", queryType);
            setError("Invalid query type.");
            setPaintings([]);
            setLoading(false);
            return;
        }

        const data = await fetchData(route);
        setPaintings(data);
      } catch (err) {
        console.error("Error fetching paintings:", err);
        setError(err.message || "Failed to fetch paintings.");
        setPaintings([]);
      } finally {
        setLoading(false);
      }
    };

    loadPaintings();
  }, [queryType, queryValue]);
  
  if (loading) return <LoadingSkeleton columns={columns} />
  if (error) return <p>Error: {error}</p>
  if (!paintings.length) return <p>No paintings found.</p>

  const gridTemplateColumns = `grid-cols-${columns}` // Constructing the Tailwind class

  return (
    <div className="m-2 mr-2 mt-0 h-full">
      {selectedPainting && (
        <PaintingModal 
          painting={selectedPainting} 
          onClose={() => setSelectedPainting(null)}
        />
      )}
      {/* Sorting Header - Stays at the Top */}
      <div className="w-80 ml-auto m-2 backdrop-blur bg-white rounded-xl bg-opacity-30 sticky top-2 p-1 z-20 flex justify-end items-center">
            <h1 className="text-white font-quicksand mr-2">Sort Paintings By:</h1>
            <select
              className="w-1/2 font-quicksand text-white bg-[#ae752f] m-1 p-1 rounded-xl"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="sortByArtist">Artist</option>
              <option value="sortByTitle">Title</option>
              <option value="sortByGallery">Gallery</option>
              <option value="sortByYear">Year</option>
            </select>
      </div>
  
    {/* Paintings Grid - Even Height & Scrollable */}
    <div className={`pb-20 custom-scrollbar grid ${gridTemplateColumns} gap-2 gap-y-4 overflow-y-auto h-full grid-auto-rows-fr`}>
      {sortedPaintings.map((painting) => (
        <div className="mr-2 font-quicksand rounded-xl backdrop-blur bg-white bg-opacity-30 p-3 shadow flex flex-col h-full">
          <div key={painting.paintingId}
               onClick={() => setSelectedPainting(painting)}>
            <div className="h-90 flex justify-center items-center">
              <PaintingImage painting={painting} size={size} />
            </div>
            <h3 className="text-lg font-bold mt-2">{painting.title}</h3>
            <p className="text-sm text-bg-[#21130d]">{painting.medium}</p>
            <p className="text-sm"><strong>Year:</strong> {painting.yearOfWork}</p>
            <p className="text-sm text-bg-[#21130d]">{painting.excerpt}</p>
          </div>
        <a
          href={painting.wikiLink}
          className="w-1/2 mx-auto mt-auto font-quicksand text-sm inline-block text-white bg-[#ae752f] p-1 pl-2 pr-2 mt-4 m-2 rounded-xl hover:bg-[#21130d] hover:text-white transition-colors duration-300"
        >
          Learn more
        </a>        
      </div> 
      ))}
    </div>
  </div>
  );
};

/**
 * A reusable component for displaying a grid of skeleton loading placeholders.
 * The number of columns is determined by the "columns" prop.
 * The component renders a grid of gray placeholder boxes with a pulse animation.
 * @param {Object} props - Component properties
 * @param {number} props.columns - The number of columns for the grid
 * @returns {JSX.Element} The LoadingSkeleton component
 */
const LoadingSkeleton = ({ columns }) => {
  // This component is included here because it is made specifically for paintings
  return (
    <div className={`pb-20 p-2 mt-14 custom-scrollbar grid grid-cols-${columns} gap-4 overflow-y-auto h-full grid-auto-rows-fr`}>
      {Array.from({ length: columns * 3 }).map((_, index) => (
        <div key={index} className="mr-2 font-quicksand rounded-xl backdrop-blur bg-white bg-opacity-30 p-3 shadow flex flex-col h-full">
          <div className="animate-pulse">
          <div className="h-80 bg-opacity-50 backdrop-blur bg-gray-100 rounded"></div>
          <div className="h-6 bg-opacity-50 backdrop-blur bg-gray-100rounded mt-2"></div>
          <div className="h-4 bg-opacity-50 backdrop-blur bg-gray-100 rounded mt-2 w-3/4"></div>
          <div className="h-4 bg-opacity-50 backdrop-blur bg-gray-100 rounded mt-2 w-1/2"></div>
          <div className="h-4 bg-opacity-50 backdrop-blur bg-gray-100 rounded mt-2 w-full"></div>
          <div className="w-1/2 h-8 bg-gray-300 rounded-xl mt-2 mx-auto"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaintingsList;
