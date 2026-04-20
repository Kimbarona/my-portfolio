import { useEffect, useState, useMemo } from 'react';
import './Hero.css';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

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

  const particles = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
      size: 2 + Math.random() * 3,
    }));
  }, []);

  return (
    <section id="hero" className="hero">
      <div
        className="hero-glow"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.1) 30%, transparent 60%)`,
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
          Available for new opportunities
        </div>

        <h1 className="hero-title fade-in" style={{ animationDelay: '0.4s' }}>
          Senior Full-Stack Developer
        </h1>

        <p className="hero-tagline fade-in" style={{ animationDelay: '0.6s' }}>
          Building scalable web applications, SaaS platforms, and business automation systems using Laravel, Vue.js, and modern web technologies.
        </p>

        <p className="hero-description fade-in" style={{ animationDelay: '0.7s' }}>
          I am a full-stack developer with 8+ years of experience building real-world systems including enterprise applications, e-commerce platforms, and automation tools. I specialize in backend architecture, API development, and scalable system design.
        </p>

        <div className="hero-focus fade-in" style={{ animationDelay: '0.75s' }}>
          <span className="focus-label">Focus:</span>
          <span className="focus-items">SaaS Development · API Design · Business Automation · Performance Optimization · Scalable Web Applications</span>
        </div>

        <div className="hero-cta fade-in" style={{ animationDelay: '0.8s' }}>
          <a href="#projects" className="btn btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            View My Work
          </a>
          <a href="#contact" className="btn btn-secondary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Contact Me
          </a>
        </div>

        <div className="hero-stats fade-in" style={{ animationDelay: '1s' }}>
          <div className="stat">
            <span className="stat-number">8+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">50+</span>
            <span className="stat-label">Projects Delivered</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">30+</span>
            <span className="stat-label">Happy Clients</span>
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