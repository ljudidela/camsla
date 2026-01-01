import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Camera } from '../types';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default Leaflet icons in Vite/Webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
  cameras: Camera[];
  selectedCamera: Camera | null;
  onSelect: (camera: Camera) => void;
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13, {
      duration: 1.5
    });
  }, [center, map]);
  return null;
}

export const MapView = ({ cameras, selectedCamera, onSelect }: MapViewProps) => {
  const center: [number, number] = selectedCamera 
    ? [selectedCamera.lat, selectedCamera.lng] 
    : [34.0522, -118.2437];

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-border shadow-inner bg-secondary/20">
      <MapContainer 
        center={center} 
        zoom={11} 
        className="w-full h-full z-0"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {selectedCamera && <MapUpdater center={[selectedCamera.lat, selectedCamera.lng]} />}

        {cameras.map((camera) => (
          <Marker 
            key={camera.id} 
            position={[camera.lat, camera.lng]}
            eventHandlers={{
              click: () => onSelect(camera),
            }}
          >
            <Popup className="custom-popup">
              <div className="p-1">
                <h3 className="font-bold text-sm mb-1">{camera.title}</h3>
                <p className="text-xs text-gray-500">{camera.location}</p>
                <button 
                  onClick={() => onSelect(camera)}
                  className="mt-2 w-full bg-primary text-primary-foreground text-xs py-1 px-2 rounded hover:bg-primary/90"
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