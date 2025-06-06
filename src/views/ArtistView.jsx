import React, { useState } from "react";
import Loading from "../components/Loading";
import SortedList from "../components/SortedList";
import LoadingFetch from "../hooks/LoadingFetch";
import PaintingsList from "../components/PaintingsList";
import FavoriteButton from "../components/FavoriteButton";
import Message from "../components/Message";
import ImageComponent from "../components/ImageComponent";

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
        <div className="font-quicksand custom-scrollbar h-full w-3/12 p-4 overflow-y-auto">
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
        <div className="font-quicksand custom-scrollbar w-4/12 p-4 overflow-y-auto">
          <h2 className="text-shadow-lg text-white font-alexbrush text-4xl mb-2">Artist Details</h2>
          {selectedArtistId ? (
            artists
              .filter((artist) => artist.artistId === selectedArtistId)
              .map((artist) => (
                <div className="p-4 bg-white bg-opacity-30 rounded-xl backdrop-blur-xl" key={artist.artistId}>
                  <ImageComponent id={artist.artistId} type="artist" size="square"/>
                  <p className="mt-2"><strong>Name:</strong> {artist.firstName} {artist.lastName}</p>
                  <p><strong>Nationality:</strong> {artist.nationality}</p>
                  <p><strong>Born:</strong> {artist.yearOfBirth}</p>
                  <p><strong>Died:</strong> {artist.yearOfDeath || "N/A"}</p>
                  <p><strong>Details:</strong> {artist.details}</p>
                  <a
                    href={artist.artistLink}
                    className="inline-block text-white bg-[#ae752f] pt-1 pb-1 p-2 mt-2 rounded-xl hover:bg-[#21130d] hover:text-white transition-colors duration-300"
                  >
                    Learn more
                  </a>
                  <div className="mt-2">
                    <FavoriteButton
                      item={{
                        id: artist.artistId,
                        name: `${artist.firstName} ${artist.lastName}`
                      }}
                      type="artist"
                    />
                  </div>
                </div>
              ))
          ) : (
            <Message text="Select an artist to view their details"/>
          )}
        </div>

        {/* Right column - Paintings for the selected artist */}
        <div className="custom-scrollbar w-5/12 h-9/12 overflow-y-auto">
          <h2 className="text-shadow-lg text-white font-alexbrush text-4xl mt-4 mb-2">
            Paintings
          </h2>
          <div>
            {selectedArtistId ? (
              <PaintingsList 
                queryType="artist" 
                queryValue={selectedArtistId} 
                size="square" 
              />
            ) : (
              <Message text="Select an artist to view their paintings"/>
            )}          
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistView;
