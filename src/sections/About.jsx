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
          <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"></path>
          <circle cx="12" cy="14" r="3"></circle>
        </svg>
      ),
      title: 'AI Integration',
      desc: 'OpenAI API, Claude AI, RAG systems, and LLM-powered applications',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      title: 'SaaS Architecture',
      desc: 'Multi-tenant platforms, subscription systems, and scalable backends',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ),
      title: 'Enterprise Systems',
      desc: 'High-availability platforms, workflow automation, and business process optimization',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
      title: 'Cloud & DevOps',
      desc: 'AWS, Docker, CI/CD pipelines, and production deployment automation',
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <span className="section-eyebrow fade-in">About</span>
            <h2 className="section-title fade-in">AI Integration Engineer &amp; Senior Full Stack Developer</h2>
            <p className="about-intro fade-in">
              I'm an AI Integration Engineer and Senior Full Stack Developer with over
              8 years of experience building scalable SaaS platforms, enterprise
              applications, and AI-powered software solutions. I specialize in
              integrating AI capabilities into modern software that automates
              workflows, enhances user experiences, and solves real business problems.
            </p>
            <p className="about-desc fade-in">
              My expertise spans{' '}
              <span className="tech-highlight">OpenAI API</span> integrations,{' '}
              <span className="tech-highlight">RAG</span> (Retrieval-Augmented
              Generation), intelligent workflow automation, REST APIs, and
              cloud-native architecture. I build end-to-end solutions — from
              AI-powered backends with{' '}
              <span className="tech-highlight">Laravel</span> and{' '}
              <span className="tech-highlight">Node.js</span> to responsive
              frontends with{' '}
              <span className="tech-highlight">Vue</span>,{' '}
              <span className="tech-highlight">Nuxt</span>, and{' '}
              <span className="tech-highlight">React</span> — deployed using{' '}
              <span className="tech-highlight">Docker</span>,{' '}
              <span className="tech-highlight">AWS</span>,{' '}
              <span className="tech-highlight">PostgreSQL</span>, and modern{' '}
              <span className="tech-highlight">CI/CD</span> pipelines.
            </p>
            <p className="about-desc fade-in">
              I'm passionate about combining software engineering with artificial
              intelligence to build production-ready applications that are scalable,
              maintainable, and designed for long-term growth.
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
              <div className="profile-photo-wrap">
                <img
                  src="/profile.png"
                  alt="Kim Aldwin Barona, AI Software Engineer"
                  className="profile-photo"
                  loading="lazy"
                />
                <div className="profile-badge">
                  <span className="years">8+</span>
                  <span className="label">Years</span>
                </div>
              </div>
              <h3 className="profile-name">Kim Aldwin Barona</h3>
              <p className="profile-role">AI Integration Engineer | Senior Full Stack Developer</p>
              <div className="tech-stack">
                <span>Laravel</span>
                <span>Vue</span>
                <span>React</span>
                <span>AI/ML</span>
                <span>AWS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
