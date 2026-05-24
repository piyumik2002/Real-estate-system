import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Leaflet markers fix
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Map එක අලුත් තැනකට පන්නන Component එක
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 14);
  return null;
}

const Map = ({ lat, lng, title, location, city }) => {
  const [coords, setCoords] = useState([lat || 6.9271, lng || 79.8612]);

  useEffect(() => {
    // ලිපිනය අනුව Coordinates සෙවීමේ ක්‍රියාවලිය (Geocoding)
    const getCoords = async () => {
      const fullAddress = `${location}, ${city}, Sri Lanka`;
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`
        );
        if (response.data && response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setCoords([parseFloat(lat), parseFloat(lon)]);
        }
      } catch (error) {
        console.error("Geocoding error:", error);
      }
    };

    // අගයන් දෙකම නැත්නම් පමණක් ලිපිනයෙන් සොයන්න
    if (!lat || !lng) {
      getCoords();
    } else {
      setCoords([lat, lng]);
    }
  }, [lat, lng, location, city]);

  return (
    <div className="h-[450px] w-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white relative z-0">
      <MapContainer center={coords} zoom={14} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView center={coords} />
        <Marker position={coords}>
          <Popup className="custom-popup">
            <div className="p-1">
              <p className="font-black text-indigo-600 text-xs uppercase mb-1">Property Location</p>
              <p className="font-bold text-slate-800">{title}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;