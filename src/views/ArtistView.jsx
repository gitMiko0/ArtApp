import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";

/**
 * Component to display a list of artists and their details.
 * Allows users to select an artist and view their paintings.
 */
const ArtistView = () => {
  const [artists, setArtists] = useState([]); // State to store artists
  const [selectedArtistId, setSelectedArtistId] = useState(null); // State for selected artist ID
  const background = "/assets/loginBackground.jpg"; // Background image path

  // Fetch artists from API
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch("https://nodea1.onrender.com/api/artists");
        const data = await response.json();
        if (Array.isArray(data)) {
          setArtists(data);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div
      className="pt-12 flex h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex h-full w-full">
        {/* Left column - Artist list */}
        <div className="font-quicksand custom-scrollbar w-3/12 bg-gray-200 bg-opacity-40 p-4 overflow-y-auto">
          <h2 className="font-alexbrush text-2xl mb-2">Artists</h2>
          <ul>
            {artists.map((artist) => (
              <li
                key={artist.artistId} // User clicked item
                className={`rounded-xl cursor-pointer p-2 m-4 mb-2 rounded transition-colors duration-300  ${
                  selectedArtistId === artist.artistId ? "rounded-xl bg-[#21130d] text-white" : "bg-white bg-opacity-20 -xl backdrop-blur hover:bg-[#21130d] hover:text-white"
                }`}
                onClick={() => setSelectedArtistId(artist.artistId)}
              >
                {artist.firstName} {artist.lastName}
              </li>
            ))}
          </ul>
        </div>

        {/* Middle column - Artist details */}
        <div className="font-quicksand custom-scrollbar w-4/12 bg-gray-200 bg-opacity-40 p-4 overflow-y-auto">
          <h2 className="font-alexbrush text-2xl mb-2">Artist Details</h2>
          {selectedArtistId ? (
            <>
              {artists
                .filter((artist) => artist.artistId === selectedArtistId)
                .map((artist) => (
                  <div className="p-4 bg-white bg-opacity-10 rounded-xl backdrop-blur"key={artist.artistId}>
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
                ))}
            </>
          ) : (
            <p>Select an artist to view details.</p>
          )}
        </div>

        {/* Right column - Paintings for the selected artist */}
        <div className="w-5/12 bg-gray-200 bg-opacity-50 p-4">
          <h2 className="font-alexbrush text-2xl mb-2">Paintings</h2>
          {selectedArtistId ? (
           <Paintings artistId={selectedArtistId} />
          ) : (
            <p className="font-quicksand">Select an artist to view their paintings.</p>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Component to display paintings for a selected artist.
 * Fetches paintings from an API based on the provided artistId.
 */
const Paintings = ({ artistId }) => {
  const [paintings, setPaintings] = useState(null); // Initially set to null
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchPaintings = async () => {
      setLoading(true); // Indicate loading before fetching
      try {
        const response = await fetch(`https://nodea1.onrender.com/api/paintings/artist/${artistId}`);
        const data = await response.json();
        setPaintings(data);
      } catch (error) {
        console.error("Error fetching paintings:", error);
        setPaintings([]); // Set paintings to empty array on error
      } finally {
        setLoading(false); // Indicate loading complete
      }
    };

    fetchPaintings();
  }, [artistId]); // Re-fetch paintings when artistId changes

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        paintings.map((painting) => (
          <div key={painting.paintingId}>
            <h3 className="font-quicksand">{painting.title}</h3>
          </div>
        ))
      )}
    </div>
  );
};

export default ArtistView;