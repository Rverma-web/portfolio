import { useState, useEffect, useRef } from 'react';
import React from 'react'

export default function RakshitTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [currentDirectory, setCurrentDirectory] = useState('~');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const [showCommandHelp, setShowCommandHelp] = useState(false);
  const [commandCount, setCommandCount] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // Portfolio data
  const portfolioData = {
    about: {
      name: "Rakshit Verma",  
      title: "AI-Powered Full Stack Developer",
      summary: "I'm a passionate developer with experience in React, Node.js, and Python. I love building intuitive and responsive web applications that solve real-world problems.",
    },
    skills: [
      { category: "Frontend", items: ["React", "TypeScript", "HTML/CSS", "Tailwind CSS"] },
      { category: "Backend", items: ["Node.js", "Express", "Python/Django", "SQL/NoSQL"] },
      { category: "DevOps", items: ["Docker", "AWS", "CI/CD", "Linux/Bash"] }
    ],
    projects: [
      {
        name: "E-commerce Platform",
        description: "A full-stack e-commerce solution with product management, cart functionality, and payment processing.",
        tech: "React, Node.js, MongoDB, Stripe",
        link: "https://github.com/username/ecommerce"
      },
      {
        name: "Task Management App",
        description: "A Kanban-style task management application with real-time updates and team collaboration features.",
        tech: "React, Firebase, Material UI",
        link: "https://github.com/username/task-app"
      },
      {
        name: "Data Visualization Dashboard",
        description: "Interactive dashboard for visualizing complex datasets with filtering and export capabilities.",
        tech: "React, D3.js, Express, PostgreSQL",
        link: "https://github.com/username/data-viz"
      }
    ],
    experience: [
      {
        role: "Senior Frontend Developer",
        company: "Tech Solutions Inc.",
        period: "2021 - Present",
        description: "Lead development of customer-facing web applications, improving performance and implementing new features."
      },
      {
        role: "Full Stack Developer",
        company: "Digital Innovations",
        period: "2018 - 2021",
        description: "Developed and maintained multiple web applications using React and Node.js."
      },
      {
        role: "Junior Developer",
        company: "StartUp Labs",
        period: "2016 - 2018",
        description: "Assisted in the development of web applications and learned modern development practices."
      }
    ],
    contact: {
      email: "john.doe@example.com",
      github: "github.com/johndoe",
      linkedin: "linkedin.com/in/johndoe",
      twitter: "@johndoe"
    }
  };

  // File system structure
  const fileSystem = {
    '~': {
      type: 'directory',
      children: {
        'about.txt': {
          type: 'file',
          content: `Name: ${portfolioData.about.name}\nTitle: ${portfolioData.about.title}\n\n${portfolioData.about.summary}`
        },
        'contact.txt': {
          type: 'file',
          content: `Email: ${portfolioData.contact.email}\nGitHub: ${portfolioData.contact.github}\nLinkedIn: ${portfolioData.contact.linkedin}\nTwitter: ${portfolioData.contact.twitter}`
        },
        'projects': {
          type: 'directory',
          children: {}
        },
        'skills': {
          type: 'directory',
          children: {}
        },
        'experience': {
          type: 'directory',
          children: {}
        }
      }
    }
  };

  // Populate projects directory
  portfolioData.projects.forEach((project, index) => {
    fileSystem['~'].children.projects.children[`project${index + 1}.txt`] = {
      type: 'file',
      content: `Project: ${project.name}\n\nDescription: ${project.description}\n\nTech Stack: ${project.tech}\n\nLink: ${project.link}`
    };
  });

  // Populate skills directory
  portfolioData.skills.forEach((skillCategory, index) => {
    fileSystem['~'].children.skills.children[`${skillCategory.category.toLowerCase()}.txt`] = {
      type: 'file',
      content: `${skillCategory.category} Skills:\n\n${skillCategory.items.join('\n')}`
    };
  });

  // Populate experience directory
  portfolioData.experience.forEach((job, index) => {
    fileSystem['~'].children.experience.children[`${job.company.replace(/\s+/g, '-').toLowerCase()}.txt`] = {
      type: 'file',
      content: `Role: ${job.role}\nCompany: ${job.company}\nPeriod: ${job.period}\n\n${job.description}`
    };
  });

  // Helper to get current directory object
  const getCurrentDirectoryObject = () => {
    const pathParts = currentDirectory.split('/').filter(Boolean);
    let current = fileSystem['~'];
    
    if (currentDirectory === '~') {
      return current;
    }
    
    for (const part of pathParts) {
      if (part !== '~' && current.children && current.children[part]) {
        current = current.children[part];
      } else {
        return null;
      }
    }
    
    return current;
  };

  // Neofetch style summary component
  const SystemInfo = () => {
    const infoLines = [
      `OS: Rakshit Verma`,
      `Host: Personal Portfolio`,
      `Kernel: React ${React.version}`,
      `Uptime: Always available for new tech`,
      `Shell: Portfolio Bash`,
      `CPU: Full Stack Development + AI/ML`,
      `Memory: 3rd Year Student at IIIT Dharwad`,
    ];
    
    return (
      <div className="flex flex-col md:flex-row">
        <div className="text-green-500 mr-8 mb-4 md:mb-0">
          <pre className="text-base md:text-lg font-bold leading-tight">
            {`
   _____       _        _     _ _   
  |  __ \\     | |      | |   (_) |  
  | |__) |__ _| | _____| |__  _| |_ 
  |  _  // _\` | |/ / __| '_ \\| | __|
  | | \\ \\ (_| |   <\\__ \\ | | | | |_ 
  |_|  \\_\\__,_|_|\\_\\___/_| |_|_|\\__|
                                    
            `}
          </pre>
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-white text-xl mb-2">{portfolioData.about.name} <span className="text-green-400">@</span> <span className="text-green-300">{portfolioData.about.title}</span></div>
          <div className="border-b border-green-500 mb-2"></div>
          {infoLines.map((line, index) => {
            const [category, value] = line.split(': ');
            return (
              <div key={index} className="text-sm">
                <span className="text-green-400 font-bold">{category}:</span> <span className="text-white">{value}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Commands
  const commands = {
    help: () => {
      return [
        'Available commands:',
        '  help            - Show this help message',
        '  about           - Display information about me',
        '  skills          - List my technical skills',
        '  projects        - Show my portfolio projects',
        '  experience      - Display my work experience',
        '  contact         - Show my contact information',
        '  clear           - Clear the terminal screen',
        '',
        'File system commands:',
        '  ls              - List directory contents',
        '  cd <directory>  - Change directory',
        '  cat <file>      - Display file contents',
        '  pwd             - Print working directory'
      ].join('\n');
    },
    
    about: () => {
      const about = portfolioData.about;
      return `Name: ${about.name}\nTitle: ${about.title}\n\n${about.summary}`;
    },
    
    skills: () => {
      return portfolioData.skills.map(category => 
        `${category.category}:\n${category.items.map(item => `  - ${item}`).join('\n')}`
      ).join('\n\n');
    },
    
    projects: () => {
      return portfolioData.projects.map(project => 
        `${project.name}\n${'-'.repeat(project.name.length)}\n` +
        `Description: ${project.description}\n` +
        `Tech: ${project.tech}\n` +
        `Link: ${project.link}\n`
      ).join('\n');
    },
    
    experience: () => {
      return portfolioData.experience.map(job => 
        `${job.role} at ${job.company} (${job.period})\n` +
        `${'-'.repeat(job.role.length + job.company.length + job.period.length + 7)}\n` +
        `${job.description}\n`
      ).join('\n');
    },
    
    contact: () => {
      const contact = portfolioData.contact;
      return `Email: ${contact.email}\nGitHub: ${contact.github}\nLinkedIn: ${contact.linkedin}\nTwitter: ${contact.twitter}`;
    },
    
    clear: () => {
      setHistory([]);
      return null;
    },
    
    ls: (args) => {
      const dir = getCurrentDirectoryObject();
      if (!dir || dir.type !== 'directory') {
        return 'Not a directory';
      }
      
      const contents = Object.entries(dir.children).map(([name, item]) => {
        if (item.type === 'directory') {
          return `\x1b[1;34m${name}/\x1b[0m`; // Blue for directories
        } else {
          return name;
        }
      });
      
      return contents.join('  ');
    },
    
    cd: (args) => {
      if (!args || args === '~') {
        setCurrentDirectory('~');
        return '';
      }
      
      if (args === '..') {
        if (currentDirectory === '~') {
          return '';
        }
        const parts = currentDirectory.split('/').filter(Boolean);
        parts.pop();
        setCurrentDirectory(parts.length ? parts.join('/') : '~');
        return '';
      }
      
      const dir = getCurrentDirectoryObject();
      if (!dir || dir.type !== 'directory') {
        return `cd: not a directory: ${currentDirectory}`;
      }
      
      if (dir.children[args] && dir.children[args].type === 'directory') {
        setCurrentDirectory(currentDirectory === '~' ? 
          `~/${args}` : `${currentDirectory}/${args}`);
        return '';
      } else {
        return `cd: no such directory: ${args}`;
      }
    },
    
    cat: (args) => {
      if (!args) {
        return 'Usage: cat <filename>';
      }
      
      const dir = getCurrentDirectoryObject();
      if (!dir) {
        return `cat: no such file or directory: ${args}`;
      }
      
      if (dir.children[args]) {
        if (dir.children[args].type === 'file') {
          return dir.children[args].content;
        } else {
          return `cat: ${args}: Is a directory`;
        }
      } else {
        return `cat: ${args}: No such file or directory`;
      }
    },
    
    pwd: () => {
      return currentDirectory.replace('~', '/home/rakshit');
    }
  };

  // Process command input
  const processCommand = (input) => {
    const [command, ...args] = input.trim().split(' ');
    
    if (command === '') {
      return '';
    }
    
    if (command === 'shutdown' || command === 'exit' || command === 'quit') {
      return "Cannot shut down terminal. This is a web application.\nType 'clear' to clear the screen or 'help' to see available commands.";
    }
    
    if (commands[command]) {
      return commands[command](args.join(' '));
    } else {
      return `Command not found: ${command}. Type 'help' to see available commands.`;
    }
  };

  // Handle command submission
  const handleSubmit = () => {
    // Increment command count
    const newCommandCount = commandCount + 1;
    setCommandCount(newCommandCount);
    
    // If this is the first command, keep the welcome screen and add command
    if (newCommandCount === 1) {
      setHistory(prev => [
        ...prev,
        { type: 'command', text: `${currentDirectory} $ ${input}` }
      ]);
    } else {
      // For second command and beyond, clear screen and show just the new command and output
      setShowWelcome(false);
      setHistory([{ type: 'command', text: `${currentDirectory} $ ${input}` }]);
    }
    
    // Process command and add output to history
    const output = processCommand(input);
    if (output !== null) {
      setTimeout(() => {
        setHistory(prev => [...prev, { type: 'output', text: output }]);
      }, 100);
    }

    // Update command history for up/down navigation
    setCommandHistory(prev => [...prev, input]);
    setHistoryIndex(-1);
    
    // Clear input
    setInput('');
  };

  // Handle key press events for command history navigation and submission
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim()) {
        handleSubmit();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Initialize welcome screen on first render
  useEffect(() => {
    // Set initial welcome message with system info
    setHistory([{ type: 'systemInfo', component: <SystemInfo /> },
                { type: 'output', text: 'Welcome to my portfolio!' },
                { type: 'output', text: 'Type "help" to see available commands.' }]);
  }, []);

  // Auto-focus the input field and scroll to bottom on render
  useEffect(() => {
    if (!isMobile) {
      inputRef.current?.focus();
    }
    
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, isMobile]);

  // Handle window clicks to focus on input
  useEffect(() => {
    const handleWindowClick = () => {
      if (!isMobile) {
        inputRef.current?.focus();
      }
    };
    
    window.addEventListener('click', handleWindowClick);
    
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [isMobile]);

  // Quick command buttons
  const QuickCommands = () => (
    <div className="flex flex-wrap gap-2 my-2">
      {['help', 'about', 'skills', 'projects', 'contact'].map(cmd => (
        <button
          key={cmd}
          onClick={() => {
            setInput(cmd);
            setTimeout(() => {
              handleSubmit();
            }, 100);
          }}
          className="bg-green-800 text-green-100 px-3 py-1 rounded-md text-sm hover:bg-green-700 transition-colors"
        >
          {cmd}
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-green-500 font-mono">
      {/* Terminal header */}
      <div className="bg-gray-800 p-2 flex items-center">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-center flex-grow text-white font-bold truncate">
          rakshit@terminal: ~
        </div>
        <button 
          className="text-gray-400 hover:text-white focus:outline-none"
          onClick={() => setShowCommandHelp(!showCommandHelp)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Help panel */}
      {showCommandHelp && (
        <div className="bg-gray-900 p-3 border-b border-green-800">
          <h3 className="text-green-400 font-bold mb-2">Quick Commands</h3>
          <QuickCommands />
          <p className="text-xs text-gray-400 mt-2">
            Click a button above or type a command below. Try 'help' to see all available commands.
          </p>
        </div>
      )}
      
      {/* Terminal body */}
      <div 
        ref={terminalRef}
        className="flex-grow p-4 overflow-auto bg-black bg-opacity-70"
      >
        {/* Show welcome screen with system info on first load */}
  
        
        {/* Command history */}
        {history.map((item, index) => (
          <div key={index} className={`mb-1 ${item.type === 'command' ? 'text-white' : item.type === 'systemInfo' ? '' : 'text-green-400'}`}>
            {item.type === 'systemInfo' ? (
              item.component
            ) : (
              item.text.split('\n').map((line, lineIndex) => (
                <div key={lineIndex} className="whitespace-pre-wrap break-words">{line}</div>
              ))
            )}
          </div>
        ))}
        
        {/* Current command input */}
        <div className="flex flex-wrap mt-2">
          <span className="text-white mr-2">{currentDirectory} $</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-transparent text-white outline-none border-none"
            autoFocus
          />
        </div>
      </div>
      
      {/* Mobile command bar */}
      {isMobile && (
        <div className="bg-gray-800 p-2 border-t border-green-700">
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type command here..."
              className="flex-grow bg-gray-700 text-white px-3 py-2 rounded-l-md border-none outline-none"
            />
            <button
              onClick={handleSubmit}
              className="bg-green-700 text-white px-4 py-2 rounded-r-md"
            >
              Run
            </button>
          </div>
          <div className="overflow-x-auto whitespace-nowrap py-2">
            <QuickCommands />
          </div>
        </div>
      )}
      
      {/* Terminal footer */}
      <div className="bg-gray-800 p-2 text-xs text-gray-400 flex justify-between">
        <span>Type 'help' for available commands</span>
        <span>{portfolioData.about.name} © {new Date().getFullYear()}</span>
      </div>
    </div>
  );
}