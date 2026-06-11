import { useEffect, useRef } from 'react';
import './Experience.css';

const experience = [
  {
    role: 'Senior Full Stack Developer',
    type: 'Contract',
    company: 'Trixicon LTD',
    period: 'Jan 2026 – Mar 2026',
    summary:
      'Sole technical owner of a full-scale e-commerce platform, from architecture to production deployment.',
    points: [
      'Designed scalable architecture across frontend, backend, database, and infrastructure',
      'Built responsive UI components and robust REST APIs for core business workflows',
      'Implemented secure auth and payment gateway integration; managed CI/CD and AWS deployment',
    ],
    tech: ['Vue.js', 'Laravel', 'PostgreSQL', 'Docker', 'AWS', 'CI/CD'],
  },
  {
    role: 'Senior Web Developer',
    type: 'Contract',
    company: 'Pro Integrate / PLDT Global',
    period: 'Jul 2025 – Jan 2026',
    summary:
      'Delivered features and enhancements for enterprise applications and maintained legacy systems.',
    points: [
      'Built responsive frontends and optimized backend services and database queries',
      'Integrated REST APIs and third-party services; strengthened application security',
      'Debugged complex full-stack production issues and provided production support',
    ],
    tech: ['Java', 'Laravel', 'Vue.js', 'PostgreSQL'],
  },
  {
    role: 'Mid-level Full Stack Developer',
    type: 'Full-time',
    company: 'Xurpas Enterprise Inc.',
    period: 'Sep 2022 – Jun 2025',
    summary:
      'Designed scalable backend APIs and enterprise web platforms while mentoring junior developers.',
    points: [
      'Built scalable backend APIs and contributed to CI/CD and deployment automation',
      'Provided architectural guidance and improved performance, security, and maintainability',
      'Mentored juniors and led Agile/Scrum ceremonies, code reviews, and retrospectives',
    ],
    tech: ['Laravel', 'Node.js', 'Angular', 'Vue', 'React', 'Next.js', '.NET', 'AWS', 'Jenkins'],
  },
  {
    role: 'Full Stack Developer',
    type: 'Full-time',
    company: 'Fasttrack Solutions Inc.',
    period: 'Feb 2022 – Aug 2022',
    summary:
      'Developed and integrated enterprise business applications around SAP Business One.',
    points: [
      'Designed and maintained RESTful APIs for system integration and data synchronization',
      'Built queries, stored procedures, and reports with SAP HANA; customized SAP B1 modules',
      'Optimized backend processes and resolved performance bottlenecks',
    ],
    tech: ['C#', '.NET', 'SAP B1', 'SAP HANA', 'CodeIgniter', 'PHP'],
  },
  {
    role: 'Full Stack Developer',
    type: 'Full-time',
    company: 'RDF Feed, Livestock & Food Inc.',
    period: 'Nov 2017 – Feb 2022',
    summary:
      'Built internal enterprise systems and scalable REST APIs, including the construction monitoring & billing platform.',
    points: [
      'Developed internal enterprise systems, scalable REST APIs, and reporting dashboards',
      'Built reusable frontend components and migrated legacy systems to modern frameworks',
      'Mentored junior developers and contributed to system architecture and technical decisions',
    ],
    tech: ['Laravel', 'Node.js', 'C#', '.NET', 'Vue', 'Angular', 'React', 'MongoDB'],
  },
];

const certifications = [
  'Certified PHP with Laravel Framework — Ground Gurus',
  'Complete NodeJS Developer — Udemy',
  'Mobile Application Development — Certificate of Completion',
];

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const items = section.querySelectorAll('.timeline-item, .exp-extra-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="experience">
      <div className="container">
        <span className="section-eyebrow">Career</span>
        <h2 className="section-title">Professional Experience</h2>
        <p className="section-subtitle">
          8 years building, scaling, and supporting production systems across enterprise, SaaS, and e-commerce.
        </p>

        <div className="timeline">
          {experience.map((job, index) => (
            <article
              key={`${job.company}-${job.period}`}
              className="timeline-item"
              style={{ '--exp-index': index }}
            >
              <span className="timeline-dot" aria-hidden="true"></span>
              <div className="timeline-card glass-card">
                <div className="timeline-card-head">
                  <div>
                    <h3>{job.role}</h3>
                    <span className="timeline-company">{job.company}</span>
                  </div>
                  <div className="timeline-meta">
                    <span className="timeline-type">{job.type}</span>
                    <span className="timeline-period">{job.period}</span>
                  </div>
                </div>
                <p className="timeline-summary">{job.summary}</p>
                <ul className="timeline-points">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="timeline-tech">
                  {job.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="exp-extras">
          <div className="exp-extra-card glass-card">
            <h3>Education</h3>
            <p className="exp-extra-title">BS in Information Technology</p>
            <p className="exp-extra-sub">ACLC College · 2011 – 2017</p>
          </div>
          <div className="exp-extra-card glass-card">
            <h3>Certifications</h3>
            <ul className="exp-cert-list">
              {certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
