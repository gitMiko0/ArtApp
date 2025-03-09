import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import SortedList from "../components/SortedList";
import { fetchData } from "../services/apiServices.js";

const GenreView = () => {
  const background = "/assets/jr-korpa-KMEiyRyHW74-unsplash.jpg";
  const [genres, setGenres] = useState([]); // State to store genres
  const [selectedGenreId, setSelectedGenreId] = useState(null); // State for selected genre ID
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await fetchData("genres");
        console.log("Fetched Genres:", data); // Debugging output
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setGenres([]);
      } finally {
        setLoading(false);
      }
    };

    loadGenres();
  }, []);

  return (
    <div
      className="pt-12 flex h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex h-full w-full">
        {/* Left column - Genre list */}
        <div className="font-quicksand custom-scrollbar w-3/12 bg-gray-200 bg-opacity-10 p-4 overflow-y-auto">
          {loading ? (
            <Loading />
          ) : (
            <SortedList
              header="Genres"
              data={genres}
              sortBy="genreName"
              selectedId={selectedGenreId}
              onItemClick={setSelectedGenreId}
              itemKey="genreId"
              renderItem={(genre) => `${genre.genreName}`}
            />
          )}
        </div>

        {/* Right column - Genre details */}
        <div className="font-quicksand custom-scrollbar h-3/12 w-9/12 bg-gray-200 bg-opacity-10 p-4 overflow-y-auto flex flex-col">
          <div className="h-3/12 bg-gray-200 bg-opacity-10 p-4">Header content</div>
          <div className="h-9/12 bg-gray-200 bg-opacity-10 p-4 overflow-y-auto">
            Scrolling content
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreView;
