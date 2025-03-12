import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import SortedList from "../components/SortedList";
import PaintingsList from "../components/PaintingsList.jsx";
import { fetchData } from "../services/apiServices.js";

const GenreView = () => {
  const background = "/assets/jr-korpa-KMEiyRyHW74-unsplash.jpg";
  //const background = "/assets/loginBackground.jpg";
  const [genres, setGenres] = useState([]); // State to store genres
  const [selectedGenreId, setSelectedGenreId] = useState(null); // State for selected genre ID
  const [selectedGenre, setSelectedGenre] = useState(null); // State for selected genre details
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

  // Fetch selected genre details when selectedGenreId changes
  useEffect(() => {
    if (selectedGenreId) {
      const selected = genres.find((genre) => genre.genreId === selectedGenreId);
      setSelectedGenre(selected);
    } else {
      setSelectedGenre(null); // Clear details when no genre is selected
    }
  }, [selectedGenreId, genres]);

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
        <div className="font-quicksand custom-scrollbar h-3/12 w-9/12 bg-gray-200 bg-opacity-10 overflow-y-auto flex flex-col">
          <div className="h-3/12 max-h-3/12">
            {/* Genre details shown here */}
            {selectedGenre ? (
              <div className="flex justify-between items-center">
                <h2 className="font-bold m-2 font-alexbrush text-2xl">
                  {selectedGenre.genreName} 
                  <a
                    href={selectedGenre.wikiLink}
                    className="items-right font-quicksand text-xs inline-block text-white bg-[#ae752f] p-1 pl-2 pr-2 mt-2 rounded-xl font-normal hover:bg-[#21130d] hover:text-white transition-colors duration-300"
                  >
                    Learn more
                  </a>
                </h2>
                <div className="p-4 custom-scrollbar max-h-40 text-sm m-2 bg-white bg-opacity-20 rounded-xl backdrop-blur-xl overflow-y-auto">
                  <strong>Description:</strong> {selectedGenre.description}
                </div>
              </div>
            ) : (
              <p className="h-40 font-quicksand p-4">Select a genre to see details.</p>
            )}
          </div>
          {/* Paintings for the selected genre */}
          <div className="custom-scrollbar  h-9/12 p-4">
            {selectedGenreId ? (
               <PaintingsList
               queryType="genres"
               queryValue={selectedGenreId}
               size="w_400" 
               columns={3}
             />
            ) : (
              <p className="font-quicksand p-4">Select a genre to see paintings.</p>
            )};
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreView;
