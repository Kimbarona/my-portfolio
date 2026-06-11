import { useEffect, useRef, useState, useCallback } from 'react';
import './Projects.css';

const projects = [
  {
    title: 'Finance Tools Philippines',
    type: 'Philippine Personal-Finance Calculator Suite',
    status: 'In Development',
    image: '/project-screenshots/finance-tools.png',
    mobileImage: '/project-screenshots/finance-tools-mobile.png',
    imageAlt: 'Finance Tools Philippines homepage showing salary, take-home, tax, SSS, PhilHealth, and Pag-IBIG calculators using 2025-2026 rates',
    url: '#',
    summary:
      'A free suite of Philippine finance calculators — net salary, take-home pay, BIR income tax, and SSS, PhilHealth, and Pag-IBIG contributions — built on the latest official 2025-2026 rates, with a guides section and embeddable calculator widgets.',
    responsibilities: [
      'Built six accurate statutory calculators (salary, take-home, BIR tax, SSS, PhilHealth, Pag-IBIG) using current 2025-2026 rates',
      'Architected a typed Vue 3 + TypeScript SPA with Vue Router and a custom design-token system',
      'Implemented an SEO foundation with per-page meta, Open Graph, and JSON-LD structured data',
      'Created a guides/content section and embeddable calculator widgets for distribution',
    ],
    impact: [
      'Gives Filipino employees, freelancers, and employers instant, accurate net-pay and tax figures',
      'SEO-first architecture targets high-intent organic search traffic',
      'Embeddable widgets let other websites reuse the calculators, extending reach',
    ],
    highlights: ['SEO-optimized', 'Embeddable widgets', '2025-2026 rates'],
    tech: ['Vue 3', 'TypeScript', 'Vue Router', 'Vite', 'JSON-LD SEO', 'CSS Design Tokens'],
    accent: 'emerald',
  },
  {
    title: 'TINBO Digital Platform',
    type: 'Enterprise Digital Financial Services Platform',
    status: 'Production System',
    image: '/project-screenshots/tinbo.png',
    mobileImage: '/project-screenshots/tinbo-mobile.png',
    imageAlt: 'TINBO digital services interface with bill payments, e-loading, remittance, and government service categories',
    url: 'https://www.tinbo.ph/',
    summary:
      'A high-volume digital services platform giving users in the Philippines and abroad online access to bills payment, remittance, e-loading, government services, and financial workflows.',
    responsibilities: [
      'Built and maintained full-stack features across React.js, Node.js, and Java services',
      'Created reusable responsive UI components for service discovery and transaction flows',
      'Integrated payment gateways, Firebase, and external partner APIs',
      'Improved PostgreSQL query paths and applied Redis caching for transaction-heavy workloads',
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
    mobileImage: '/project-screenshots/construction-mobile.png',
    imageAlt: 'Apollo construction monitoring and billing system login screen with construction project background',
    url: 'https://apollo.rdfmis.ph/',
    summary:
      'A web-based operations platform for digitizing construction monitoring, progress billing, approvals, and reporting previously handled through spreadsheet-heavy workflows.',
    responsibilities: [
      'Developed real-time project monitoring and billing workflows for construction operations',
      'Implemented progress billing, retention, down payment, and cost computation logic',
      'Built role-based approval flows for engineers, project heads, and finance teams',
      'Designed scalable monitoring patterns for multiple concurrent projects',
    ],
    impact: [
      'Reduced billing preparation and monitoring effort by approximately 40-60%',
      'Moved Excel-based workflows into centralized real-time operations',
      'Improved billing accuracy and project visibility across concurrent projects',
    ],
    highlights: ['Progress tracking', 'Approval workflows', 'Automated billing'],
    tech: ['Laravel', 'Vue.js', 'React.js', 'MySQL', 'Tailwind CSS', 'Docker', 'Postman'],
    accent: 'violet',
  },
  {
    title: 'Dream Pack E-Commerce Platform',
    type: 'Modern Scalable E-Commerce Platform',
    status: 'Live Platform',
    image: '/project-screenshots/dreampack-ecommerce.png',
    mobileImage: '/project-screenshots/dreampack-mobile.png',
    imageAlt: 'Dream Pack e-commerce product modal showing product details, filters, variants, and add to cart workflow',
    url: 'https://dream-pack-store.vercel.app/',
    summary:
      'A full-featured commerce platform for packaging product sales, combining a responsive shopping experience with scalable APIs, payment integration, and inventory-ready workflows.',
    responsibilities: [
      'Built scalable RESTful APIs using Laravel 12',
      'Developed reactive storefront architecture with Vue 3 and Pinia',
      'Implemented catalog, filtering, cart, checkout, order tracking, and inventory flows',
      'Integrated payment gateway workflows for secure online transactions',
    ],
    impact: [
      'Delivered scalable e-commerce workflows for packaging product operations',
      'Improved frontend responsiveness and transaction flow performance',
      'Created a modular foundation for future product, inventory, and checkout growth',
    ],
    highlights: ['Vue storefront', 'REST API architecture', 'Checkout workflows'],
    tech: ['Laravel 12', 'Vue 3', 'Pinia', 'Tailwind CSS', 'Filament', 'PostgreSQL', 'Docker', 'AWS'],
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

function ChevronIcon({ dir }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polyline
        points={dir === 'left' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DeviceShowcase({ project }) {
  return (
    <a
      className="device-showcase"
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.title}`}
    >
      <div className="device-browser">
        <div className="device-browser-bar" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="device-browser-screen">
          <img src={project.image} alt={`${project.imageAlt} — desktop view`} loading="eager" decoding="async" />
        </div>
      </div>

      <div className="device-phone" aria-hidden="false">
        <div className="device-phone-notch"></div>
        <div className="device-phone-screen">
          <img src={project.mobileImage} alt={`${project.title} — mobile view`} loading="eager" decoding="async" />
        </div>
      </div>

      <span className="device-views-badge" aria-hidden="true">Desktop + Mobile</span>
    </a>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const touchStartX = useRef(null);
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const count = projects.length;

  const goTo = useCallback((index) => {
    setActive((index + count) % count);
  }, [count]);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Reveal-on-scroll. The carousel reveal is held in React state (not an
  // imperative classList toggle) because the carousel's className changes on
  // every slide (accent color); an imperatively-added class would be wiped on
  // re-render, dropping the carousel back to opacity:0.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const heading = section.querySelector('.projects-heading');
    const carousel = section.querySelector('.projects-carousel');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.target === carousel) setRevealed(true);
          else entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );
    if (heading) observer.observe(heading);
    if (carousel) observer.observe(carousel);
    return () => observer.disconnect();
  }, []);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  };

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) { delta < 0 ? next() : prev(); }
    touchStartX.current = null;
  };

  const activeProject = projects[active];

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

        <div
          className={`projects-carousel project-showcase-${activeProject.accent} ${revealed ? 'is-visible' : ''}`}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured projects"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <div
            className="carousel-viewport"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <article
              key={active}
              className={`project-slide project-showcase-${activeProject.accent}`}
              aria-roledescription="slide"
              aria-label={`${active + 1} of ${count}: ${activeProject.title}`}
            >
              <DeviceShowcase project={activeProject} />

              <div className="project-content">
                <div className="project-kicker">
                  <span>{String(active + 1).padStart(2, '0')}</span>
                  {activeProject.type}
                </div>

                <h3>{activeProject.title}</h3>

                <div className="project-status-row">
                  <span className="project-status-pill">
                    <span className="status-dot"></span>
                    {activeProject.status}
                  </span>
                  {activeProject.highlights.map((highlight) => (
                    <span key={highlight} className="project-highlight-chip">{highlight}</span>
                  ))}
                </div>

                <p className="project-summary">{activeProject.summary}</p>

                <div className="project-section">
                  <h4>Engineering Highlights</h4>
                  <ul className="project-list">
                    {activeProject.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-section">
                  <h4>Core Technologies</h4>
                  <div className="project-tech">
                    {activeProject.tech.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="project-actions">
                  <a href={activeProject.url} className="project-action project-action-primary" target="_blank" rel="noopener noreferrer">
                    Live Site
                    <ArrowIcon />
                  </a>
                  <a href={activeProject.url} className="project-action project-action-secondary" target="_blank" rel="noopener noreferrer">
                    Visit Project
                    <ExternalIcon />
                  </a>
                </div>
              </div>
            </article>
          </div>

          <div className="carousel-controls">
            <button className="carousel-arrow" onClick={prev} aria-label="Previous project">
              <ChevronIcon dir="left" />
            </button>

            <div className="carousel-dots" role="tablist" aria-label="Choose project">
              {projects.map((project, index) => (
                <button
                  key={project.title}
                  className={`carousel-dot ${index === active ? 'is-active' : ''}`}
                  onClick={() => goTo(index)}
                  role="tab"
                  aria-selected={index === active}
                  aria-label={project.title}
                />
              ))}
            </div>

            <span className="carousel-counter">
              {String(active + 1).padStart(2, '0')}
              <span>/ {String(count).padStart(2, '0')}</span>
            </span>

            <button className="carousel-arrow" onClick={next} aria-label="Next project">
              <ChevronIcon dir="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
