// components/LocationMap.js
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet's default marker icon issue
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapUpdater({ position, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, zoom);
    }
  }, [map, position, zoom]);
  return null;
}

const LocationMap = ({ latitude, longitude, name }) => {
  if (!latitude || !longitude) {
    return <p className="text-black mt-4">Location Unavailable</p>;
  }

  const position = [latitude, longitude];
  const zoomLevel = 10;

  return (
    <div className="mt-4 mb-4 border border-4 border-white rounded-xl">
      <div className="h-64 w-full rounded-lg overflow-hidden">
        <MapContainer center={position} zoom={zoomLevel} zoomControl={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>{name}</Popup>
          </Marker>
          <MapUpdater position={position} zoom={zoomLevel} />
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationMap;
