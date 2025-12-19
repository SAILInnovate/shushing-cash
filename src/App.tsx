import { useState } from 'react';
import { Loader2, Terminal } from 'lucide-react';
import OnboardingModal from './OnboardingModal';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="h-screen w-full bg-black flex flex-col overflow-hidden font-mono">
      
      {/* HEADER */}
      <header className="h-[60px] shrink-0 bg-[#0a0a0a] flex items-center justify-between px-4 border-b border-gray-800 z-20">
        
        {/* LEFT: Branding + Live Dot */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff41] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ff41]"></span>
          </div>
          <h1 className="text-white text-lg font-bold tracking-widest">
            SHUSH.CASH
          </h1>
        </div>

        {/* RIGHT: Deploy Button */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#00ff41] hover:bg-[#00cc33] text-black px-3 py-2 rounded text-xs font-bold tracking-widest flex items-center gap-2 transition-all shadow-[0_0_10px_rgba(0,255,65,0.3)]"
        >
          <Terminal className="w-4 h-4" />
          <span>DEPLOY</span>
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative flex-1 w-full bg-black">
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col gap-3 items-center justify-center bg-black z-10 text-[#00ff41]">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xs font-mono tracking-widest animate-pulse">ESTABLISHING UPLINK...</span>
          </div>
        )}

        {/* DigitalOcean Iframe */}
        <iframe
          src="https://shushingcash-j58k7.ondigitalocean.app/?embed=true&theme=dark"
          className="w-full h-full border-0"
          onLoad={() => setIsLoading(false)}
          title="SMC-Titan Terminal"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </main>

      {/* Onboarding Modal */}
      <OnboardingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
    </div>
  );
}

export default App;