"use client"
import { useState, useEffect } from "react"
import { Terminal } from "@/components/terminal"
import { GuiPortfolio } from "@/components/gui-portfolio"
import { Monitor, TerminalIcon, X, Info } from "lucide-react"

export default function Portfolio() {
  const [viewMode, setViewMode] = useState<"terminal" | "gui">("terminal")
  const [showWelcome, setShowWelcome] = useState(true)

  // Hide welcome message after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 8000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div 
      className="min-h-screen text-green-400 font-mono overflow-hidden relative"
      style={{
        backgroundImage: 'url(/mountain.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content container with relative positioning */}
      <div className="relative z-10">
        {/* Prominent Header Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-700">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Logo/Title */}
              <div className="flex items-center space-x-3">
                {/* Profile Picture */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center overflow-hidden border-2 border-white/20">
                  {/* Replace this with your actual image */}
                  <img 
                    src="/photo.jpg" 
                    alt="Abhishek Sharma" 
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 25%' }}
                    onError={(e) => {
                      // Fallback to initials if image doesn't load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <span className="text-black font-bold text-lg hidden">AS</span>
                </div>
                <div>
                  <h1 className="text-white font-bold text-lg">Abhishek Sharma</h1>
                  <p className="text-gray-400 text-xs">Computer Science Student & Developer</p>
                </div>
              </div>

              {/* Main Navigation */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setViewMode("terminal")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                    viewMode === "terminal"
                      ? "bg-green-600 text-white shadow-lg"
                      : "text-gray-300 hover:text-green-400 hover:bg-gray-800/80 border border-gray-600"
                  }`}
                >
                  <TerminalIcon size={18} />
                  <span>Interactive Terminal</span>
                </button>
                <button
                  onClick={() => setViewMode("gui")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                    viewMode === "gui"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-300 hover:text-blue-400 hover:bg-gray-800/80 border border-gray-600"
                  }`}
                >
                  <Monitor size={18} />
                  <span>Traditional Resume</span>
                </button>
              </div>

              {/* Help Button */}
              <button
                onClick={() => setShowWelcome(true)}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800/80"
                title="Show navigation help"
              >
                <Info size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Welcome/Help Modal */}
        {showWelcome && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowWelcome(false)}></div>
            <div className="relative bg-gray-900/95 border border-gray-700 rounded-lg p-6 max-w-md w-full backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-bold text-lg">Welcome to My Portfolio! 👋</h2>
                <button
                  onClick={() => setShowWelcome(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-3 text-gray-300 text-sm">
                <p>I've created two different ways to explore my portfolio:</p>
                
                <div className="bg-gray-800/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TerminalIcon size={16} className="text-green-400" />
                    <span className="font-medium text-green-400">Interactive Terminal</span>
                  </div>
                  <p className="text-xs">Type commands like <code className="bg-gray-700 px-1 rounded">help</code>, <code className="bg-gray-700 px-1 rounded">about</code>, <code className="bg-gray-700 px-1 rounded">skills</code> to explore my background interactively.</p>
                </div>
                
                <div className="bg-gray-800/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor size={16} className="text-blue-400" />
                    <span className="font-medium text-blue-400">Traditional Resume</span>
                  </div>
                  <p className="text-xs">View my experience, skills, and projects in a traditional resume format.</p>
                </div>
                
                <p className="text-xs text-gray-400 mt-4">💡 <strong>Tip:</strong> Try the terminal first for a unique experience!</p>
              </div>
            </div>
          </div>
        )}

        {/* Main content with proper spacing */}
        <div className="container mx-auto p-4 max-w-6xl pt-24">
          {viewMode === "terminal" ? <Terminal /> : <GuiPortfolio />}
        </div>
      </div>
    </div>
  )
}
