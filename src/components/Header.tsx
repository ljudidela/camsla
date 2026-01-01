import { Video, Map, Menu } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header = ({ toggleSidebar }: HeaderProps) => {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md flex items-center px-4 justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-secondary rounded-md transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2 text-primary">
          <Video className="w-6 h-6" />
          <h1 className="text-xl font-bold tracking-tight">LA<span className="text-foreground">Live</span></h1>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <Map className="w-4 h-4" />
          <span>Live Traffic & Views</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-xs font-bold text-primary">LA</span>
        </div>
      </div>
    </header>
  );
};