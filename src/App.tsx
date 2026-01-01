import { useState } from 'react';
import { Header } from './components/Header';
import { CameraList } from './components/CameraList';
import { VideoPlayer } from './components/VideoPlayer';
import { MapView } from './components/MapView';
import { CAMERAS } from './data/cameras';
import { Camera } from './types';
import { clsx } from 'clsx';

function App() {
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(CAMERAS[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className="flex-1 flex overflow-hidden relative">
        {/* Sidebar List */}
        <aside className={clsx(
          "absolute lg:relative z-40 w-80 h-full bg-card border-r border-border transition-transform duration-300 ease-in-out flex flex-col",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}>
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">Available Cameras</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            <CameraList 
              cameras={CAMERAS} 
              selectedId={selectedCamera?.id || null} 
              onSelect={(cam) => {
                setSelectedCamera(cam);
                setIsSidebarOpen(false);
              }}
            />
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="absolute inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left/Top: Video Player */}
          <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
            <div className="max-w-5xl mx-auto space-y-6">
              <VideoPlayer camera={selectedCamera} />
              
              {/* Map Section (Below video on desktop) */}
              <div className="h-[300px] lg:h-[400px] w-full">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Camera Location
                </h3>
                <MapView 
                  cameras={CAMERAS} 
                  selectedCamera={selectedCamera} 
                  onSelect={setSelectedCamera}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;