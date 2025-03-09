import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import SortedList from "../components/SortedList";
import { fetchData } from "../services/apiServices.js";

const GalleryView = () => {
  const [galleries, setGalleries] = useState([]);
  const [selectedGalleryId, setSelectedGalleryId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGalleries = async () => {
      setLoading(true);
      try {
        const data = await fetchData("galleries");
        console.log("Fetched Galleries:", data); // Debugging output
        if (Array.isArray(data)) {
          setGalleries(data);
        }
      } catch (error) {
        console.error("Error fetching galleries:", error);
      } finally {
        setLoading(false);
      }
    };
    loadGalleries();
  }, []);

  const selectedGallery = galleries.find(
    (gallery) => gallery.galleryId === selectedGalleryId
  );

  const background = "/assets/paintingsBG.jpg";

  return (
    <div
      className="pt-12 flex h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex h-full w-full bg-black bg-opacity-40">
        {/* Left column - Gallery List */}
        <div className="font-quicksand custom-scrollbar w-3/12 bg-gray-200 bg-opacity-40 p-4 overflow-y-auto">
          {loading ? (
            <Loading />
          ) : (
            <SortedList
              header="Galleries"
              data={galleries}
              sortBy="galleryName"
              selectedId={selectedGalleryId}
              onItemClick={setSelectedGalleryId}
              itemKey="galleryId"
              renderItem={(gallery) => gallery.galleryName}
            />
          )}
        </div>

        {/* Middle column - Gallery Details */}
        <div className="font-quicksand custom-scrollbar w-4/12 bg-gray-200 bg-opacity-40 p-4 overflow-y-auto">
          <h2 className="font-bold font-alexbrush text-2xl mb-2">Gallery Details</h2>
          {selectedGallery ? (
          <div className="p-4 bg-white bg-opacity-10 rounded-xl backdrop-blur">
              <p><strong>Name:</strong> {selectedGallery.galleryName}</p>
              <p><strong>Native Name:</strong> {selectedGallery.galleryNativeName}</p>
              <p><strong>City:</strong> {selectedGallery.galleryCity}</p>
              <p><strong>Address:</strong> {selectedGallery.galleryAddress}</p>
              <p><strong>Country:</strong> {selectedGallery.galleryCountry}</p>
              <p>
                <a
                  href={selectedGallery.galleryWebSite}
                  className="inline-block text-white bg-[#ae752f] p-2 mt-2 rounded-xl hover:bg-[#21130d] hover:text-white transition-colors duration-300"
                >
                  Visit Gallery
                </a>
              </p>
              <p><strong>Latitude:</strong> {selectedGallery.latitude}</p>
              <p><strong>Longitude:</strong> {selectedGallery.longitude}</p>
            </div>
          ) : (
            <p className="font-quicksand">Select a gallery to view details.</p>
          )}
        </div>

        {/* Right column - Paintings Section */}
        <div className="w-5/12 bg-gray-200 bg-opacity-50 p-4">
          <h2 className="font-bold font-alexbrush text-2xl mb-2">Paintings</h2>
        </div>
      </div>
    </div>
  );
};

export default GalleryView;
