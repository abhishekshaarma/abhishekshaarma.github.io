"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Minimize2, Maximize2, TerminalIcon, Wifi, Battery, Volume2 } from "lucide-react"

interface Command {
  input: string
  output: string[]
  timestamp: string
  exitCode?: number
}

export function Terminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<Command[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [currentPath, setCurrentPath] = useState("~/portfolio")
  const [currentBranch, setCurrentBranch] = useState("main")
  const [isMaximized, setIsMaximized] = useState(true)
  const [userName] = useState("abhishek")
  const [hostName] = useState("netrunner")
  const [batteryLevel] = useState(87)
  const [isOnline] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const cyberArt = `
    ╔══════════════════════════════════════════════════╗
    ║                                                  ║
    ║    ██████╗  ██████╗ ██████╗ ████████╗███████╗    ║
    ║    ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝    ║
    ║    ██████╔╝██║   ██║██████╔╝   ██║   █████╗      ║
    ║    ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝      ║
    ║    ██║     ╚██████╔╝██║  ██║   ██║   ██║         ║
    ║    ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝         ║
    ║                                                  ║
    ║              NEURAL INTERFACE v2.1               ║
    ║                                                  ║
    ╚══════════════════════════════════════════════════╝
  `

  const getPromptInfo = () => {
    const time = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    const gitStatus = currentBranch ? ` on ${currentBranch}` : ""
    const pathDisplay = currentPath.replace(/^.*\//, "")

    return {
      time,
      user: userName,
      host: hostName,
      path: pathDisplay,
      fullPath: currentPath,
      git: gitStatus,
      battery: batteryLevel,
      online: isOnline,
    }
  }

  // Cyberpunk command system
  const commands = {
    help: [
      "┌─────────────────────────────────────────────────┐",
      "│                 SYSTEM COMMANDS                 │",
      "└─────────────────────────────────────────────────┘",
      "",
      "▸ DATA ACCESS:",
      "  about, skills, projects, contact, resume",
      "  experience, education",
      "",
      "▸ SYSTEM UTILS:",
      "  ls, cat, pwd, whoami, ps, top, df",
      "  clear, history, env, which, man",
      "",
      "▸ DEV TOOLS:",
      "  git, npm, node, python, code, vim",
      "  docker, kubectl",
      "",
      "▸ INTERFACE:",
      "  neofetch, fortune, weather",
      "",
      "▸ NAVIGATION:",
      "  • TAB for completion",
      "  • ↑/↓ for history",
      "",
      "─────────────────────────────────────────────────",
      "",
    ],

    about: [
      "┌─────────────────────────────────────────────────┐",
      "│                 USER PROFILE                    │",
      "└─────────────────────────────────────────────────┘",
      "",
      "▸ NAME: Abhishek Sharma",
      "▸ ROLE: Computer Science Student & Developer",
      "▸ LOCATION: Columbia College, Missouri",
      "▸ GRADUATION: December 2025",
      "",
      "▸ CURRENT POSITION:",
      "  Computer Technician @ Columbia College",
      "  • Automated deployment scripts",
      "  • Custom hardware solutions",
      "  • System optimization",
      "",
      "▸ SPECIALIZATIONS:",
      "  • Neural Networks & AI/ML",
      "  • Systems Programming (C++, Rust)",
      "  • Full-stack Web Development",
      "  • Cloud Infrastructure & DevOps",
      "",
      "▸ ACHIEVEMENTS:",
      "  • Led coding bootcamps (39 students)",
      "  • 60% collision detection optimization",
      "  • Built neural networks from scratch",
      "",
      "─────────────────────────────────────────────────",
      "",
    ],

    skills: [
      "┌─────────────────────────────────────────────────┐",
      "│                TECHNICAL STACK                  │",
      "└─────────────────────────────────────────────────┘",
      "",
      "▸ LANGUAGES:",
      "  C++        ████████████████████░ 95%",
      "  Python     ███████████████████░░ 90%",
      "  JavaScript ██████████████████░░░ 85%",
      "  Java       ███████████████░░░░░░ 75%",
      "  Rust       ██████████░░░░░░░░░░░ 50%",
      "  Go         ████████░░░░░░░░░░░░░ 40%",
      "",
      "▸ FRONTEND:",
      "  React      ███████████████████░░ 90%",
      "  TypeScript ██████████████████░░░ 80%",
      "  Next.js    ████████████████░░░░░ 70%",
      "",
      "▸ BACKEND & INFRA:",
      "  Node.js    ██████████████████░░░ 85%",
      "  Docker     ███████████████░░░░░░ 75%",
      "  AWS        ████████████░░░░░░░░░ 60%",
      "  Git        ████████████████████░ 95%",
      "",
      "▸ AI/ML:",
      "  PyTorch    ██████████████░░░░░░░ 70%",
      "  TensorFlow ████████████░░░░░░░░░ 60%",
      "",
      "─────────────────────────────────────────────────",
      "",
    ],

    projects: [
      "┌─────────────────────────────────────────────────┐",
      "│                PROJECT ARCHIVE                  │",
      "└─────────────────────────────────────────────────┘",
      "",
      "▸ AUTONOMOUS VEHICLE AI",
      "  ├─ Neural networks from scratch",
      "  ├─ Genetic algorithm optimization",
      "  └─ Real-time collision detection",
      "",
      "▸ NEURAL NETWORK ENGINE (C++)",
      "  ├─ MNIST classification (94% accuracy)",
      "  ├─ Custom backpropagation",
      "  └─ Gradient descent optimization",
      "",
      "▸ EARTHQUAKE MONITORING SYSTEM",
      "  ├─ Real-time seismic data processing",
      "  ├─ Flask backend architecture",
      "  └─ Emergency response integration",
      "",
      "▸ VERSION CONTROL SYSTEM (Nogit)",
      "  ├─ Git-like functionality in Node.js",
      "  ├─ SHA-1 file integrity hashing",
      "  └─ Asynchronous CLI implementation",
      "",
      "▸ RAG SUPPORT AGENT",
      "  ├─ LangFlow API integration",
      "  ├─ AstraDB vector database",
      "  └─ Scalable real-time responses",
      "",
      "▸ FLAPPY BIRD AI (NEAT)",
      "  ├─ NeuroEvolution algorithm",
      "  ├─ Performance analytics",
      "  └─ Adaptive learning behavior",
      "",
      "─────────────────────────────────────────────────",
      "",
    ],

    contact: [
      "┌─────────────────────────────────────────────────┐",
      "│               CONTACT INTERFACE                 │",
      "└─────────────────────────────────────────────────┘",
      "",
      "▸ EMAIL: abhishekshaarma2@gmail.com",
      "▸ PHONE: 660-229-2197",
      "▸ LINKEDIN: linkedin.com/in/abseksharma",
      "▸ GITHUB: github.com/abhishekshaarma",
      "▸ INSTITUTION: Columbia College",
      "▸ LOCATION: Missouri, USA",
      "",
      "▸ AVAILABILITY:",
      "  • Internship opportunities",
      "  • Full-time positions",
      "  • Technical collaborations",
      "  • Open source contributions",
      "",
      "▸ STATUS:",
      "  • Graduation: December 2025",
      "  • Major: Computer Science",
      "  • Response time: < 24 hours",
      "",
      "─────────────────────────────────────────────────",
      "",
    ],

    resume: [
      "┌─────────────────────────────────────────────────┐",
      "│                RESUME ACCESS                    │",
      "└─────────────────────────────────────────────────┘",
      "",
      "▸ RESUME FORMATS AVAILABLE:",
      "",
      "  • Terminal view (current interface)",
      "  • GUI view (click 'Resume' button above)",
      "  • PDF download (contact for file)",
      "",
      "▸ QUICK ACCESS:",
      "  about     - Personal information",
      "  skills    - Technical abilities",
      "  projects  - Portfolio showcase",
      "  contact   - Get in touch",
      "",
      "▸ TRADITIONAL FORMAT:",
      "  The 'Resume' button in the top right provides",
      "  a clean, formatted view suitable for printing",
      "  and traditional review processes.",
      "",
      "─────────────────────────────────────────────────",
      "",
    ],

    experience: [
      "┌─────────────────────────────────────────────────┐",
      "│              WORK EXPERIENCE                    │",
      "└─────────────────────────────────────────────────┘",
      "",
      "▸ COMPUTER TECHNICIAN",
      "  Columbia College | Feb 2022 – Present",
      "  • Automated deployment scripts (40% time reduction)",
      "  • Engineered custom workstation configurations",
      "  • Provided technical support and maintenance",
      "",
      "▸ INSTRUCTOR",
      "  idTech | May 2023 – Dec 2023",
      "  • Led virtual coding bootcamps (39 students)",
      "  • Taught Python, web dev, and machine learning",
      "  • Mentored on backend development and CI/CD",
      "",
      "▸ SOFTWARE ENGINEERING INTERN",
      "  GR Manpower Pvt Ltd | May 2022 – Aug 2022",
      "  • Developed Flask backend with Firebase",
      "  • Refactored legacy databases to SQL",
      "  • Built user authentication and analytics",
      "",
      "─────────────────────────────────────────────────",
      "",
    ],

    education: [
      "┌─────────────────────────────────────────────────┐",
      "│                 EDUCATION                       │",
      "└─────────────────────────────────────────────────┘",
      "",
      "▸ BACHELOR OF SCIENCE - COMPUTER SCIENCE",
      "  Columbia College, Missouri",
      "  Expected Graduation: December 2025",
      "",
      "▸ RELEVANT COURSEWORK:",
      "  • Data Structures & Algorithms",
      "  • Advanced Programming Concepts",
      "  • Database Management Systems",
      "  • Artificial Intelligence",
      "  • Agile Software Development",
      "  • Systems Programming",
      "",
      "▸ ACADEMIC PROJECTS:",
      "  • Neural network implementations",
      "  • Database optimization projects",
      "  • Web application development",
      "  • Algorithm analysis and design",
      "",
      "─────────────────────────────────────────────────",
      "",
    ],

    git: [
      "git version 2.39.1",
      "",
      "On branch main",
      "Your branch is up to date with 'origin/main'.",
      "",
      "Changes not staged for commit:",
      '  (use "git add <file>..." to update what will be committed)',
      "",
      "        modified:   portfolio/neural-network.cpp",
      "        modified:   projects/ai-simulation.js",
      "        new file:   interface.config",
      "",
      "Untracked files:",
      '  (use "git add <file>..." to include in what will be committed)',
      "",
      "        system-upgrade.patch",
      "        neural-interface.md",
      "",
      'no changes added to commit (use "git add" or "git commit -a")',
      "",
    ],

    neofetch: [
      "                    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄",
      "                   ██                            ██",
      "                   ██  " + userName + "@" + hostName + "                ██",
      "                   ██                            ██",
      "                   ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀",
      "",
      "▸ OS: Neural Linux 6.6.6",
      "▸ Host: Cyberdeck Pro 2025",
      "▸ Kernel: Linux 6.6.6-cyber",
      "▸ Uptime: 25 days, 13:37",
      "▸ Packages: 1337 (apt)",
      "▸ Shell: zsh 5.9",
      "▸ Resolution: 3840x2160",
      "▸ DE: Plasma 6.0",
      "▸ WM: KWin",
      "▸ Terminal: Konsole",
      "▸ CPU: AMD Ryzen 9 7950X",
      "▸ GPU: RTX 4090",
      "▸ Memory: " + Math.floor(Math.random() * 8 + 16) + "GB / 32GB",
      "▸ Disk: 2TB NVMe SSD",
      "",
      "████████████████████████████████████████████████",
      "",
    ],

    fortune: [
      "┌─────────────────────────────────────────────────┐",
      "│                   FORTUNE                       │",
      "└─────────────────────────────────────────────────┘",
      "",
      '"The future belongs to those who code it."',
      "",
      "▸ Lucky hex: 0xDEADBEEF",
      "▸ Lucky binary: 11010001",
      "▸ Lucky algorithm: Neural networks",
      "",
      "▸ Avoid: Legacy code on Fridays",
      "▸ Embrace: The digital future",
      "",
      "─────────────────────────────────────────────────",
      "",
    ],

    weather: [
      "┌─────────────────────────────────────────────────┐",
      "│                WEATHER DATA                     │",
      "└─────────────────────────────────────────────────┘",
      "",
      "▸ LOCATION: Columbia, MO",
      "▸ TEMPERATURE: 72°F (22°C)",
      "▸ CONDITIONS: Partly cloudy",
      "▸ WIND: 8 mph SW",
      "▸ HUMIDITY: 65%",
      "",
      "▸ SUNRISE: 07:15",
      "▸ SUNSET: 17:45",
      "",
      "▸ SYSTEM STATUS: Optimal",
      "▸ PERFORMANCE: Maximum",
      "",
      "─────────────────────────────────────────────────",
      "",
    ],
  }

  // Enhanced command handler
  const handleAdvancedCommand = (cmd: string, args: string[]) => {
    const command = cmd.toLowerCase()

    switch (command) {
      case "ls":
        if (args.includes("-la") || args.includes("-l")) {
          return [
            "total 2077",
            "drwxr-xr-x  8 " + userName + " users   256 Jan  8 15:30 .",
            "drwxr-xr-x  3 " + userName + " users    96 Jan  8 15:30 ..",
            "-rw-r--r--  1 " + userName + " users   220 Jan  8 15:30 .zshrc",
            "-rw-r--r--  1 " + userName + " users   807 Jan  8 15:30 .gitconfig",
            "-rw-r--r--  1 " + userName + " users  1024 Jan  8 15:30 neural-net.cpp",
            "-rw-r--r--  1 " + userName + " users  2048 Jan  8 15:30 projects.json",
            "-rw-r--r--  1 " + userName + " users   512 Jan  8 15:30 contact.yaml",
            "-rw-r--r--  1 " + userName + " users  1536 Jan  8 15:30 resume.pdf",
            "drwxr-xr-x  4 " + userName + " users   128 Jan  8 15:30 node_modules",
            "-rw-r--r--  1 " + userName + " users   420 Jan  8 15:30 system.log",
            "",
          ]
        }
        return [
          "neural-net.cpp  contact.yaml   node_modules   resume.pdf",
          "system.log      projects.json  .gitconfig     .zshrc",
          "",
        ]

      case "cat":
        const filename = args[0]
        if (!filename) return ["cat: missing file operand", "Try 'cat --help' for more information.", ""]

        if (filename === "system.log") {
          return [
            "┌─────────────────────────────────────────────────┐",
            "│                 SYSTEM LOG                      │",
            "└─────────────────────────────────────────────────┘",
            "",
            "2025-01-08 09:00 - Neural network training initiated",
            "2025-01-08 11:30 - AI model optimization complete",
            "2025-01-08 14:15 - Algorithm deployment successful",
            "2025-01-08 16:45 - Security protocols updated",
            "2025-01-08 19:20 - Interface connection established",
            "",
            "▸ SYSTEM STATUS: All systems operational",
            "▸ THREAT LEVEL: Minimal",
            "▸ PERFORMANCE: Maximum efficiency",
            "",
          ]
        }

        return [`cat: ${filename}: No such file or directory`, ""]

      case "echo":
        return args.length > 0 ? [args.join(" "), ""] : ["", ""]

      case "pwd":
        return [currentPath, ""]

      case "whoami":
        return [userName, ""]

      case "history":
        return [
          "┌─────────────────────────────────────────────────┐",
          "│                COMMAND HISTORY                  │",
          "└─────────────────────────────────────────────────┘",
          "",
          ...commandHistory.map((cmd, i) => `${String(i + 1).padStart(4)}: ${cmd}`),
          "",
        ]

      default:
        return null
    }
  }

  // Main command handler
  const handleCommand = useCallback(
    (cmd: string) => {
      const trimmedCmd = cmd.trim()
      const [command, ...args] = trimmedCmd.split(" ")
      const timestamp = new Date().toLocaleTimeString()

      if (trimmedCmd && !commandHistory.includes(trimmedCmd)) {
        setCommandHistory((prev) => [...prev, trimmedCmd])
      }
      setHistoryIndex(-1)

      let output: string[] = []
      let exitCode = 0

      if (trimmedCmd === "clear") {
        setHistory([])
        return
      }

      // Try advanced commands first
      const advancedResult = handleAdvancedCommand(command, args)
      if (advancedResult) {
        output = advancedResult
      } else if (commands[command.toLowerCase() as keyof typeof commands]) {
        output = commands[command.toLowerCase() as keyof typeof commands]
      } else if (trimmedCmd === "") {
        output = [""]
      } else {
        output = [`zsh: command not found: ${command}`, "▸ Type 'help' to see available commands", ""]
        exitCode = 127
      }

      const newCommand: Command = {
        input: cmd,
        output,
        timestamp,
        exitCode,
      }

      setHistory((prev) => [...prev, newCommand])
    },
    [commandHistory],
  )

  // Tab completion
  const handleTabCompletion = () => {
    const availableCommands = [...Object.keys(commands), "ls", "cat", "pwd", "whoami", "history", "echo"]

    const matches = availableCommands.filter((cmd) => cmd.toLowerCase().startsWith(input.toLowerCase()))

    if (matches.length === 1) {
      setInput(matches[0])
    } else if (matches.length > 1) {
      const output = [
        "",
        ...(matches
          .map((match) => `  ${match}`)
          .join("    ")
          .match(/.{1,60}/g) || []),
        "",
      ]
      const newCommand: Command = {
        input: input + " [TAB]",
        output,
        timestamp: new Date().toLocaleTimeString(),
      }
      setHistory((prev) => [...prev, newCommand])
    }
  }

  // Keyboard handling
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setInput("")
        } else {
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      handleTabCompletion()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      handleCommand(input)
      setInput("")
    }
  }

  // Initialize with welcome message
  useEffect(() => {
    const welcomeCommand: Command = {
      input: "welcome",
      output: [
        cyberArt,
        "",
        "▸ NEURAL INTERFACE ACTIVE",
        "▸ SYSTEM STATUS: ONLINE",
        "▸ CONNECTION: ESTABLISHED",
        "",
        "▸ FEATURES:",
        "  • Command completion with TAB",
        "  • History navigation with ↑/↓",
        "  • Git integration and monitoring",
        "  • Real-time system diagnostics",
        "",
        "▸ Type 'help' to access command list",
        "▸ Try 'about', 'skills', or 'projects'",
        "",
        `▸ Last sync: ${new Date().toLocaleDateString()}`,
        "",
      ],
      timestamp: new Date().toLocaleTimeString(),
    }
    setHistory([welcomeCommand])
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const promptInfo = getPromptInfo()

  return (
    <div className="bg-gray-900 border-2 border-yellow-400 rounded-lg shadow-2xl overflow-hidden backdrop-blur-sm bg-opacity-95 shadow-yellow-400/20">
      {/* Cyberpunk Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 flex items-center justify-between border-b-2 border-yellow-400">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
          </div>
          <TerminalIcon size={16} className="text-yellow-400" />
          <span className="text-yellow-400 text-sm font-mono font-bold">
            {promptInfo.user}@{promptInfo.host}
          </span>
        </div>
        <div className="flex items-center space-x-4 text-yellow-400 text-xs font-mono">
          <div className="flex items-center space-x-1">
            {promptInfo.online ? <Wifi size={12} className="text-cyan-400" /> : <span>⚠</span>}
            <span className="text-cyan-400">ONLINE</span>
          </div>
          <div className="flex items-center space-x-1">
            <Battery size={12} className="text-green-400" />
            <span className="text-green-400">{promptInfo.battery}%</span>
          </div>
          <div className="flex items-center space-x-1">
            <Volume2 size={12} className="text-magenta-400" />
            <span className="text-magenta-400">{promptInfo.time}</span>
          </div>
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="text-yellow-400 hover:text-white transition-colors p-1 rounded hover:bg-gray-700"
          >
            {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className={`${isMaximized ? "h-[600px]" : "h-96"} overflow-y-auto bg-gray-900 text-yellow-400 font-mono text-sm p-4 scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-800`}
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((command, index) => (
          <div key={index} className="mb-3">
            {command.input !== "welcome" && (
              <div className="flex items-center mb-2 flex-wrap">
                {/* Time */}
                <span className="text-gray-500 text-xs mr-2">[{command.timestamp}]</span>

                {/* User@host */}
                <span className="text-cyan-400 font-bold">{promptInfo.user}</span>
                <span className="text-yellow-400 mx-1">@</span>
                <span className="text-magenta-400 font-bold">{promptInfo.host}</span>

                {/* Path */}
                <span className="text-gray-400 mx-2">in</span>
                <span className="text-green-400 font-bold">{promptInfo.fullPath}</span>

                {/* Git branch */}
                {promptInfo.git && <span className="text-purple-400 ml-2">{promptInfo.git}</span>}

                {/* Prompt symbol */}
                <span className="text-yellow-400 ml-2 mr-1">▸</span>
                <span className="text-white">{command.input}</span>

                {/* Exit code indicator */}
                {command.exitCode !== undefined && command.exitCode !== 0 && (
                  <span className="text-red-400 ml-2 text-xs">[{command.exitCode}]</span>
                )}
              </div>
            )}
            <div className="whitespace-pre-wrap text-gray-200 leading-relaxed">
              {command.output.map((line, lineIndex) => (
                <div key={lineIndex} className="hover:bg-gray-800 hover:bg-opacity-50 px-1 rounded transition-colors">
                  {line}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Current Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center flex-wrap">
          {/* Time */}
          <span className="text-gray-500 text-xs mr-2">[{promptInfo.time}]</span>

          {/* User@host */}
          <span className="text-cyan-400 font-bold">{promptInfo.user}</span>
          <span className="text-yellow-400 mx-1">@</span>
          <span className="text-magenta-400 font-bold">{promptInfo.host}</span>

          {/* Path */}
          <span className="text-gray-400 mx-2">in</span>
          <span className="text-green-400 font-bold">{promptInfo.path}</span>

          {/* Git branch */}
          {promptInfo.git && <span className="text-purple-400 ml-2">{promptInfo.git}</span>}

          {/* Prompt symbol */}
          <span className="text-yellow-400 ml-2 mr-1">▸</span>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white font-mono caret-yellow-400 min-w-0"
            autoFocus
            spellCheck={false}
            placeholder=""
          />
          <span className="text-yellow-400 animate-pulse ml-1">▊</span>
        </form>
      </div>

      {/* Cyberpunk Status Bar */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2 border-t-2 border-yellow-400 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-4 text-gray-300">
          <span className="text-cyan-400">CMD: {commandHistory.length}</span>
          <span className="text-green-400">SHELL: zsh</span>
          <span className="text-magenta-400">{promptInfo.fullPath}</span>
          <span className="text-purple-400">{promptInfo.git}</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-300">
          <span className="text-yellow-400">NEURAL</span>
          <span className="text-green-400">{promptInfo.battery}%</span>
          <span className="text-cyan-400">{promptInfo.time}</span>
        </div>
      </div>
    </div>
  )
}
