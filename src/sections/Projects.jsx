import { useEffect, useRef } from 'react';
import './Projects.css';

const projects = [
  {
    title: 'TINBO Digital Platform',
    type: 'Enterprise Digital Financial Services Platform',
    status: 'Production System',
    image: '/project-screenshots/tinbo.png',
    imageAlt: 'TINBO digital services interface with bill payments, e-loading, remittance, and government service categories',
    url: 'https://www.tinbo.ph/',
    summary:
      'A high-volume digital services platform giving users in the Philippines and abroad online access to bills payment, remittance, e-loading, government services, and financial workflows.',
    responsibilities: [
      'Built and maintained full-stack features across React.js, Node.js, and Java services',
      'Created reusable responsive UI components for service discovery and transaction flows',
      'Integrated payment gateways, Firebase, and external partner APIs',
      'Improved PostgreSQL query paths and applied Redis caching for transaction-heavy workloads',
      'Supported AWS deployment, monitoring, and production infrastructure operations',
    ],
    impact: [
      'Supported scalable digital transactions and service access',
      'Improved responsiveness through caching and backend optimization',
      'Contributed to reliable processing for high-traffic financial workflows',
    ],
    highlights: ['Payment integrations', 'Redis-backed performance', 'AWS operations'],
    tech: ['React.js', 'Node.js', 'Java', 'PostgreSQL', 'Redis', 'Firebase', 'AWS', 'SCSS'],
    accent: 'blue',
  },
  {
    title: 'Construction Monitoring & Billing System',
    type: 'Construction Workflow Automation Platform',
    status: 'Enterprise Platform',
    image: '/project-screenshots/construction.png',
    imageAlt: 'Apollo construction monitoring and billing system login screen with construction project background',
    url: 'https://apollo.rdfmis.ph/',
    summary:
      'A web-based operations platform for digitizing construction monitoring, progress billing, approvals, and reporting previously handled through spreadsheet-heavy workflows.',
    responsibilities: [
      'Developed real-time project monitoring and billing workflows for construction operations',
      'Implemented progress billing, retention, down payment, and cost computation logic',
      'Built role-based approval flows for engineers, project heads, and finance teams',
      'Designed scalable monitoring patterns for multiple concurrent projects',
      'Worked with stakeholders to reduce manual reporting gaps and billing delays',
    ],
    impact: [
      'Reduced billing preparation and monitoring effort by approximately 40-60%',
      'Moved Excel-based workflows into centralized real-time operations',
      'Improved billing accuracy and project visibility across concurrent projects',
    ],
    highlights: ['Progress tracking', 'Approval workflows', 'Automated billing'],
    workflow: ['Site progress', 'Cost computation', 'Finance approval'],
    tech: ['Laravel', 'Vue.js', 'React.js', 'MySQL', 'Tailwind CSS', 'Docker', 'Postman'],
    accent: 'violet',
  },
  {
    title: 'Dream Pack E-Commerce Platform',
    type: 'Modern Scalable E-Commerce Platform',
    status: 'Live Platform',
    image: '/project-screenshots/dreampack-ecommerce.png',
    imageAlt: 'Dream Pack e-commerce product modal showing product details, filters, variants, and add to cart workflow',
    url: 'https://dream-pack-store.vercel.app/shop',
    summary:
      'A full-featured commerce platform for packaging product sales, combining a responsive shopping experience with scalable APIs, payment integration, and inventory-ready workflows.',
    responsibilities: [
      'Built scalable RESTful APIs using Laravel 12',
      'Developed reactive storefront architecture with Vue 3 and Pinia',
      'Implemented catalog, filtering, cart, checkout, order tracking, and inventory flows',
      'Integrated payment gateway workflows for secure online transactions',
      'Designed reusable components and modular service boundaries for maintainability',
    ],
    impact: [
      'Delivered scalable e-commerce workflows for packaging product operations',
      'Improved frontend responsiveness and transaction flow performance',
      'Created a modular foundation for future product, inventory, and checkout growth',
    ],
    highlights: ['Vue storefront', 'REST API architecture', 'Checkout workflows'],
    tech: ['Laravel 12', 'Vue 3', 'Pinia', 'Tailwind CSS', 'Filament', 'PostgreSQL', 'Docker', 'AWS', 'Firebase'],
    accent: 'amber',
  },
];

function ArrowIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 7H17V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 13V19C18 20.1 17.1 21 16 21H5C3.9 21 3 20.1 3 19V8C3 6.9 3.9 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const animatedItems = section.querySelectorAll('.project-showcase, .projects-heading');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.18 }
    );

    animatedItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="projects">
      <div className="container">
        <div className="projects-heading">
          <span className="section-eyebrow">Selected Work</span>
          <div className="projects-heading-grid">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              Production-grade platforms shaped around transaction reliability, workflow automation, and maintainable full-stack architecture.
            </p>
          </div>
        </div>

        <div className="project-showcase-list">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`project-showcase project-showcase-${project.accent} ${index % 2 === 1 ? 'is-reversed' : ''}`}
              style={{ '--project-index': index }}
            >
              <a className="project-media" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`}>
                <div className="project-browser-bar" aria-hidden="true">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="project-image-frame">
                  <img src={project.image} alt={project.imageAlt} loading={index === 0 ? 'eager' : 'lazy'} />
                  <div className="project-image-overlay"></div>
                </div>

                <div className="project-floating-card project-status-card">
                  <span className="status-dot"></span>
                  {project.status}
                </div>

                {project.workflow && (
                  <div className="project-floating-card workflow-card">
                    {project.workflow.map((step) => (
                      <span key={step}>{step}</span>
                    ))}
                  </div>
                )}

                <div className="project-media-footer">
                  {project.highlights.slice(0, 2).map((highlight) => (
                    <span key={highlight}>{highlight}</span>
                  ))}
                </div>
              </a>

              <div className="project-content">
                <div className="project-kicker">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {project.type}
                </div>

                <h3>{project.title}</h3>
                <p className="project-summary">{project.summary}</p>

                <div className="project-section">
                  <h4>Engineering Highlights</h4>
                  <ul className="project-list">
                    {project.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-impact-grid">
                  <div className="project-section impact-section">
                    <h4>Business Impact</h4>
                    <ul className="project-list">
                      {project.impact.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="project-section stack-section">
                    <h4>Core Technologies</h4>
                    <div className="project-tech">
                      {project.tech.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="project-actions">
                  <a href={project.url} className="project-action project-action-primary" target="_blank" rel="noopener noreferrer">
                    Live Demo
                    <ArrowIcon />
                  </a>
                  <a href={project.url} className="project-action project-action-secondary" target="_blank" rel="noopener noreferrer">
                    View Project
                    <ExternalIcon />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
