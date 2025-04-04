import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import SortedList from "../components/SortedList";
import PaintingsList from "../components/PaintingsList.jsx";
import Message from "../components/Message.jsx";
import LoadingFetch from "../hooks/LoadingFetch";
import ImageComponent from "../components/ImageComponent.jsx";

const GenreView = () => {
  const background = "/assets/loginBackground.jpg";
  const { data: genres, loading, error } = LoadingFetch("genres"); // Use the hook for fetch & caching
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Update selected genre when the ID changes
  useEffect(() => {
    if (selectedGenreId) {
      const selected = genres.find((genre) => genre.genreId === selectedGenreId);
      setSelectedGenre(selected);
    } else {
      setSelectedGenre(null);
    }
  }, [selectedGenreId, genres]);

  return (
    <div
      className="pt-12 flex h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex h-full w-full">
        {/* Left column - Genre list */}
        <div className="font-quicksand custom-scrollbar w-3/12 p-4 overflow-y-auto">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message text={`Error: ${error}`} />
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
        <div className="font-quicksand custom-scrollbar w-9/12 overflow-y-auto">
          <div className="h-9/12 min-h-9/12 max-h-9/12">
            {selectedGenre ? (
        <div className="flex justify-between items-start p-4 custom-scrollbar max-h-9/12 text-sm m-2 bg-white bg-opacity-20 rounded-xl backdrop-blur-xl overflow-y-auto">
        {/* Left side: Image + Genre Name */}
        <div className="flex flex-col items-center w-4/12">
          <div className="w-11/12 h-11/12 overflow-hidden rounded-lg flex-shrink-0">
            <ImageComponent 
              id={selectedGenre.genreId} 
              type="genre" 
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-shadow text-white font-bold mt-2 font-alexbrush text-2xl">
            {selectedGenre.genreName}
          </h2>
          <a
            href={selectedGenre.wikiLink}
            className="inline-block font-quicksand text-xs text-white bg-[#ae752f] p-1 px-3 mt-2 rounded-xl font-normal hover:bg-[#21130d] hover:text-white transition-colors duration-300"
          >
            Learn more
          </a>
        </div>
      
        {/* Right side: Description + Button */}
        <div className="flex flex-col w-8/12 ml-4">
          <strong>Description:</strong> {selectedGenre.description}
        </div>
      </div>
                  ) : (
              <div className="mt-8">
                <Message text="Select a genre to see details." />
              </div>
            )}
          </div>

          {/* Paintings for the selected genre */}
          <div>
            {selectedGenreId ? (
              <PaintingsList
                queryType="genres"
                queryValue={selectedGenreId}
                size="square"
                columns={3}
              />
            ) : (
              <div className="mt-48">
                <Message text="Select a genre to see paintings." />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreView;
