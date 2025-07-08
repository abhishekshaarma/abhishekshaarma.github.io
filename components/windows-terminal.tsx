"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Minus, Square, X } from "lucide-react"

interface Command {
  input: string
  output: string[]
  timestamp: string
}

interface WindowProps {
  title: string
  children: React.ReactNode
  onClose?: () => void
  className?: string
}

interface FileSystem {
  [key: string]: {
    type: "file" | "directory"
    content?: string[]
    children?: FileSystem
  }
}

function Window({ title, children, onClose, className = "" }: WindowProps) {
  return (
    <div className={`bg-gray-200 border-2 border-gray-400 border-t-white border-l-white shadow-lg ${className}`}>
      <div className="bg-blue-800 text-white px-2 py-1 flex items-center justify-between">
        <span className="font-bold text-sm">{title}</span>
        <div className="flex gap-1">
          <button className="w-4 h-4 bg-gray-200 border border-gray-400 border-t-white border-l-white flex items-center justify-center text-xs">
            <Minus size={8} className="text-black" />
          </button>
          <button className="w-4 h-4 bg-gray-200 border border-gray-400 border-t-white border-l-white flex items-center justify-center text-xs">
            <Square size={6} className="text-black" />
          </button>
          <button
            onClick={onClose}
            className="w-4 h-4 bg-gray-200 border border-gray-400 border-t-white border-l-white flex items-center justify-center text-xs"
          >
            <X size={8} className="text-black" />
          </button>
        </div>
      </div>
      <div className="p-3">{children}</div>
    </div>
  )
}

export function WindowsTerminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<Command[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [currentPath, setCurrentPath] = useState("C:\\Portfolio")
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // File system simulation
  const [fileSystem] = useState<FileSystem>({
    Portfolio: {
      type: "directory",
      children: {
        "about.txt": {
          type: "file",
          content: [
            "Name: Abhishek Sharma",
            "School: Columbia College",
            "Major: Computer Science",
            "Expected Graduation: December 2025",
            "Location: Missouri, USA",
            "",
            "I am passionate about software engineering and creating",
            "innovative solutions. I have expertise in Python, C++,",
            "and web development with a focus on AI and full-stack",
            "development.",
          ],
        },
        "skills.txt": {
          type: "file",
          content: [
            "TECHNICAL SKILLS",
            "================",
            "",
            "Programming Languages:",
            "- Python (Advanced)",
            "- C++ (Advanced)",
            "- JavaScript (Intermediate)",
            "- Java (Intermediate)",
            "- HTML/CSS (Advanced)",
            "- SQL (Intermediate)",
            "",
            "Frameworks & Tools:",
            "- React.js, TensorFlow, Keras",
            "- Git, Docker, VS Code",
            "- MySQL, MongoDB, PostgreSQL",
          ],
        },
        "contact.json": {
          type: "file",
          content: [
            "{",
            '  "name": "Abhishek Sharma",',
            '  "email": "abhishekshaarma2@gmail.com",',
            '  "phone": "660-229-2197",',
            '  "github": "github.com/abhishekshaarma",',
            '  "linkedin": "linkedin.com/in/abseksharma",',
            '  "school": "Columbia College",',
            '  "graduation": "December 2025"',
            "}",
          ],
        },
        projects: {
          type: "directory",
          children: {
            "earthquake-nepal.md": {
              type: "file",
              content: [
                "# EarthQuake Watch Nepal",
                "",
                "**Description:** Constant records of recent earthquakes in Nepal",
                "**Tech Stack:** Python, Web APIs, Real-time Data Processing",
                "**Purpose:** Promote earthquake awareness and safety",
                "**GitHub:** github.com/abhishekshaarma/earthquakenepal",
                "",
                "Features:",
                "- Real-time earthquake monitoring",
                "- Data visualization",
                "- Alert system for significant events",
              ],
            },
            "ai-rag-agent.md": {
              type: "file",
              content: [
                "# Customer Support RAG Agent",
                "",
                "**Description:** AI-driven chatbot for scalable user support",
                "**Tech Stack:** AI, LangFlow API, AstraDB",
                "**GitHub:** github.com/abhishekshaarma/ai-customersupport-rag",
                "",
                "Features:",
                "- Natural language processing",
                "- Context-aware responses",
                "- Scalable database integration",
              ],
            },
            "flappy-bird-ai.md": {
              type: "file",
              content: [
                "# Flappy Bird AI",
                "",
                "**Description:** AI agent using NEAT algorithm",
                "**Tech Stack:** Python, NEAT Algorithm, Pygame",
                "**GitHub:** github.com/abhishekshaarma/flappy-bird-AI-NEAT",
                "",
                "Features:",
                "- Neural evolution algorithm",
                "- Dynamic difficulty adaptation",
                "- Performance optimization",
              ],
            },
          },
        },
        "resume.pdf": {
          type: "file",
          content: [
            "PDF Document - Resume",
            "=====================",
            "",
            "This would normally be a PDF file.",
            "Contact me for the actual resume document!",
            "",
            "Email: abhishekshaarma2@gmail.com",
          ],
        },
      },
    },
  })

  const asciiArt = `
    ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
    ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
    ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
    ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
    ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
    ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 
  `

  // ASCII Art Generator
  const generateAsciiArt = (text: string, font = "standard") => {
    const fonts = {
      standard: {
        A: ["  ██  ", " ████ ", "██  ██", "██████", "██  ██", "██  ██", "      "],
        B: ["██████", "██  ██", "██████", "██████", "██  ██", "██████", "      "],
        C: [" █████", "██    ", "██    ", "██    ", "██    ", " █████", "      "],
        D: ["██████", "██  ██", "██  ██", "██  ██", "██  ██", "██████", "      "],
        E: ["██████", "██    ", "█████ ", "█████ ", "██    ", "██████", "      "],
        F: ["██████", "██    ", "█████ ", "█████ ", "██    ", "██    ", "      "],
        G: [" █████", "██    ", "██ ███", "██  ██", "██  ██", " █████", "      "],
        H: ["██  ██", "██  ██", "██████", "██████", "██  ██", "██  ██", "      "],
        I: ["██████", "  ██  ", "  ██  ", "  ██  ", "  ██  ", "██████", "      "],
        J: ["██████", "    ██", "    ██", "    ██", "██  ██", " █████", "      "],
        K: ["██  ██", "██ ██ ", "████  ", "████  ", "██ ██ ", "██  ██", "      "],
        L: ["██    ", "██    ", "██    ", "██    ", "██    ", "██████", "      "],
        M: ["██  ██", "██████", "██████", "██  ██", "██  ██", "██  ██", "      "],
        N: ["██  ██", "███ ██", "██████", "██ ███", "██  ██", "██  ██", "      "],
        O: [" █████", "██  ██", "██  ██", "██  ██", "██  ██", " █████", "      "],
        P: ["██████", "██  ██", "██████", "██    ", "██    ", "██    ", "      "],
        Q: [" █████", "██  ██", "██  ██", "██ ███", "██  ██", " ██████", "     █"],
        R: ["██████", "██  ██", "██████", "██ ██ ", "██  ██", "██  ██", "      "],
        S: [" █████", "██    ", " ████ ", "    ██", "    ██", "█████ ", "      "],
        T: ["██████", "  ██  ", "  ██  ", "  ██  ", "  ██  ", "  ██  ", "      "],
        U: ["██  ██", "██  ██", "██  ██", "██  ██", "██  ██", " █████", "      "],
        V: ["██  ██", "██  ██", "██  ██", "██  ██", " ████ ", "  ██  ", "      "],
        W: ["██  ██", "██  ██", "██  ██", "██████", "██████", "██  ██", "      "],
        X: ["██  ██", " ████ ", "  ██  ", "  ██  ", " ████ ", "██  ██", "      "],
        Y: ["██  ██", "██  ██", " ████ ", "  ██  ", "  ██  ", "  ██  ", "      "],
        Z: ["██████", "    ██", "   ██ ", "  ██  ", " ██   ", "██████", "      "],
        " ": ["      ", "      ", "      ", "      ", "      ", "      ", "      "],
        "0": [" █████", "██  ██", "██ ███", "██████", "███ ██", "██  ██", " █████"],
        "1": ["  ██  ", " ███  ", "  ██  ", "  ██  ", "  ██  ", "  ██  ", "██████"],
        "2": [" █████", "██  ██", "   ██ ", "  ██  ", " ██   ", "██    ", "██████"],
        "3": [" █████", "██  ██", "   ██ ", " ████ ", "   ██ ", "██  ██", " █████"],
        "4": ["██  ██", "██  ██", "██  ██", "██████", "   ██ ", "   ██ ", "   ██ "],
        "5": ["██████", "██    ", "█████ ", "    ██", "    ██", "██  ██", " █████"],
        "6": [" █████", "██    ", "██    ", "██████", "██  ██", "██  ██", " █████"],
        "7": ["██████", "    ██", "   ██ ", "  ██  ", " ██   ", "██    ", "██    "],
        "8": [" █████", "██  ██", "██  ██", " █████", "██  ██", "██  ██", " █████"],
        "9": [" █████", "██  ██", "██  ██", " ██████", "    ██", "    ██", " █████"],
      },
      small: {
        A: ["▄▀█", "█▀█", "▀ █", "  █"],
        B: ["█▀▄", "█▀▄", "█▄▀", "   "],
        C: ["▄▀█", "█▄▄", "▀▀▀", "   "],
        D: ["█▀▄", "█ █", "█▄▀", "   "],
        E: ["█▀▀", "█▀▀", "▀▀▀", "   "],
        F: ["█▀▀", "█▀▀", "█  ", "   "],
        G: ["▄▀█", "█▄█", "▀▀█", "   "],
        H: ["█ █", "█▀█", "█ █", "   "],
        I: ["█", "█", "█", " "],
        J: ["  █", "  █", "▀▀█", "   "],
        K: ["█ █", "██ ", "█ █", "   "],
        L: ["█  ", "█  ", "▀▀▀", "   "],
        M: ["█▄█", "█▀█", "█ █", "   "],
        N: ["█▄█", "█▀█", "█ █", "   "],
        O: ["▄▀█", "█ █", "▀▀▀", "   "],
        P: ["█▀▄", "█▀ ", "█  ", "   "],
        Q: ["▄▀█", "█ █", "▀▀▀", " ▀ "],
        R: ["█▀▄", "█▀▄", "█ █", "   "],
        S: ["▄▀▀", "▀▀▄", "▀▀▀", "   "],
        T: ["▀█▀", " █ ", " █ ", "   "],
        U: ["█ █", "█ █", "▀▀▀", "   "],
        V: ["█ █", "█ █", " █ ", "   "],
        W: ["█ █", "█ █", "█▄█", "   "],
        X: ["█ █", " █ ", "█ █", "   "],
        Y: ["█ █", " █ ", " █ ", "   "],
        Z: ["▀▀▀", " ▄▀", "▀▀▀", "   "],
        " ": [" ", " ", " ", " "],
        "0": ["▄▀█", "█ █", "▀▀▀", "   "],
        "1": ["▄█ ", " █ ", "▄█▄", "   "],
        "2": ["▀▀▄", "▄▀ ", "▀▀▀", "   "],
        "3": ["▀▀▄", " ▀▄", "▀▀▀", "   "],
        "4": ["█ █", "▀▀█", "  █", "   "],
        "5": ["▀▀▀", "▀▀▄", "▀▀▀", "   "],
        "6": ["▄▀▀", "█▀▄", "▀▀▀", "   "],
        "7": ["▀▀▀", "  █", " █ ", "   "],
        "8": ["▄▀▄", "▄▀▄", "▀▀▀", "   "],
        "9": ["▄▀▄", "▀▀█", "▀▀▀", "   "],
      },
      big: {
        A: ["   ███   ", "  █████  ", " ███████ ", "███   ███", "█████████", "███   ███", "███   ███"],
        B: ["████████ ", "███   ███", "███   ███", "████████ ", "████████ ", "███   ███", "████████ "],
        C: [" ████████", "███     █", "███      ", "███      ", "███      ", "███     █", " ████████"],
        D: ["████████ ", "███   ███", "███   ███", "███   ███", "███   ███", "███   ███", "████████ "],
        E: ["█████████", "███      ", "███      ", "████████ ", "████████ ", "███      ", "█████████"],
        F: ["█████████", "███      ", "███      ", "████████ ", "████████ ", "███      ", "███      "],
        G: [" ████████", "███     █", "███      ", "███  ████", "███   ███", "███   ███", " ████████"],
        H: ["███   ███", "███   ███", "███   ███", "█████████", "█████████", "███   ███", "███   ███"],
        I: ["█████████", "   ███   ", "   ███   ", "   ███   ", "   ███   ", "   ███   ", "█████████"],
        J: ["█████████", "      ███", "      ███", "      ███", "      ███", "███   ███", " ████████"],
        K: ["███   ███", "███  ███ ", "███ ███  ", "██████   ", "███ ███  ", "███  ███ ", "███   ███"],
        L: ["███      ", "███      ", "███      ", "███      ", "███      ", "███      ", "█████████"],
        M: ["███   ███", "█████████", "█████████", "███ █ ███", "███   ███", "███   ███", "███   ███"],
        N: ["███   ███", "████  ███", "█████ ███", "███ █████", "███  ████", "███   ███", "███   ███"],
        O: [" ████████", "███   ███", "███   ███", "███   ███", "███   ███", "███   ███", " ████████"],
        P: ["████████ ", "███   ███", "███   ███", "████████ ", "███      ", "███      ", "███      "],
        Q: [" ████████", "███   ███", "███   ███", "███   ███", "███ █ ███", "███  ████", " █████████"],
        R: ["████████ ", "███   ███", "███   ███", "████████ ", "███ ███  ", "███  ███ ", "███   ███"],
        S: [" ████████", "███     █", "███      ", " ███████ ", "      ███", "█     ███", "████████ "],
        T: ["█████████", "   ███   ", "   ███   ", "   ███   ", "   ███   ", "   ███   ", "   ███   "],
        U: ["███   ███", "███   ███", "███   ███", "███   ███", "███   ███", "███   ███", " ████████"],
        V: ["███   ███", "███   ███", "███   ███", "███   ███", "███   ███", " ███████ ", "   ███   "],
        W: ["███   ███", "███   ███", "███   ███", "███ █ ███", "█████████", "█████████", "███   ███"],
        X: ["███   ███", " ███████ ", "  █████  ", "   ███   ", "  █████  ", " ███████ ", "███   ███"],
        Y: ["███   ███", "███   ███", " ███████ ", "   ███   ", "   ███   ", "   ███   ", "   ███   "],
        Z: ["█████████", "      ███", "     ███ ", "    ███  ", "   ███   ", "  ███    ", "█████████"],
        " ": ["         ", "         ", "         ", "         ", "         ", "         ", "         "],
        "0": [" ████████", "███   ███", "███  ████", "███ █████", "████  ███", "███   ███", " ████████"],
        "1": ["   ███   ", "  ████   ", "   ███   ", "   ███   ", "   ███   ", "   ███   ", "█████████"],
        "2": [" ████████", "███   ███", "      ███", "   ██████", "  ███    ", " ███     ", "█████████"],
        "3": [" ████████", "███   ███", "      ███", "  ███████", "      ███", "███   ███", " ████████"],
        "4": ["███   ███", "███   ███", "███   ███", "█████████", "      ███", "      ███", "      ███"],
        "5": ["█████████", "███      ", "███      ", "████████ ", "      ███", "███   ███", " ████████"],
        "6": [" ████████", "███      ", "███      ", "████████ ", "███   ███", "███   ███", " ████████"],
        "7": ["█████████", "      ███", "     ███ ", "    ███  ", "   ███   ", "  ███    ", " ███     "],
        "8": [" ████████", "███   ███", "███   ███", " ████████", "███   ███", "███   ███", " ████████"],
        "9": [" ████████", "███   ███", "███   ███", " █████████", "      ███", "      ███", " ████████"],
      },
    }

    const selectedFont = fonts[font as keyof typeof fonts] || fonts.standard
    const cleanText = text.toUpperCase().slice(0, 15) // Limit length
    const result: string[] = []

    // Get the height of the font
    const fontHeight = selectedFont.A?.length || 7

    // Initialize result array with empty strings
    for (let i = 0; i < fontHeight; i++) {
      result[i] = ""
    }

    // Build each line
    for (const char of cleanText) {
      const charPattern = selectedFont[char as keyof typeof selectedFont]
      if (charPattern) {
        for (let i = 0; i < fontHeight; i++) {
          result[i] += (charPattern[i] || "      ") + " "
        }
      } else {
        // Unknown character, use space
        for (let i = 0; i < fontHeight; i++) {
          result[i] += "      "
        }
      }
    }

    return result
  }

  const handleAdvancedCommand = (command: string): string[] => {
    const [cmd, ...args] = command.split(" ")
    switch (cmd.toLowerCase()) {
      case "help":
        return [
          "Available Commands:",
          "===================",
          "help - Displays available commands",
          "about - Displays information about Abhishek Sharma",
          "skills - Lists technical skills",
          "contact - Shows contact information",
          "projects - Lists notable projects",
          "theme [light|dark] - Sets the theme",
          "clear - Clears the terminal",
          "neofetch - Displays system information (ASCII art)",
          "resume - Opens the resume (not really)",
          "ls - Lists files and directories in the current path",
          "cd <directory> - Changes the current directory",
          "cat <filename> - Displays the content of a file",
          "echo <message> - Displays a message",
          "ascii <text> [font] - Generates ASCII art from text",
        ]
      case "about":
        return fileSystem.Portfolio.children["about.txt"].content
      case "skills":
        return fileSystem.Portfolio.children["skills.txt"].content
      case "contact":
        return fileSystem.Portfolio.children["contact.json"].content
      case "projects": {
        const projectFiles = Object.keys(fileSystem.Portfolio.children.projects.children)
        return ["PROJECTS", "========", ...projectFiles.map((file) => `- ${file}`)]
      }
      case "theme":
        if (args[0] === "light") {
          setIsDarkTheme(false)
          return ["Theme set to light."]
        } else if (args[0] === "dark") {
          setIsDarkTheme(true)
          return ["Theme set to dark."]
        } else {
          return ["Usage: theme [light|dark]"]
        }
      case "clear":
        setHistory([])
        return []
      case "neofetch":
        return asciiArt.split("\n")
      case "resume":
        return fileSystem.Portfolio.children["resume.pdf"].content
      case "ls": {
        const currentDir = currentPath.replace("C:\\", "")
        const dirParts = currentDir.split("\\")
        let current = fileSystem
        for (const part of dirParts) {
          if (current[part] && current[part].children) {
            current = current[part].children
          } else {
            return ["Directory not found."]
          }
        }
        if (!current) {
          return ["Directory not found."]
        }
        const filesAndDirs = Object.keys(current)
        return filesAndDirs.map((item) => {
          if (current[item].type === "directory") {
            return `<dir> ${item}`
          } else {
            return item
          }
        })
      }
      case "cd": {
        const targetDir = args[0]
        if (!targetDir) {
          setCurrentPath("C:\\Portfolio")
          return []
        }
        if (targetDir === "..") {
          const currentDir = currentPath.replace("C:\\", "")
          const dirParts = currentDir.split("\\")
          if (dirParts.length <= 1) {
            setCurrentPath("C:\\Portfolio")
          } else {
            dirParts.pop()
            setCurrentPath("C:\\" + dirParts.join("\\"))
          }
          return []
        }
        let newPath = currentPath
        if (targetDir.startsWith("C:\\")) {
          newPath = targetDir
        } else {
          newPath += "\\" + targetDir
        }
        newPath = newPath.replace(/\\+/g, "\\")
        const dirParts = newPath.replace("C:\\", "").split("\\")
        let current = fileSystem
        let pathValid = true
        for (const part of dirParts) {
          if (current[part] && current[part].children) {
            current = current[part].children
          } else if (current[part] && current[part].type === "directory") {
            current = current[part].children
          } else {
            pathValid = false
            break
          }
        }
        if (pathValid) {
          setCurrentPath(newPath)
          return []
        } else {
          return ["Directory not found."]
        }
      }
      case "cat": {
        const filename = args[0]
        if (!filename) {
          return ["Usage: cat <filename>"]
        }
        const currentDir = currentPath.replace("C:\\", "")
        const dirParts = currentDir.split("\\")
        let current = fileSystem
        for (const part of dirParts) {
          if (current[part] && current[part].children) {
            current = current[part].children
          } else {
            return ["File not found."]
          }
        }
        if (!current[filename] || current[filename].type !== "file") {
          return ["File not found."]
        }
        return current[filename].content
      }
      case "echo":
        return [args.join(" ")]
      case "ascii":
        if (args.length === 0) {
          return [
            "ASCII Art Generator",
            "===================",
            "",
            "Usage: ascii <text> [font]",
            "",
            "Available fonts:",
            "  standard - Classic ASCII font (default)",
            "  small    - Compact ASCII font",
            "  big      - Large, bold ASCII font",
            "",
            "Examples:",
            "  ascii HELLO",
            "  ascii CODE big",
            "  ascii 2025 small",
            "",
          ]
        }

        const text = args[0]
        const font = args[1] || "standard"
        const artLines = generateAsciiArt(text, font)

        return [`ASCII Art: "${text}" (${font} font)`, "", ...artLines, ""]
      default:
        return [`"${cmd}" is not recognized as an internal or external command.`]
    }
  }

  const handleEnter = () => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      if (input.trim() === "") {
        return
      }

      const timestamp = new Date().toLocaleTimeString()
      let output: string[] = []

      if (
        input.toLowerCase() === "help" ||
        input.toLowerCase() === "about" ||
        input.toLowerCase() === "skills" ||
        input.toLowerCase() === "contact" ||
        input.toLowerCase() === "projects" ||
        input.toLowerCase() === "theme" ||
        input.toLowerCase() === "clear" ||
        input.toLowerCase() === "neofetch" ||
        input.toLowerCase() === "resume" ||
        input.toLowerCase() === "ls" ||
        input.toLowerCase() === "cd" ||
        input.toLowerCase() === "cat" ||
        input.toLowerCase() === "echo" ||
        input.toLowerCase() === "ascii"
      ) {
        output = handleAdvancedCommand(input)
      } else {
        output = [`"${input}" is not recognized as an internal or external command.`]
      }

      setHistory((prevHistory) => [...prevHistory, { input, output, timestamp }])
      setCommandHistory((prevCommands) => [...prevCommands, input])
      setHistoryIndex(-1)
      setInput("")

      // Scroll to the bottom after adding new content
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    }, 50)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEnter()
    } else if (e.key === "ArrowUp") {
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex > -1) {
        const newIndex = Math.max(historyIndex - 1, -1)
        setHistoryIndex(newIndex)
        setInput(newIndex === -1 ? "" : commandHistory[commandHistory.length - 1 - newIndex])
      }
    }
  }

  return (
    <Window title="Abhishek Sharma's Portfolio" onClose={() => setActiveWindow(null)} className="w-4/5 h-3/4">
      <div className={`terminal ${isDarkTheme ? "dark-theme" : ""}`} ref={terminalRef}>
        {history.map((cmd, index) => (
          <div key={index} className="command">
            <div className="flex items-center">
              <span className="text-green-500">C:&gt;</span>
              <span className="font-mono ml-2">{cmd.input}</span>
            </div>
            <div className="output">
              {cmd.output.map((line, i) => (
                <div key={i} className="font-mono">
                  {line}
                </div>
              ))}
            </div>
            <div className="timestamp text-gray-500 text-xs">{cmd.timestamp}</div>
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-green-500">C:&gt;</span>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none ml-2 font-mono flex-grow text-white"
            ref={inputRef}
            placeholder="Type your command here..."
            disabled={isTyping}
          />
        </div>
      </div>
    </Window>
  )
}
