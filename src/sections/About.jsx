import { useEffect, useRef } from 'react';
import './About.css';

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
      title: 'Backend Development',
      desc: 'Laravel, Node.js, PHP - Building robust server-side solutions',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      ),
      title: 'Frontend Development',
      desc: 'React, Vue.js - Creating responsive and intuitive interfaces',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        </svg>
      ),
      title: 'API Development',
      desc: 'REST, GraphQL - Seamless system integration and communication',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"></path>
          <circle cx="12" cy="14" r="3"></circle>
        </svg>
      ),
      title: 'AI Integration',
      desc: 'OpenAI API, Prompt Engineering - Future-ready intelligent applications',
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <h2 className="section-title fade-in">About Me</h2>
            <p className="about-intro fade-in">
              I'm a passionate <strong>Full Stack Developer</strong> with over{' '}
              <strong>8 years of experience</strong> building scalable web
              applications and systems. My expertise spans across the entire
              development lifecycle—from crafting intuitive user interfaces to
              designing robust backend architectures.
            </p>
            <p className="about-desc fade-in">
              I specialize in modern frameworks like <strong>Laravel</strong> and{' '}
              <strong>Node.js</strong> for backend development, along with{' '}
              <strong>React</strong> and <strong>Vue.js</strong> for creating
              dynamic user experiences. I'm also diving deep into AI-powered
              application development, leveraging technologies like the OpenAI
              API to build intelligent systems.
            </p>

            <div className="about-highlights">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="highlight-card glass-card fade-in"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="highlight-icon">{item.icon}</div>
                  <div className="highlight-content">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-visual fade-in">
            <div className="visual-card glass-card">
              <div className="experience-badge">
                <span className="years">8+</span>
                <span className="label">Years of Experience</span>
              </div>
              <div className="visual-decoration">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
              </div>
              <div className="tech-stack">
                <span>Laravel</span>
                <span>Node.js</span>
                <span>React</span>
                <span>Vue</span>
                <span>AI/ML</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
