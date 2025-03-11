import React, { useEffect, useState } from "react";
import { fetchData } from "../services/apiServices";

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
 * @param {string} [defaultSort="sortByTitle"] - The default sort option for the paintings. Default "sortByTitle"
 * @returns {JSX.Element} PaintingsList component
 */
const PaintingsList = ({ queryType, queryValue, size = "w_200", columns = 1, defaultSort = "sortByTitle"}) => {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState(defaultSort); // default initial state is sorted by Title
  const [sortedPaintings, setSortedPaintings] = useState([]);

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

  if (loading) return <p>Loading paintings...</p>
  if (error) return <p>Error: {error}</p>
  if (!paintings.length) return <p>No paintings found.</p>

  const gridTemplateColumns = `grid-cols-${columns}`; // Constructing the Tailwind class

  return (
    <div className={`grid ${gridTemplateColumns} gap-4 p-2`}>
      <select className="w-4/12 font-quicksand text-white bg-[#ae752f] p-2 pl-4 rounded-xl"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="sortByArtist">Artist</option>
        <option value="sortByTitle">Title</option>
        <option value="sortByGallery">Gallery</option>
        <option value="sortByYear">Year</option>
      </select>
      {sortedPaintings.map((painting) => ( // Display all paintings fetched
        <div
          key={painting.paintingId}
          className="font-quicksand rounded-xl backdrop-blur bg-white bg-opacity-30 p-3 shadow"
        >
          <img
            src={`${CLOUDINARY_BASE_URL}/${size}/art/paintings/${painting.imageFileName}`}
            alt={painting.title}
            className="w-full h-auto rounded"
          />
          <h3 className="text-lg font-bold mt-2">{painting.title}</h3>
          <p className="text-sm text-bg-[#21130d]">{painting.medium}</p>
          <p className="text-sm">
            <strong>Year:</strong> {painting.yearOfWork}
          </p>
          <p className="text-sm text-bg-[#21130d]">{painting.excerpt}</p>
          <a
            href={painting.wikiLink}
            className="items-right font-quicksand text-sm inline-block text-white bg-[#ae752f] p-1 pl-2 pr-2 m-2 rounded-xl hover:bg-[#21130d] hover:text-white transition-colors duration-300"
          >
            Learn more
          </a>
        </div>
      ))}
    </div>
  );
};

export default PaintingsList;
