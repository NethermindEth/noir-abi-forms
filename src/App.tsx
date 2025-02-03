import './App.css'
import { Landing } from './pages/Landing'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">Noir Contract Explorer</h1>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <Landing />
      </main>
      <footer className="border-t border-border">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          Built with Aztec.js and Noir
        </div>
      </footer>
    </div>
  )
}

export default App
