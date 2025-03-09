import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import SortedList from "../components/SortedList";
import { fetchData } from "../services/apiServices.js";

const GenreView = () => {
  const background = "/assets/jr-korpa-KMEiyRyHW74-unsplash.jpg";
  const [genres, setGenres] = useState([]); // State to store artists
  const [selectedGenreId, setSelectedGenreId] = useState(null); // State for selected artist ID

  useEffect(() => {
    const loadGenres = async () => {
      const data = await fetchData("genres");
      console.log("Fetched Artists:", data); // Debugging output
      setGenres(data);
    };

    loadGenres();
  }, []);

  return (
    <div
      className="pt-12 flex h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex h-full w-full">
        {/* Left column - Artist list */}
        <div className="font-quicksand custom-scrollbar w-3/12 bg-gray-200 bg-opacity-10 p-4 overflow-y-auto">
          <SortedList
            header="Genres"
            data={genres}
            sortBy="genreName"
            selectedId={selectedGenreId}
            onItemClick={setSelectedGenreId}
            itemKey="genreId"
            renderItem={(genres) => `${genres.genreName}`}
          />
        </div>
      </div>
    </div>
  );};

export default GenreView;




