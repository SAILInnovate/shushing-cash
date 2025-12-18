import { useState } from 'react';
import { Loader2 } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="h-screen w-full bg-black flex flex-col overflow-hidden">
      <header className="h-[50px] bg-[#111111] flex items-center justify-center relative border-b border-gray-900">
        <div className="absolute left-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00ff41] pulse-live"></div>
          <span className="text-[#00ff41] text-xs font-medium tracking-wide">LIVE</span>
        </div>

        <h1 className="text-white text-xl font-bold tracking-wider">
          SHUSH.CASH
        </h1>
      </header>

      <main className="relative flex-1 w-full overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
            <Loader2 className="w-8 h-8 text-[#00ff41] animate-spin" />
          </div>
        )}

        <iframe
          src="https://shushingcash.streamlit.app/?embed=true&theme=dark"
          className="w-full h-full border-0"
          onLoad={() => setIsLoading(false)}
          title="SHUSH.CASH Trading Dashboard"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </main>
    </div>
  );
}

export default App;
