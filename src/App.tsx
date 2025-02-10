import "./App.css";
import { Landing } from "./pages/Landing";
import { cn } from "@/lib/utils";
import { Toaster } from 'sonner';

function App() {
  return (
    <div className={cn(
      "min-h-screen w-full",
      "flex flex-col",
      "bg-gradient-to-br from-gray-800 via-gray-900 to-purple-900",
      "text-gray-100"
    )}>
      <main className="container mx-auto px-6 py-8 flex-grow">
        <Landing />
      </main>
      <footer className="bg-gray-900/30 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-6 py-6 text-center text-sm text-gray-400/60 font-mono hover:text-gray-300 transition-colors">
          Built with Aztec.js and Noir
        </div>
      </footer>
      <Toaster 
        theme="dark" 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgba(31, 41, 55, 0.8)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(107, 114, 128, 0.2)',
            color: '#e5e7eb',
            fontFamily: 'monospace',
          },
          className: 'font-mono',
        }}
      />
    </div>
  );
}

export default App;
