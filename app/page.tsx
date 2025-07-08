"use client"
import { useState } from "react"
import { Terminal } from "@/components/terminal"
import { GuiPortfolio } from "@/components/gui-portfolio"
import { Monitor, TerminalIcon } from "lucide-react"

export default function Portfolio() {
  const [viewMode, setViewMode] = useState<"terminal" | "gui">("terminal")

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      {/* Subtle View Toggle */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-lg p-2">
        <button
          onClick={() => setViewMode("terminal")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
            viewMode === "terminal"
              ? "bg-green-600 text-white shadow-lg"
              : "text-gray-400 hover:text-green-400 hover:bg-gray-800"
          }`}
        >
          <TerminalIcon size={16} />
          <span className="text-sm font-medium">Terminal</span>
        </button>
        <button
          onClick={() => setViewMode("gui")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
            viewMode === "gui"
              ? "bg-blue-600 text-white shadow-lg"
              : "text-gray-400 hover:text-blue-400 hover:bg-gray-800"
          }`}
        >
          <Monitor size={16} />
          <span className="text-sm font-medium">Resume</span>
        </button>
      </div>

      <div className="container mx-auto p-4 max-w-6xl">{viewMode === "terminal" ? <Terminal /> : <GuiPortfolio />}</div>
    </div>
  )
}
