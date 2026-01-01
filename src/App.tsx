import { useState } from 'react';
import { Header } from './components/Header';
import { CameraList } from './components/CameraList';
import { VideoPlayer } from './components/VideoPlayer';
import { CameraMap } from './components/CameraMap';
import { CAMERAS } from './data/cameras';
import { Camera } from './types';

function App() {
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(CAMERAS[0]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto p-4 lg:p-6 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-7rem)]">
          
          {/* Sidebar List - 3 cols on large screens */}
          <div className="lg:col-span-3 h-full overflow-hidden order-2 lg:order-1">
            <CameraList 
              cameras={CAMERAS} 
              selectedId={selectedCamera?.id || null} 
              onSelect={setSelectedCamera} 
            />
          </div>

          {/* Main Content - 9 cols on large screens */}
          <div className="lg:col-span-9 flex flex-col gap-6 h-full overflow-y-auto lg:overflow-hidden order-1 lg:order-2">
            {/* Video Player Section */}
            <div className="flex-shrink-0">
              <VideoPlayer camera={selectedCamera} />
            </div>

            {/* Map Section */}
            <div className="flex-1 min-h-[300px] bg-slate-900 rounded-xl">
              <CameraMap 
                cameras={CAMERAS} 
                selectedCamera={selectedCamera} 
                onSelect={setSelectedCamera} 
              />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;