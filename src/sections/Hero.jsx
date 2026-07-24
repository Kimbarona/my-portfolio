import { useEffect, useState } from 'react';
import './Hero.css';

function generateParticles() {
  return [...Array(20)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 10,
    size: 2 + Math.random() * 3,
  }));
}

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [particles] = useState(generateParticles);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="hero">
      <div
        className="hero-glow"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.1) 30%, transparent 60%)`,
        }}
      ></div>

      <div className="hero-particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
          ></div>
        ))}
      </div>

      <div className="hero-grid"></div>

      <div className="hero-decoration">
        <div className="deco-ring ring-1"></div>
        <div className="deco-ring ring-2"></div>
        <div className="deco-ring ring-3"></div>
      </div>

      <div className="container hero-content">
        <div className="hero-badge fade-in" style={{ animationDelay: '0.2s' }}>
          <span className="badge-dot"></span>
          Available for Remote AI Engineering Opportunities
          <span className="badge-timezone">EST / UTC-5</span>
        </div>

        <h1 className="hero-title fade-in" style={{ animationDelay: '0.4s' }}>
          Senior Full Stack Developer{' '}
          <span className="title-divider">|</span>{' '}
          <span className="title-gradient">AI Integration Engineer</span>
        </h1>

        <p className="hero-tagline fade-in" style={{ animationDelay: '0.6s' }}>
          Building AI-Powered SaaS Platforms &amp; Intelligent Automation Systems
        </p>

        <p className="hero-description fade-in" style={{ animationDelay: '0.7s' }}>
          I build intelligent software systems that combine <span className="hero-highlight">AI</span>,
          modern web technologies, and scalable <span className="hero-highlight">cloud architecture</span>.
          Specializing in <span className="hero-highlight">OpenAI API</span> integrations,{' '}
          <span className="hero-highlight">RAG</span> (Retrieval-Augmented Generation),
          workflow automation, and <span className="hero-highlight">SaaS</span> development,
          I create production-ready applications designed for performance,
          maintainability, and long-term growth.
        </p>

        <div className="hero-focus fade-in" style={{ animationDelay: '0.75s' }}>
          <span className="focus-label">Specializing in:</span>
          <span className="focus-items">AI SaaS Development · OpenAI API · RAG Systems · Workflow Automation · Enterprise Architecture</span>
        </div>

        <div className="hero-cta fade-in" style={{ animationDelay: '0.8s' }}>
          <a href="#projects" className="btn btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"></path>
              <circle cx="12" cy="14" r="3"></circle>
            </svg>
            View AI Projects
          </a>
          <a href="/Kim-Aldwin-Barona-CV.pdf" className="btn btn-secondary" download>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Resume
          </a>
          <a href="https://github.com/Kimbarona" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/kim-aldwin-barona-77b4932b1" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        </div>

        <div className="hero-stats fade-in" style={{ animationDelay: '1s' }}>
          <div className="stat">
            <span className="stat-number">8+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">30+</span>
            <span className="stat-label">Projects Delivered</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">10+</span>
            <span className="stat-label">AI Integrations</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">50+</span>
            <span className="stat-label">APIs Built</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">6+</span>
            <span className="stat-label">Enterprise Systems</span>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
