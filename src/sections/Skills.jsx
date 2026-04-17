import { useEffect, useRef } from 'react';
import './Skills.css';

const skillCategories = [
  {
    title: 'Frontend',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
    ),
    skills: ['React', 'Vue.js', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Next.js', 'Tailwind CSS', 'Angular'],
    color: '#3B82F6',
  },
  {
    title: 'Backend',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    skills: ['Node.js', 'Laravel', 'PHP', 'Python', 'Express', 'REST API', 'C#', '.NET'],
    color: '#8B5CF6',
  },
  {
    title: 'Database',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
      </svg>
    ),
    skills: ['MySQL', 'MS SQL Server', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'SQLite'],
    color: '#10B981',
  },
  {
    title: 'AI & Tools',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"></path>
        <circle cx="12" cy="14" r="3"></circle>
      </svg>
    ),
    skills: ['OpenAI API', 'Claude', 'Copilot', 'Cursor', 'Prompt Engineering', 'Git', 'Docker', 'AWS', 'Vercel'],
    color: '#F59E0B',
  },
];

export default function Skills() {
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
    <section id="skills" ref={sectionRef} className="skills">
      <div className="container">
        <h2 className="section-title fade-in">Technical Skills</h2>
        <p className="section-subtitle fade-in">
          A comprehensive toolkit for building modern web applications
        </p>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="skill-card glass-card fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="skill-header"
                style={{ '--category-color': category.color }}
              >
                <div className="skill-icon">{category.icon}</div>
                <h3>{category.title}</h3>
              </div>
              <div className="skill-tags">
                {category.skills.map((skill, i) => (
                  <span
                    key={skill}
                    className="skill-tag"
                    style={{
                      animationDelay: `${index * 0.1 + i * 0.05}s`,
                      '--hue': `${(i * 40) % 360}`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
