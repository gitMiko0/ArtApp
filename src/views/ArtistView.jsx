import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import SortedList from "../components/SortedList";
import { fetchData } from "../services/apiServices.js";

/**
 * Component to display a list of artists and their details.
 * Allows users to select an artist and view their paintings.
 */
const ArtistView = () => {
  const [artists, setArtists] = useState([]); // State to store artists
  const [selectedArtistId, setSelectedArtistId] = useState(null); // State for selected artist ID
  const background = "/assets/loginBackground.jpg"; // Background image path
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtists = async () => {
      try {
        const data = await fetchData("artists");
        console.log("Fetched Artists:", data); // Debugging output
        setArtists(data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false after fetch
      }
    };

    loadArtists();
  }, []);

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
                <div className="p-4 bg-white bg-opacity-10 rounded-xl backdrop-blur" key={artist.artistId}>
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
        <div className="w-5/12 bg-gray-200 bg-opacity-50 p-4">
          <h2 className="font-bold font-alexbrush text-4xl mb-2">Paintings</h2>
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
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaintings = async () => {
      setLoading(true);
      try {
        const data = await fetchData(`paintings/artist/${artistId}`);
        setPaintings(data);
      } catch (error) {
        console.error("Error fetching paintings:", error);
        setPaintings([]); // Ensure paintings is an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchPaintings();
  }, [artistId]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : paintings.length > 0 ? (
        paintings.map((painting) => (
          <div key={painting.paintingId}>
            <h3 className="font-quicksand">{painting.title}</h3>
          </div>
        ))
      ) : (
        <p>No paintings available.</p>
      )}
    </div>
  );
};

export default ArtistView;