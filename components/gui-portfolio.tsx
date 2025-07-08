"use client"
import { useState, useEffect } from "react"
import { Sun, Moon, ArrowUpRight } from "lucide-react"

const data = {
  profile: {
    name: "Abhishek Sharma",
    title: "Computer Science Student & Developer",
    location: "Columbia, MO, USA",
    school: "Columbia College",
    graduation: "December 2025",
    role: "Computer Technician at Columbia College",
  },
  experience: [
    {
      title: "Computer Technician",
      company: "Columbia College",
      period: "Feb 2022 – Present",
      location: "Columbia, MO",
      highlights: [
        "Automated deployment scripts for system updates, reducing setup time by 40%",
        "Engineered solutions for faculty hardware needs, including bespoke workstation configurations",
      ],
    },
    {
      title: "Instructor",
      company: "idTech",
      period: "May 2023 – Dec 2023",
      location: "Campbell, CA",
      highlights: [
        "Led virtual coding boot camps focusing on Python, web development, and machine learning for 39 students",
        "Mentored students on backend development, CI/CD practices, and scalable architecture",
        "Developed RESTful APIs and integrated student projects",
      ],
    },
    {
      title: "Software Engineering Intern",
      company: "GR Manpower Pvt Ltd",
      period: "May 2022 – Aug 2022",
      location: "Kathmandu, Nepal",
      highlights: [
        "Developed backend application for user authentication, forms, and real-time client analytics using Flask and Firebase",
        "Refactored legacy databases into SQL to improve maintainability and reduce technical debt",
      ],
    },
  ],
  projects: [
    {
      title: "Self-Driving Car AI Simulation",
      tech: "JavaScript, Neural Networks, Genetic Algorithms",
      description:
        "Implemented a neural network from scratch that learns to navigate cars through traffic via genetic algorithms",
      highlights: [
        "Created collision detection system and sensor arrays using ray casting and polygon intersection algorithms",
        "Built real-time visualization of neural network decision-making process and training evolution",
      ],
      demo: true,
    },
    {
      title: "Neural Network from Scratch",
      tech: "C++, Eigen, MNIST Dataset",
      description:
        "Built a customizable neural network with backpropagation for MNIST digit classification achieving 94% accuracy",
      highlights: [
        "Implemented gradient descent optimization, regularization techniques, and solved numerical stability issues",
      ],
      github: true,
    },
    {
      title: "EarthQuake Watch Nepal",
      tech: "Flask, Python, JavaScript",
      description:
        "Developed a web app to enhance public safety and disaster preparedness by providing real-time earthquake alerts",
      highlights: ["Automated data updates and interactive monitoring map"],
      github: "https://github.com/abhishekshaarma/earthquakenepal",
    },
    {
      title: "Nogit – Lightweight Version Control System",
      tech: "Node.js, JavaScript, Filesystem",
      description:
        "Developed a Git-like version control system with file tracking, hashing, staging, commits, and logging",
      highlights: [
        "Implemented SHA-1 hashing for file integrity and structured commit storage",
        "Designed an asynchronous CLI tool using Node.js for efficient version tracking",
      ],
      github: true,
    },
    {
      title: "Customer Support RAG Agent",
      tech: "Python, LangFlow, AstraDB, Streamlit",
      description:
        "Built an AI-driven chatbot using LangFlow API and AstraDB to create scalable, real-time user support",
      github: "https://github.com/abhishekshaarma/ai-customersupport-rag",
    },
    {
      title: "Flappy Bird AI",
      tech: "Python, Pygame, NEAT",
      description: "Designed an AI-powered player using NEAT (NeuroEvolution Algorithm) for adaptive learning",
      highlights: ["Performed data analysis of AI performance"],
      github: "https://github.com/abhishekshaarma/flappy-bird-AI-NEAT",
    },
    {
      title: "Verlet Physics Simulation",
      tech: "C++, SFML, Physics Simulation",
      description: "Developed a real-time physics simulation using Verlet integration for stable motion updates",
      highlights: ["Optimized performance using spatial partitioning to reduce collision detection complexity"],
      github: true,
    },
  ],
  skills: {
    Languages: "C++, Python, JavaScript, Java, SQL, PHP, Golang (learning), RUST, ZIG",
    "Frameworks & Libraries": "React, Node.js, PyTorch, Pandas, Flask",
    "Developer Tools": "Git, Docker, Kubernetes, CI/CD (GitHub Actions, Jenkins)",
    "Cloud & Infrastructure": "AWS, GCP, Terraform, Linux",
  },
  contact: {
    email: "abhishekshaarma2@gmail.com",
    phone: "660-229-2197",
    linkedin: "https://linkedin.com/in/abseksharma",
    github: "https://github.com/abhishekshaarma",
  },
}

const navigation = ["about", "experience", "projects", "skills", "education", "contact"]

export function GuiPortfolio() {
  const [activeSection, setActiveSection] = useState("about")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const ExperienceItem = ({ exp }: { exp: (typeof data.experience)[0] }) => (
    <div>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{exp.title}</h3>
          <p className="text-blue-600 dark:text-blue-400">{exp.company}</p>
        </div>
        <div className="text-right text-sm text-gray-500 dark:text-gray-500">
          <p>{exp.period}</p>
          <p>{exp.location}</p>
        </div>
      </div>
      <ul className="text-gray-700 dark:text-gray-300 space-y-1 text-sm">
        {exp.highlights.map((highlight, i) => (
          <li key={i}>• {highlight}</li>
        ))}
      </ul>
    </div>
  )

  const ProjectItem = ({ project }: { project: (typeof data.projects)[0] }) => (
    <div>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{project.title}</h3>
        <div className="flex gap-2">
          {project.demo && (
            <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">
              Demo
            </span>
          )}
          {project.github && (
            <a
              href={typeof project.github === "string" ? project.github : "#"}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
      <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{project.tech}</p>
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{project.description}</p>
      {project.highlights && (
        <ul className="text-gray-600 dark:text-gray-400 text-xs space-y-1">
          {project.highlights.map((highlight, i) => (
            <li key={i}>• {highlight}</li>
          ))}
        </ul>
      )}
    </div>
  )

  const SkillCategory = ({ category, skills }: { category: string; skills: string }) => (
    <div>
      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{category}</h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm">{skills}</p>
    </div>
  )

  const sections = {
    about: (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-light text-gray-900 dark:text-white mb-2">{data.profile.name}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{data.profile.title}</p>
          <div className="text-sm text-gray-500 dark:text-gray-500 space-y-1">
            <p>📍 {data.profile.location}</p>
            <p>
              🎓 {data.profile.school} • Expected Graduation: {data.profile.graduation}
            </p>
            <p>💼 {data.profile.role}</p>
          </div>
        </div>
        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            I am a Computer Science major with hands-on experience in software development, system administration, and
            education. Currently working as a Computer Technician where I've automated deployment processes and
            engineered custom solutions for faculty needs.
          </p>
          <p>
            My experience spans from leading coding boot camps for 39 students at idTech to developing backend
            applications during my internship in Nepal. I'm passionate about creating efficient, scalable solutions and
            exploring cutting-edge technologies in AI, systems programming, and web development.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-8 text-center text-sm">
          <div>
            <p className="text-2xl font-light text-gray-900 dark:text-white">7+</p>
            <p className="text-gray-600 dark:text-gray-400">Projects</p>
          </div>
          <div>
            <p className="text-2xl font-light text-gray-900 dark:text-white">3</p>
            <p className="text-gray-600 dark:text-gray-400">Roles</p>
          </div>
          <div>
            <p className="text-2xl font-light text-gray-900 dark:text-white">39</p>
            <p className="text-gray-600 dark:text-gray-400">Students Mentored</p>
          </div>
        </div>
      </div>
    ),
    experience: (
      <div className="space-y-12">
        <h2 className="text-2xl font-light text-gray-900 dark:text-white">Experience</h2>
        <div className="space-y-8">
          {data.experience.map((exp, i) => (
            <ExperienceItem key={i} exp={exp} />
          ))}
        </div>
      </div>
    ),
    projects: (
      <div className="space-y-12">
        <h2 className="text-2xl font-light text-gray-900 dark:text-white">Projects</h2>
        <div className="space-y-8">
          {data.projects.map((project, i) => (
            <ProjectItem key={i} project={project} />
          ))}
        </div>
      </div>
    ),
    skills: (
      <div className="space-y-12">
        <h2 className="text-2xl font-light text-gray-900 dark:text-white">Technical Skills</h2>
        <div className="space-y-6">
          {Object.entries(data.skills).map(([category, skills]) => (
            <SkillCategory key={category} category={category} skills={skills} />
          ))}
        </div>
      </div>
    ),
    education: (
      <div className="space-y-12">
        <h2 className="text-2xl font-light text-gray-900 dark:text-white">Education</h2>
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Bachelor of Science in Computer Science
              </h3>
              <p className="text-blue-600 dark:text-blue-400">{data.profile.school}</p>
            </div>
            <div className="text-right text-sm text-gray-500 dark:text-gray-500">
              <p>Expected {data.profile.graduation}</p>
              <p>{data.profile.location}</p>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Relevant Coursework</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Data Structures, Advanced Programming, Algorithms Analysis, Database Management, Artificial Intelligence,
              Agile Software Development
            </p>
          </div>
        </div>
      </div>
    ),
    contact: (
      <div className="space-y-12">
        <h2 className="text-2xl font-light text-gray-900 dark:text-white">Contact</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Get in Touch</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="text-gray-500 dark:text-gray-500">Email:</span> {data.contact.email}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="text-gray-500 dark:text-gray-500">Phone:</span> {data.contact.phone}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="text-gray-500 dark:text-gray-500">Location:</span> {data.profile.location}
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Links</h3>
            <div className="space-y-2 text-sm">
              <p>
                <a
                  href={data.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  LinkedIn Profile ↗
                </a>
              </p>
              <p>
                <a
                  href={data.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  GitHub Profile ↗
                </a>
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Status</h3>
            <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <p>• Available for internships</p>
              <p>• Open to collaboration</p>
              <p>• Graduating {data.profile.graduation}</p>
            </div>
          </div>
        </div>
      </div>
    ),
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark bg-gray-900" : "bg-white"}`}>
      {/* Top Bar */}
      <div className="border-b border-gray-200 dark:border-gray-800 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded"></div>
            <span className="font-medium text-gray-900 dark:text-white">{data.profile.name}</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm text-gray-500 dark:text-gray-500 font-mono">
              {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-48 border-r border-gray-200 dark:border-gray-800 min-h-[calc(100vh-73px)]">
          <nav className="p-6 space-y-1">
            {navigation.map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item)}
                className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors capitalize ${
                  activeSection === item
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 max-w-4xl">{sections[activeSection as keyof typeof sections]}</div>
      </div>
    </div>
  )
}
