export interface Camera {
  id: string;
  title: string;
  location: string;
  lat: number;
  lng: number;
  url: string;
  thumbnail: string;
  type: 'youtube' | 'hls';
}