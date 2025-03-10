import React, { useState } from "react";
import Loading from "../components/Loading";
import SortedList from "../components/SortedList";
import LoadingFetch from "../hooks/useFetch";
import PaintingsList from "../components/PaintingsList";
/**
 * Component to display a list of artists and their details.
 * Allows users to select an artist and view their paintings.
 */
const ArtistView = () => {
  const background = "/assets/loginBackground.jpg"; // Background image path
  const { data: artists, loading, error } = LoadingFetch("artists");
  const [selectedArtistId, setSelectedArtistId] = useState(null); // State for selected artist ID

  return (
    <div
      className="pt-12 flex h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex h-full w-full">
        {/* Left column - Artist list */}
        <div className="font-quicksand custom-scrollbar w-3/12 bg-gray-200 bg-opacity-20 p-4 overflow-y-auto">
          {loading ? (
            <Loading />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <SortedList
              header="Artists"
              data={artists}
              sortBy="lastName"
              selectedId={selectedArtistId}
              onItemClick={setSelectedArtistId}
              itemKey="artistId"
              renderItem={(artist) => `${artist.firstName} ${artist.lastName}`}
            />
          )}
        </div>

        {/* Middle column - Artist details */}
        <div className="font-quicksand custom-scrollbar w-4/12 bg-gray-200 bg-opacity-20 p-4 overflow-y-auto">
          <h2 className="font-bold font-alexbrush text-4xl mb-2">Artist Details</h2>
          {selectedArtistId ? (
            artists
              .filter((artist) => artist.artistId === selectedArtistId)
              .map((artist) => (
                <div className="p-4 bg-white bg-opacity-30 rounded-xl backdrop-blur-xl" key={artist.artistId}>
                  <p>
                    <strong>Name:</strong> {artist.firstName} {artist.lastName}
                  </p>
                  <p>
                    <strong>Nationality:</strong> {artist.nationality}
                  </p>
                  <p>
                    <strong>Born:</strong> {artist.yearOfBirth}
                  </p>
                  <p>
                    <strong>Died:</strong> {artist.yearOfDeath || "N/A"}
                  </p>
                  <p>
                    <strong>Details:</strong> {artist.details}
                  </p>
                  <a
                    href={artist.artistLink}
                    className="inline-block text-white bg-[#ae752f] p-2 mt-2 rounded-xl hover:bg-[#21130d] hover:text-white transition-colors duration-300"
                  >
                    Learn more
                  </a>
                </div>
              ))
          ) : (
            <p>Select an artist to view details.</p>
          )}
        </div>

        {/* Right column - Paintings for the selected artist */}
        <div className="custom-scrollbar w-5/12 bg-gray-200 bg-opacity-20 overflow-y-auto">
        <h2 className="font-bold font-alexbrush text-4xl mt-4 mb-0">Paintings</h2>
          {selectedArtistId ? (
              <PaintingsList 
                queryType="artist" 
                queryValue={selectedArtistId} 
                size="w_400" 
                artistId={selectedArtistId}
              />
            ) : (
              <p className="font-quicksand p-4">Select artist to view their paintings</p>
            )}          
        </div>
      </div>
    </div>
  );
};

export default ArtistView;
