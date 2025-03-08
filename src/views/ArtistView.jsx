import React, { useState, useEffect } from "react";

const Paintings = ({ artistId }) => {
  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await fetch(`https://nodea1.onrender.com/api/paintings/artist/${artistId}`);
        const data = await response.json();
        setPaintings(data);
      } catch (error) {
        console.error("Error fetching paintings:", error);
      }
    };

    fetchPaintings();
  }, [artistId]); // Fetch paintings when artistId changes

  return (
    <div>
      {paintings.map(painting => (
        <div key={painting.paintingId}>
          <h3 className="font-quicksand">{painting.title}</h3>
        </div>
      ))}
    </div>
  );
};

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
      <div className="flex backdrop-blur h-full w-full bg-black bg-opacity-40">
        {/* Left column - 2/6 width */}
        <div className="font-quicksand custom-scrollbar w-3/12 bg-gray-200 bg-opacity-40 p-4 overflow-y-auto">
          <h2 className="font-alexbrush text-2xl mb-2">Artists</h2>
          <ul>
            {artists.map((artist) => (
              <li
                key={artist.artistId} // User clicked item
                className={`rounded-xl cursor-pointer p-2 mb-2 rounded transition-colors duration-300  ${
                  selectedArtistId === artist.artistId ? "rounded-xl bg-[#21130d] text-white" : "rounded-xl backdrop-blur hover:bg-[#21130d] hover:text-white"
                }`}
                onClick={() => setSelectedArtistId(artist.artistId)}
              >
                {artist.firstName} {artist.lastName}
              </li>
            ))}
          </ul>
        </div>

        {/* Middle column - 2/6 width */}
        <div className="font-quicksand custom-scrollbar w-4/12 bg-white bg-opacity-40 p-4 overflow-y-auto">
          <h2 className="font-alexbrush text-2xl mb-2">Artist Details</h2>
          {selectedArtistId ? (
            <>
              {artists
                .filter((artist) => artist.artistId === selectedArtistId)
                .map((artist) => (
                  <div key={artist.artistId}>
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
                    <button
                      href={artist.artistLink}
                      className="text-white bg-gray-600 p-2 mt-2 rounded-xl hover:bg-[#21130d] hover:text-white transition-colors duration-300"
                    >
                      Learn more
                    </button>
                  </div>
                ))}
            </>
          ) : (
            <p>Select an artist to view details.</p>
          )}
        </div>

        {/* Right column - 2/6 width source https://nodea1.onrender.com/api/paintings/artist/:Id
            Paintings for the selected artist sorted by title (thumbnail, painting, title, year)
            The user should be able to changesort order between painting title
            and year The user should be able to select a painting (click a button or a
            hyperlink or a row, it’s up to you), which will display the single painting modal dialog
        */}
        <div className="w-5/12 bg-gray-200 bg-opacity-50 p-4">
          <h2 className="font-alexbrush text-2xl mb-2">Paintings</h2>
          {selectedArtistId ? (
           <Paintings artistId={selectedArtistId} />
          ) : (
            <p>Select an artist to view their paintings.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistView;
