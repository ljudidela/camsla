export interface Camera {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number]; // [lat, lng]
  url: string;
  thumbnail: string;
  type: 'youtube' | 'hls';
}