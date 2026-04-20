import { useEffect, useRef } from 'react';
import './Projects.css';

const projects = [
  {
    title: 'Construction Monitoring & Billing System',
    descriptionPoints: [
      'Developed a web-based system to digitize and automate construction project monitoring, replacing manual Excel-based workflows',
      'Enabled engineers to input real-time progress per scope and sub-scope of work with automatic computation of overall project completion',
      'Implemented automated billing generation including total cost, down payment, and retention calculations',
      'Built role-based access for engineers, project heads, and finance teams for approvals, reporting, and payments',
      'Improved operational efficiency by eliminating manual reporting and reducing delays in progress billing',
      'Reduced billing preparation time by approximately 40–60%',
      'Supported multiple concurrent construction projects with scalable architecture',
      'Improved data accuracy compared to manual Excel-based tracking',
    ],
    tech: ['Laravel', 'Vue.js', 'MySQL', 'HTML', 'CSS'],
    role: 'Fullstack Developer',
    demo: null,
    github: null,
    featured: true,
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
  },
  {
    title: 'E-commerce Platform (Dream Pack – Israel Market)',
    descriptionPoints: [
      'Led development of a full-featured e-commerce platform for packaging products',
      'Integrated third-party payment gateways for secure online transactions',
      'Built scalable backend APIs using Laravel and frontend using Vue 3 and Pinia',
      'Implemented cart, checkout, product management, and order tracking systems',
      'Optimized performance using Tailwind CSS and modular architecture',
      'Improved page load performance through optimized queries and frontend rendering',
      'Designed scalable architecture for growing users and transactions',
      'Collaborated with stakeholders to deliver business-driven features',
    ],
    tech: ['Laravel', 'PostgreSQL', 'Vue 3', 'Pinia', 'Tailwind CSS'],
    role: 'Senior Fullstack Developer',
    demo: 'https://dream-pack-store.vercel.app/',
    github: 'https://github.com/Kimbarona/dream-pack-store',
    featured: true,
    gradient: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
  },
];

export default function Projects() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="projects">
      <div className="container">
        <h2 className="section-title fade-in">Featured Projects</h2>
        <p className="section-subtitle fade-in">
          Showcasing impactful real-world applications and systems
        </p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`project-card glass-card fade-in ${project.featured ? 'featured' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-visual" style={{ '--project-gradient': project.gradient }}>
                <div className="project-decoration">
                  <div className="deco-circle"></div>
                  <div className="deco-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="project-content">
                <h3>{project.title}</h3>

                <ul className="project-description">
                  {project.descriptionPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>

                <div className="project-role">
                  <span className="role-label">Role:</span>
                  <span className="role-value">{project.role}</span>
                </div>

                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>

                <div className="project-links">
                  {project.demo && (
                    <a href={project.demo} className="project-link demo" target="_blank" rel="noopener noreferrer">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} className="project-link github" target="_blank" rel="noopener noreferrer">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}