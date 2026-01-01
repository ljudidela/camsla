import { Camera } from '../types';
import { PlayCircle } from 'lucide-react';
import { clsx } from 'clsx';

interface CameraListProps {
  cameras: Camera[];
  selectedId: string | null;
  onSelect: (camera: Camera) => void;
}

export const CameraList = ({ cameras, selectedId, onSelect }: CameraListProps) => {
  return (
    <div className="space-y-3 p-4">
      {cameras.map((camera) => (
        <div
          key={camera.id}
          onClick={() => onSelect(camera)}
          className={clsx(
            "group relative flex gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 border",
            selectedId === camera.id
              ? "bg-secondary border-primary/50 shadow-lg shadow-primary/5"
              : "bg-card border-border hover:border-primary/30 hover:bg-secondary/50"
          )}
        >
          <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
            <img 
              src={camera.thumbnail} 
              alt={camera.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <PlayCircle className="w-6 h-6 text-white" />
            </div>
            {selectedId === camera.id && (
              <div className="absolute inset-0 ring-2 ring-primary ring-inset rounded-lg" />
            )}
          </div>
          
          <div className="flex flex-col justify-center min-w-0">
            <h3 className={clsx(
              "font-medium truncate transition-colors",
              selectedId === camera.id ? "text-primary" : "text-foreground group-hover:text-primary"
            )}>
              {camera.title}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {camera.location}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-red-500/10 text-[10px] font-medium text-red-500">
                <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                LIVE
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};