import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Create a custom icon for the marker
const officeIcon = new L.Icon({
  iconUrl: require('../assets/office-2.png'),
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const About = () => {
  return (
    <div className="container mx-auto py-12 mt-5">
      <h2 className="text-3xl font-bold text-center mb-12">About Us</h2>
      <div className="mb-12">
        <MapContainer center={[-6.91173,109.129387]} zoom={13} style={{ height: "400px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[-6.91173,109.129387]} icon={officeIcon}>
            <Popup>
              Our Office Location
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <div>
        <p className="text-lg">
          
        </p>
      </div>
    </div>
  );
};

export default About;
