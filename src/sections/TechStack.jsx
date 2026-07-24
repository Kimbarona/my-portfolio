import { useEffect, useRef } from 'react';
import './TechStack.css';

const categories = [
  {
    title: 'AI & LLM',
    color: '#F59E0B',
    skills: [
      { name: 'OpenAI API', level: 'expert' },
      { name: 'Claude AI', level: 'expert' },
      { name: 'RAG Systems', level: 'expert' },
      { name: 'Prompt Engineering', level: 'expert' },
    ],
  },
  {
    title: 'Frontend',
    color: '#10B981',
    skills: [
      { name: 'Vue.js', level: 'expert' },
      { name: 'Nuxt', level: 'expert' },
      { name: 'React', level: 'advanced' },
      { name: 'Next.js', level: 'advanced' },
      { name: 'TypeScript', level: 'advanced' },
    ],
  },
  {
    title: 'Backend',
    color: '#06B6D4',
    skills: [
      { name: 'Laravel', level: 'expert' },
      { name: 'Node.js', level: 'expert' },
      { name: 'PHP', level: 'expert' },
      { name: 'Python', level: 'advanced' },
      { name: 'REST APIs', level: 'expert' },
    ],
  },
  {
    title: 'Infrastructure',
    color: '#8B5CF6',
    skills: [
      { name: 'PostgreSQL', level: 'expert' },
      { name: 'Docker', level: 'advanced' },
      { name: 'AWS', level: 'advanced' },
      { name: 'CI/CD', level: 'advanced' },
      { name: 'Redis', level: 'advanced' },
    ],
  },
];

export default function TechStack() {
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
    <section id="tech-stack" ref={sectionRef} className="tech-stack-section">
      <div className="container">
        <div className="tech-stack-header fade-in">
          <span className="section-eyebrow">Arsenal</span>
          <h2 className="section-title">AI Technology Stack</h2>
          <p className="section-subtitle">
            Production-tested technologies for building AI-powered applications
            at scale.
          </p>
        </div>

        <div className="tech-categories">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className="tech-category glass-card fade-in"
              style={{ animationDelay: `${index * 0.1}s`, '--cat-color': category.color }}
            >
              <div className="tech-cat-header">
                <div className="tech-cat-dot" aria-hidden="true"></div>
                <h3>{category.title}</h3>
              </div>
              <div className="tech-cat-skills">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="tech-skill">
                    <span className="tech-skill-name">{skill.name}</span>
                    <div className="tech-skill-bar" aria-label={`${skill.name} proficiency: ${skill.level}`}>
                      <div className={`tech-skill-fill tech-skill-${skill.level}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
