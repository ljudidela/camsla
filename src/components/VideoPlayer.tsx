import ReactPlayer from 'react-player';
import { Camera } from '../types';
import { Loader2, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

interface VideoPlayerProps {
  camera: Camera | null;
}

export const VideoPlayer = ({ camera }: VideoPlayerProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [camera?.id]);

  if (!camera) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-black/20 text-muted-foreground p-8 text-center">
        <VideoCameraIcon className="w-16 h-16 mb-4 opacity-20" />
        <p className="text-lg">Select a camera from the list or map to start watching</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/50">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}
        <ReactPlayer
          url={camera.url}
          width="100%"
          height="100%"
          playing
          controls
          onReady={() => setLoading(false)}
          config={{
            youtube: {
              playerVars: { showinfo: 1, autoplay: 1 }
            }
          }}
        />
      </div>
      
      <div className="mt-4 space-y-2">
        <h2 className="text-2xl font-bold text-foreground">{camera.title}</h2>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{camera.location}</span>
        </div>
      </div>
    </div>
  );
};

function VideoCameraIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}