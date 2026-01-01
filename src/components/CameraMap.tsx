import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Camera } from '../types';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix Leaflet default icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface CameraMapProps {
  cameras: Camera[];
  selectedCamera: Camera | null;
  onSelect: (camera: Camera) => void;
}

// Component to fly to selected camera
const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13, {
      duration: 1.5
    });
  }, [center, map]);
  return null;
};

export const CameraMap = ({ cameras, selectedCamera, onSelect }: CameraMapProps) => {
  const center: [number, number] = selectedCamera 
    ? selectedCamera.coordinates 
    : [34.0522, -118.2437]; // Default LA center

  return (
    <div className="h-full w-full rounded-xl overflow-hidden border border-slate-800 relative z-0">
      <MapContainer 
        center={center} 
        zoom={11} 
        scrollWheelZoom={true} 
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <MapUpdater center={center} />

        {cameras.map((cam) => (
          <Marker 
            key={cam.id} 
            position={cam.coordinates}
            eventHandlers={{
              click: () => onSelect(cam),
            }}
          >
            <Popup className="custom-popup">
              <div className="p-1">
                <h3 className="font-bold text-slate-900">{cam.name}</h3>
                <p className="text-xs text-slate-600">{cam.location}</p>
                <button 
                  onClick={() => onSelect(cam)}
                  className="mt-2 w-full bg-blue-600 text-white text-xs py-1 px-2 rounded hover:bg-blue-700"
                >
                  Watch Live
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};