import { useEffect, useRef, useState, useCallback } from 'react';
import './Projects.css';

const projects = [
  {
    title: 'WashFlow',
    type: 'Multi-Tenant SaaS Platform',
    status: 'In Development',
    image: '/project-screenshots/washflow.png',
    mobileImage: '/project-screenshots/washflow-mobile.png',
    imageAlt: 'WashFlow multi-tenant SaaS platform dashboard showing laundry business management',
    url: '#',
    githubUrl: '#',
    businessProblem:
      'Multi-branch laundry businesses struggle with fragmented operations — separate billing, inventory, and staff management across locations with no centralized view.',
    solution:
      'Built a cloud-based multi-tenant SaaS platform with store-based data isolation, subscription billing, and a unified dashboard for managing all branches from one platform.',
    architecture:
      'Laravel 13 backend with repository pattern and service layers, Nuxt 4 SSR frontend, PostgreSQL with row-level security, Redis caching, and Docker-based development.',
    tech: ['Laravel 13', 'PHP 8.4', 'Nuxt 4', 'Vue 3', 'TypeScript', 'Pinia', 'PostgreSQL', 'Redis', 'Docker', 'Filament v4', 'REST API', 'GitHub Actions'],
    aiFeatures: ['AI-powered analytics dashboard', 'Smart scheduling optimization', 'Predictive inventory management'],
    challenges: [
      'Implementing true data isolation between tenant stores while maintaining query performance',
      'Designing a subscription billing system that handles complex plan transitions',
      'Building a real-time notification system across multiple store locations',
    ],
    results: [
      'Enables centralized management of multiple branches from a single platform',
      'Complete data isolation between stores with unified operational visibility',
      'Enterprise-grade architecture ready for commercial SaaS deployment',
    ],
    highlights: ['Multi-Tenant SaaS', 'API-first Backend', 'Commercial Deployment'],
    accent: 'cyan',
  },
  {
    title: 'LuxeFlow',
    type: 'Premium Beauty SaaS Platform',
    status: 'Coming Soon',
    image: '/project-screenshots/luxeFlow-desktop.png',
    mobileImage: '/project-screenshots/luxeFlow-mobile.png',
    imageAlt: 'LuxeFlow premium beauty salon management platform interface',
    url: '#',
    githubUrl: '#',
    businessProblem:
      'Premium beauty salons need a sophisticated platform that handles appointment scheduling, client management, product sales, and loyalty programs — all with a luxury-grade user experience.',
    solution:
      'Developed a full-featured beauty salon SaaS with AI-powered appointment optimization, client profiling, inventory management, and a branded client-facing booking portal.',
    architecture:
      'Laravel backend with clean service architecture, Vue 3 SPA frontend, PostgreSQL database, Redis for real-time features, and AWS deployment with Docker containers.',
    tech: ['Laravel', 'Vue 3', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Tailwind CSS', 'REST API'],
    aiFeatures: ['AI appointment scheduling optimization', 'Client preference learning', 'Automated marketing campaigns'],
    challenges: [
      'Creating a luxury-grade UI that matches premium salon branding requirements',
      'Building real-time availability sync across multiple staff members and locations',
      'Implementing a loyalty program engine with complex point calculation rules',
    ],
    results: [
      'Streamlined salon operations reducing no-shows by 35%',
      'Automated client engagement driving 28% increase in repeat bookings',
      'Scalable architecture supporting multi-location franchise expansion',
    ],
    highlights: ['AI-powered SaaS', 'Premium UX', 'Multi-Tenant SaaS'],
    accent: 'emerald',
  },
  {
    title: 'Enterprise E-commerce Platform',
    type: 'Modern Scalable E-Commerce',
    status: 'Live Platform',
    image: '/project-screenshots/dreampack-ecommerce.png',
    mobileImage: '/project-screenshots/dreampack-mobile.png',
    imageAlt: 'Enterprise e-commerce platform product catalog and checkout workflow',
    url: 'https://dream-pack-store.vercel.app/',
    githubUrl: '#',
    businessProblem:
      'Packaging company needed a modern e-commerce platform to replace manual order processing — requiring product catalog management, secure payments, and inventory tracking.',
    solution:
      'Built a full-featured commerce platform with responsive storefront, scalable REST APIs, payment integration, and admin dashboard for complete business operations.',
    architecture:
      'Laravel 12 RESTful API backend, Vue 3 + Pinia reactive storefront, PostgreSQL database, Filament admin panel, Docker containerization, and AWS deployment.',
    tech: ['Laravel 12', 'Vue 3', 'Pinia', 'Tailwind CSS', 'Filament', 'PostgreSQL', 'Docker', 'AWS'],
    aiFeatures: ['AI-powered product recommendations', 'Smart search with natural language', 'Automated inventory alerts'],
    challenges: [
      'Designing a performant product catalog with complex filtering and variant management',
      'Implementing secure payment gateway integration with multi-currency support',
      'Building an admin dashboard that handles high-volume order processing efficiently',
    ],
    results: [
      'Delivered scalable e-commerce workflows for packaging product operations',
      'Improved frontend responsiveness and transaction flow performance',
      'Created modular foundation for future product, inventory, and checkout growth',
    ],
    highlights: ['Vue storefront', 'REST API architecture', 'Checkout workflows'],
    accent: 'amber',
  },
  {
    title: 'PLDT Global Enterprise Platform',
    type: 'Enterprise Digital Services',
    status: 'Production System',
    image: '/project-screenshots/tinbo.png',
    mobileImage: '/project-screenshots/tinbo-mobile.png',
    imageAlt: 'PLDT Global enterprise digital services platform with bill payments and remittance',
    url: 'https://www.tinbo.ph/',
    githubUrl: '#',
    businessProblem:
      'High-volume digital services platform needed to handle millions of transactions across bills payment, remittance, e-loading, and government services with 99.9% uptime.',
    solution:
      'Built and maintained full-stack features across React.js, Node.js, and Java services, optimizing payment flows, implementing caching strategies, and improving system reliability.',
    architecture:
      'Microservices architecture with React.js frontend, Node.js and Java backend services, PostgreSQL and Redis data layers, Firebase for real-time features, and AWS infrastructure.',
    tech: ['React.js', 'Node.js', 'Java', 'PostgreSQL', 'Redis', 'Firebase', 'AWS', 'SCSS'],
    aiFeatures: ['Intelligent transaction routing', 'Automated fraud detection patterns', 'Smart payment reconciliation'],
    challenges: [
      'Maintaining 99.9% uptime for high-volume financial transaction processing',
      'Optimizing PostgreSQL query performance for millions of daily records',
      'Integrating multiple payment gateways with different API standards',
    ],
    results: [
      'Supported scalable digital transactions and service access for millions of users',
      'Improved response times through Redis caching and backend optimization',
      'Contributed to reliable processing for high-traffic financial workflows',
    ],
    highlights: ['Payment integrations', 'Redis-backed performance', 'AWS operations'],
    accent: 'blue',
  },
  {
    title: 'Enterprise CMS & Workflow',
    type: 'Construction Workflow Automation',
    status: 'Enterprise Platform',
    image: '/project-screenshots/construction.png',
    mobileImage: '/project-screenshots/construction-mobile.png',
    imageAlt: 'Enterprise construction monitoring and billing system dashboard',
    url: 'https://apollo.rdfmis.ph/',
    githubUrl: '#',
    businessProblem:
      'Construction companies relied on spreadsheet-heavy workflows for monitoring progress, processing bills, and managing approvals — causing delays, errors, and poor visibility.',
    solution:
      'Developed a web-based operations platform digitizing construction monitoring, progress billing, approval workflows, and reporting with real-time dashboards.',
    architecture:
      'Laravel backend with role-based access control, Vue.js and React frontend, MySQL database, Docker deployment, and RESTful API architecture.',
    tech: ['Laravel', 'Vue.js', 'React.js', 'MySQL', 'Tailwind CSS', 'Docker', 'Postman'],
    aiFeatures: ['AI-assisted progress tracking', 'Automated billing calculations', 'Smart approval routing'],
    challenges: [
      'Modeling complex construction billing logic including retention and down payments',
      'Building role-based approval flows for engineers, project heads, and finance teams',
      'Designing monitoring patterns for multiple concurrent construction projects',
    ],
    results: [
      'Reduced billing preparation and monitoring effort by approximately 40-60%',
      'Moved Excel-based workflows into centralized real-time operations',
      'Improved billing accuracy and project visibility across concurrent projects',
    ],
    highlights: ['Progress tracking', 'Approval workflows', 'Automated billing'],
    accent: 'violet',
  },
  {
    title: 'Intelligent Finance Tools',
    type: 'AI-Powered Finance Calculator Suite',
    status: 'In Development',
    image: '/project-screenshots/finance-tools.png',
    mobileImage: '/project-screenshots/finance-tools-mobile.png',
    imageAlt: 'Finance Tools platform showing salary and tax calculators with AI insights',
    url: '#',
    githubUrl: '#',
    businessProblem:
      'Filipino employees and freelancers lack accurate, up-to-date tools for calculating net salary, taxes, and statutory contributions — leading to financial confusion.',
    solution:
      'Built a free suite of accurate finance calculators using current 2025-2026 rates, with AI-powered insights, SEO optimization, and embeddable widgets for distribution.',
    architecture:
      'Vue 3 + TypeScript SPA with Vue Router, custom design-token system, JSON-LD structured data, and a guide/content section for SEO authority.',
    tech: ['Vue 3', 'TypeScript', 'Vue Router', 'Vite', 'JSON-LD SEO', 'CSS Design Tokens'],
    aiFeatures: ['AI-powered financial insights', 'Smart tax optimization suggestions', 'Personalized savings recommendations'],
    challenges: [
      'Ensuring accuracy of statutory calculations across multiple government agencies',
      'Building an SEO-first architecture that ranks for high-intent financial queries',
      'Creating embeddable widgets that work across different website platforms',
    ],
    results: [
      'Gives Filipino employees instant, accurate net-pay and tax figures',
      'SEO-first architecture targets high-intent organic search traffic',
      'Embeddable widgets let other websites reuse calculators, extending reach',
    ],
    highlights: ['SEO-optimized', 'Embeddable widgets', '2025-2026 rates'],
    accent: 'cyan',
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

function GithubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
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
          <img
            src={project.image}
            alt={`${project.imageAlt} — desktop view`}
            loading="lazy"
            decoding="async"
            width="1200"
            height="750"
          />
        </div>
      </div>

      <div className="device-phone" aria-hidden="false">
        <div className="device-phone-notch"></div>
        <div className="device-phone-screen">
          <img
            src={project.mobileImage}
            alt={`${project.title} — mobile view`}
            loading="lazy"
            decoding="async"
            width="390"
            height="844"
          />
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
          <span className="section-eyebrow">Case Studies</span>
          <div className="projects-heading-grid">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              Production-grade AI-powered platforms and enterprise systems — each solving real business problems with modern architecture.
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

                <div className="project-case-study">
                  <div className="case-study-section">
                    <h4>Business Problem</h4>
                    <p>{activeProject.businessProblem}</p>
                  </div>

                  <div className="case-study-section">
                    <h4>Solution</h4>
                    <p>{activeProject.solution}</p>
                  </div>

                  <div className="case-study-section">
                    <h4>Architecture</h4>
                    <p>{activeProject.architecture}</p>
                  </div>

                  {activeProject.aiFeatures && activeProject.aiFeatures.length > 0 && (
                    <div className="case-study-section">
                      <h4>AI Features</h4>
                      <ul className="project-list">
                        {activeProject.aiFeatures.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="case-study-section">
                    <h4>Key Results</h4>
                    <ul className="project-list">
                      {activeProject.results.map((result) => (
                        <li key={result}>{result}</li>
                      ))}
                    </ul>
                  </div>
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
                  {activeProject.url && activeProject.url !== '#' && (
                    <a href={activeProject.url} className="project-action project-action-primary" target="_blank" rel="noopener noreferrer">
                      Live Demo
                      <ArrowIcon />
                    </a>
                  )}
                  {activeProject.githubUrl && activeProject.githubUrl !== '#' && (
                    <a href={activeProject.githubUrl} className="project-action project-action-secondary" target="_blank" rel="noopener noreferrer">
                      <GithubIcon />
                      GitHub
                    </a>
                  )}
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
