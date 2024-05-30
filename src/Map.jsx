import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ positions }) => {
  const mapRef = useRef();

  useEffect(() => {
    if (positions.length > 0) {
      const map = mapRef.current;
      map.flyTo(positions[0], 13);
    }
  }, [positions]);



  return (
    <MapContainer 
      center={[51.505, -0.09]} 
      zoom={13} 
      style={{ height: "100vh", width: "99vw" }} 
      ref={mapRef}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {positions.map((pos, index) => (
        <Marker key={index} position={pos}>
          <Popup>
            User {index}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
