import React, { useState, useEffect } from "react";

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
        <div className="font-quicksand custom-scrollbar w-2/6 bg-gray-100 bg-opacity-50 p-4 overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Artists</h2>
          <ul>
            {artists.map((artist) => (
              <li
                key={artist.artistId} // Using artistId instead of id
                className={`cursor-pointer p-2 mb-2 rounded ${
                  selectedArtistId === artist.artistId ? "bg-[#21130d] text-white" : "bg-gray-200"
                }`}
                onClick={() => setSelectedArtistId(artist.artistId)} // Using artistId
              >
                {artist.firstName} {artist.lastName}
              </li>
            ))}
          </ul>
        </div>

        {/* Middle column - 2/6 width */}
        <div className="w-2/6 bg-white bg-opacity-50 p-4">
          <h2 className="text-lg font-bold mb-4">Artist Details</h2>
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
                      className="text-white bg-[#21130d] p-2 mt-2 rounded"
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

        {/* Right column - 2/6 width */}
        <div className="w-2/6 bg-gray-200 bg-opacity-50 p-4">
          <h2 className="text-lg font-bold mb-4">Additional Information</h2>
          {selectedArtistId ? (
            <p>Additional info for artist ID: {selectedArtistId}</p>
          ) : (
            <p>Select an artist to view additional information.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistView;
