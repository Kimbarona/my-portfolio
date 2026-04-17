import { useState, useRef, useEffect } from 'react';
import './AIAssistant.css';

const API_URL = import.meta.env.VITE_API_URL || '/api';
const USE_DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

const suggestedQuestions = [
  "What is your experience?",
  "What tech stack do you use?",
  "Tell me about your projects",
  "Why should I hire you?",
  "Are you experienced in Laravel?",
  "Do you work with AI?"
];

const demoResponses = {
  default: "I'm a full stack developer with 8+ years of experience. I specialize in building scalable web applications using Laravel, Node.js, React, and Vue.js. I also have strong skills in AI integration using OpenAI APIs.",
  experience: "I have over 8 years of professional experience in full stack development. I've built enterprise-level applications, RESTful APIs, and modern web interfaces for various clients.",
  skills: "My tech stack includes:\n\n**Frontend:** React, Vue.js, JavaScript, TypeScript, Next.js\n**Backend:** Laravel, Node.js, Express.js, Python\n**Database:** MySQL, PostgreSQL, MongoDB, Redis\n**AI:** OpenAI API, Prompt Engineering, RAG systems",
  projects: "I've built several notable projects:\n\n1. **E-Commerce Platform** - Laravel, Vue.js, MySQL, Stripe\n2. **Task Management System** - React, Node.js, PostgreSQL, Socket.io\n3. **AI Content Generator** - Next.js, OpenAI API\n4. **Healthcare Portal** - Laravel, React, MySQL, AWS\n5. **Real Estate Marketplace** - Vue.js, Node.js, MongoDB",
  hire: "You should hire me because:\n\n• 8+ years of full stack development experience\n• Strong expertise in both frontend and backend\n• AI integration capabilities (OpenAI, RAG systems)\n• Proven track record of delivering scalable solutions\n• Modern engineering mindset with clean code practices",
  laravel: "Yes! Laravel is one of my primary backend technologies. I have extensive experience building applications with Laravel including APIs, authentication systems, and complex business logic.",
  node: "Absolutely! Node.js is a core part of my backend development skills. I use it with Express.js for building REST APIs and real-time applications with Socket.io.",
  react: "Yes, React is my primary frontend framework. I build modern, responsive web applications using React with hooks, context, and state management best practices.",
  ai: "Yes! I'm actively developing AI-powered applications using:\n\n• OpenAI API integration\n• RAG (Retrieval-Augmented Generation) systems\n• Chatbot development\n• AI SaaS product concepts\n• Prompt engineering",
};

function getDemoResponse(message) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('experience') || lowerMessage.includes('years')) {
    return demoResponses.experience;
  }
  if (lowerMessage.includes('skills') || lowerMessage.includes('tech stack') || lowerMessage.includes('technologies')) {
    return demoResponses.skills;
  }
  if (lowerMessage.includes('project')) {
    return demoResponses.projects;
  }
  if (lowerMessage.includes('hire') || lowerMessage.includes('why')) {
    return demoResponses.hire;
  }
  if (lowerMessage.includes('laravel')) {
    return demoResponses.laravel;
  }
  if (lowerMessage.includes('node')) {
    return demoResponses.node;
  }
  if (lowerMessage.includes('react')) {
    return demoResponses.react;
  }
  if (lowerMessage.includes('ai') || lowerMessage.includes('openai') || lowerMessage.includes('chatbot')) {
    return demoResponses.ai;
  }

  return demoResponses.default;
}

async function fetchFromAPI(message) {
  const response = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to get response');
  }

  return response.json();
}

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi there! I'm an AI assistant powered by the developer's portfolio data. Ask me anything about their skills, experience, or projects!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(USE_DEMO_MODE);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      let responseText;

      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
        responseText = getDemoResponse(userMessage);
      } else {
        const data = await fetchFromAPI(userMessage);
        responseText = data.response;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (err) {
      console.error('API Error:', err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm currently running in demo mode. For full AI responses, please deploy to Vercel and add your OpenAI API key. In demo mode, I can answer basic questions about the developer's skills and experience!"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question) => {
    setInput(question);
  };

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: "Chat cleared! Feel free to ask me anything about the developer."
    }]);
  };

  const toggleDemoMode = () => {
    setIsDemoMode(!isDemoMode);
  };

  return (
    <section id="ai-assistant" className="ai-assistant">
      <div className="container">
        <div className="ai-header">
          <div className="ai-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"></path>
              <circle cx="12" cy="14" r="3"></circle>
            </svg>
            RAG-Powered
          </div>
          <h2 className="section-title">Chat With My AI Assistant</h2>
          <p className="section-subtitle">
            Ask questions about my experience, skills, and projects.
          </p>
        </div>

        <div className="ai-chat-container glass-card">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="ai-avatar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"></path>
                  <circle cx="12" cy="14" r="3"></circle>
                </svg>
              </div>
              <div>
                <h3>Portfolio AI</h3>
                <span className={`status ${isDemoMode ? 'demo' : ''}`}>
                  {isDemoMode ? 'Ready' : 'Live API'}
                </span>
              </div>
            </div>
            <div className="chat-header-actions">
              <button
                className="mode-toggle-btn"
                onClick={toggleDemoMode}
                title={isDemoMode ? 'Switch to Live API' : 'Switch to Demo Mode'}
              >
                {isDemoMode ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                )}
              </button>
              <button className="clear-chat-btn" onClick={clearChat} title="Clear chat">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role === 'user' ? 'user' : 'assistant'}`}
              >
                {message.role === 'assistant' && (
                  <div className="message-avatar">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"></path>
                      <circle cx="12" cy="14" r="3"></circle>
                    </svg>
                  </div>
                )}
                <div className="message-content">
                  {message.content.split('\n').map((line, i) => (
                    <p key={i}>{line || <br />}</p>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message assistant">
                <div className="message-avatar">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"></path>
                    <circle cx="12" cy="14" r="3"></circle>
                  </svg>
                </div>
                <div className="message-content typing">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="suggested-questions">
              <p>Try asking:</p>
              <div className="suggested-buttons">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    className="suggested-btn"
                    onClick={() => handleSuggestedQuestion(question)}
                    disabled={isLoading}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form className="chat-input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my experience, skills, projects..."
              disabled={isLoading}
              className="chat-input"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="send-btn"
            >
              {isLoading ? (
                <span className="spinner-small"></span>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              )}
            </button>
          </form>
        </div>

        <div className="ai-info-banner">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>
            {isDemoMode
              ? 'AI Assistant is ready to help you learn about the developer.'
              : 'Connected to live API - Responses generated by AI using RAG.'}
          </span>
        </div>

        <div className="ai-features">
          <div className="ai-feature-item">
            <div className="ai-feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </div>
            <h4>Smart Responses</h4>
            <p>Answers based on real portfolio data</p>
          </div>
          <div className="ai-feature-item">
            <div className="ai-feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"></path>
                <circle cx="12" cy="14" r="3"></circle>
              </svg>
            </div>
            <h4>RAG-Powered</h4>
            <p>Retrieval-Augmented Generation</p>
          </div>
          <div className="ai-feature-item">
            <div className="ai-feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h4>No Hallucination</h4>
            <p>Only uses verified portfolio information</p>
          </div>
        </div>
      </div>
    </section>
  );
}
