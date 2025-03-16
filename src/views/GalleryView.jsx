import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Message from "../components/Message";
import SortedList from "../components/SortedList";
import LoadingFetch from "../hooks/LoadingFetch";
import PaintingsList from "../components/PaintingsList";
import FavoriteButton from "../components/FavoriteButton";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"; // React Leaflet components
import 'leaflet/dist/leaflet.css'; // Leaflet styles
import LocationMap from "../components/LocationMap";

const GalleryView = () => {
  const background = "/assets/loginBackground.jpg";
  const { data: galleries, loading, error } = LoadingFetch("galleries");
  const [selectedGalleryId, setSelectedGalleryId] = useState(null);

  const selectedGallery = galleries?.find( // no need to fetch api
    (gallery) => gallery.galleryId === selectedGalleryId
  );

  function MapUpdater({ position }) { // necessary to pan to the new location of a selected gallery
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.setView(position, 13);
      }
    }, [map, position]);
    return null;
  }
  
  return (
    <div
      className="pt-12 flex h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex h-full w-full">
        {/* Left column - Gallery List */}
        <div className="font-quicksand custom-scrollbar w-3/12 p-4 overflow-y-auto">
          {loading ? (
            <Loading />
          ) : error ? (
            <p className="text-red-500">{error}</p>
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
        <div className="font-quicksand custom-scrollbar w-4/12 p-4 overflow-y-auto">
          <h2 className="text-white text-shadow-lg font-alexbrush text-4xl">Gallery Details</h2>
          {selectedGallery ? (
            <div className="mt-4 p-4 bg-white bg-opacity-30 rounded-xl backdrop-blur">
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
              
              {/* Lat/Long Map Integration with https://react-leaflet.js.org/ (rounded only works with overflow-hidden) */}
                {selectedGallery.latitude && selectedGallery.longitude ? (
                  <LocationMap 
                  latitude={selectedGallery.latitude}
                  longitude={selectedGallery.longitude}
                  name={selectedGallery.galleryName}
                />
                ) : (
                  <p className="text-black mt-4">Location Unavailable</p>
                )}

              {/* Favorites Button */}
              <div className="mt-2">
                <FavoriteButton
                  item={{
                    id: selectedGallery.galleryId,
                    name: `${selectedGallery.galleryName}`
                  }}
                  type="gallery"
                />
              </div>
            </div>
          ) : (
            <Message text="Select a gallery to view details." />
          )}
        </div>

        {/* Right column - Paintings Section */}
        <div className="custom-scrollbar min-h-0 w-5/12 overflow-y-auto">
          <h2 className="text-white text-shadow-lg font-alexbrush text-4xl pt-4">Paintings</h2>
          <div>
            {selectedGallery ? (
              <PaintingsList 
                queryType="gallery" 
                queryValue={selectedGalleryId}
                size="w_600" 
              />
            ) : (
              <Message text="Select a gallery to view paintings." />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryView;
