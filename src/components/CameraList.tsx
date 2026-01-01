import { Camera } from '../types';
import { PlayCircle, MapPin } from 'lucide-react';
import { clsx } from 'clsx';

interface CameraListProps {
  cameras: Camera[];
  selectedId: string | null;
  onSelect: (camera: Camera) => void;
}

export const CameraList = ({ cameras, selectedId, onSelect }: CameraListProps) => {
  return (
    <div className="flex flex-col h-full bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
      <div className="p-4 border-b border-slate-800">
        <h3 className="font-semibold text-white">Available Cameras</h3>
        <p className="text-xs text-slate-400">{cameras.length} streams online</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
        {cameras.map((cam) => (
          <button
            key={cam.id}
            onClick={() => onSelect(cam)}
            className={clsx(
              "w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-200 group text-left",
              selectedId === cam.id 
                ? "bg-primary/10 border border-primary/20" 
                : "hover:bg-slate-800 border border-transparent"
            )}
          >
            <div className="relative w-24 h-16 rounded-md overflow-hidden bg-slate-800 flex-shrink-0">
              <img 
                src={cam.thumbnail} 
                alt={cam.name} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                <PlayCircle className={clsx(
                  "w-6 h-6 text-white drop-shadow-md",
                  selectedId === cam.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )} />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className={clsx(
                "font-medium text-sm truncate",
                selectedId === cam.id ? "text-primary" : "text-slate-200"
              )}>
                {cam.name}
              </h4>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{cam.location}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};