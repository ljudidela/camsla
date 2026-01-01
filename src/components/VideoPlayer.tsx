import ReactPlayer from 'react-player';
import { Camera } from '../types';
import { WifiOff } from 'lucide-react';

interface VideoPlayerProps {
  camera: Camera | null;
}

export const VideoPlayer = ({ camera }: VideoPlayerProps) => {
  if (!camera) {
    return (
      <div className="w-full aspect-video bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-slate-500 gap-4">
        <div className="p-4 bg-slate-800 rounded-full">
          <WifiOff className="w-8 h-8" />
        </div>
        <p>Select a camera to start viewing</p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-slate-800 relative group">
      <ReactPlayer
        url={camera.url}
        width="100%"
        height="100%"
        playing
        controls
        config={{
          youtube: {
            playerVars: { showinfo: 1 }
          }
        }}
      />
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-2">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        LIVE
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <h2 className="text-lg font-bold text-white">{camera.name}</h2>
        <p className="text-sm text-slate-300">{camera.location}</p>
      </div>
    </div>
  );
};