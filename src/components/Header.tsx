import { Video, MapPin } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <Video className="w-6 h-6" />
          <h1 className="text-xl font-bold tracking-tight text-white">
            LA<span className="text-primary">Live</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>Los Angeles, CA</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        </div>
      </div>
    </header>
  );
};