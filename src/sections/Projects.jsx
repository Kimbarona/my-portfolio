import { useEffect, useRef } from 'react';
import './Projects.css';

const projects = [
  {
    title: 'E-Commerce Platform',
    description:
      'A full-featured e-commerce solution with real-time inventory management, payment processing, and analytics dashboard.',
    tech: ['Laravel', 'Vue.js', 'PostgreSQL', 'Stripe', 'Redis', 'Docker', 'AWS', 'Vercel', 'S3'],
    demo: 'https://dream-pack-store.vercel.app/',
    github: 'https://github.com/Kimbarona/dream-pack-store',
    featured: true,
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
  },
  {
    title: 'Task Management System',
    description:
      'Collaborative project management tool with real-time updates, Kanban boards, and team communication features.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'Docker'],
    demo: '#',
    github: '#',
    featured: true,
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
  },
  {
    title: 'AI Content Generator',
    description:
      'Intelligent content creation platform powered by OpenAI, with custom prompt templates and SEO optimization.',
    tech: ['Next.js', 'OpenAI API', 'Prisma', 'Tailwind CSS'],
    demo: '#',
    github: '#',
    featured: false,
    gradient: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
  },
  {
    title: 'Healthcare Portal',
    description:
      'HIPAA-compliant patient management system with appointment scheduling and medical records management.',
    tech: ['Laravel', 'React', 'MySQL', 'AWS', 'JWT'],
    demo: '#',
    github: '#',
    featured: false,
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
  },
  {
    title: 'Real Estate Marketplace',
    description:
      'Property listing platform with virtual tours, map integration, and automated lead management.',
    tech: ['Vue.js', 'Node.js', 'MongoDB', 'Mapbox', 'AWS S3'],
    demo: '#',
    github: '#',
    featured: false,
    gradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
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
          Showcasing my best work and technical capabilities
        </p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`project-card glass-card fade-in ${project.featured ? 'featured' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {project.featured && <div className="featured-badge">Featured</div>}

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
                <p>{project.description}</p>

                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>

                <div className="project-links">
                  <a href={project.demo} className="project-link demo" target="_blank" rel="noopener noreferrer">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    Live Demo
                  </a>
                  <a href={project.github} className="project-link github" target="_blank" rel="noopener noreferrer">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
