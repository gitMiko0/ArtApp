import { useEffect, useState } from "react";
import { fetchData } from "../services/apiServices";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/funwebdev/image/upload";

/**
 * PaintingsList Component
 * 
 * This component fetches and displays paintings based on different query types.
 * The component is mainly designed to be reusable for generating the required paintings
 * of each view in the appplication.
 * 
 * @param {string} queryType - The type of query (e.g., "artist", "gallery", "search", "years").
 * @param {string|array} queryValue - The value associated with the query type.
 * @param {string} [size="w_200"] - The size of the painting image from Cloudinary.
 */
const PaintingsList = ({ queryType, queryValue, size = "w_200", columns = 1 }) => {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const gridColumns = `grid-cols-${columns}`;

  useEffect(() => {
    let route = "paintings";
    if (queryType && queryValue) {
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
          break;
      }
    }

    setLoading(true);
    fetchData(route)
      .then((data) => {
        setPaintings(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [queryType, queryValue]);

  if (loading) return <p>Loading paintings...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!paintings.length) return <p>No paintings found.</p>;

  return (
    <div className={`grid ${gridColumns} gap-4 p-2`}>
      {paintings.map((painting) => (
        <div key={painting.paintingId} 
             className="font-quicksand rounded-xl backdrop-blur bg-white bg-opacity-30 p-3 shadow">
          <img
            src={`${CLOUDINARY_BASE_URL}/${size}/art/paintings/${painting.imageFileName}`}
            alt={painting.title}
            className="w-full h-auto rounded"
          />
          <h3 className="text-lg font-bold mt-2">{painting.title}</h3>
          <p className="text-sm text-bg-[#21130d]">{painting.medium}</p>
          <p className="text-sm"><strong>Year:</strong> {painting.yearOfWork}</p>
          <p className="text-sm text-bg-[#21130d]">{painting.excerpt}</p>
          <a
            href={painting.wikiLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-sm"
          >
            Learn more
          </a>
        </div>
      ))}
    </div>
  );
};

export default PaintingsList;
