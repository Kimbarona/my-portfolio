import { useEffect, useRef } from 'react';
import './AIExpertise.css';

const expertise = [
  {
    title: 'OpenAI API',
    description: 'GPT-4, GPT-4o-mini, function calling, structured outputs, and streaming responses for production applications.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
    ),
  },
  {
    title: 'Claude AI',
    description: 'Anthropic\'s Claude for complex reasoning, analysis, content generation, and enterprise-grade AI workflows.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
        <line x1="9" y1="9" x2="9.01" y2="9"></line>
        <line x1="15" y1="9" x2="15.01" y2="9"></line>
      </svg>
    ),
  },
  {
    title: 'Prompt Engineering',
    description: 'System prompts, few-shot learning, chain-of-thought reasoning, and output structure optimization.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
      </svg>
    ),
  },
  {
    title: 'RAG Systems',
    description: 'Retrieval-Augmented Generation with vector search, knowledge bases, and context-aware AI responses.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        <line x1="11" y1="8" x2="11" y2="14"></line>
        <line x1="8" y1="11" x2="14" y2="11"></line>
      </svg>
    ),
  },
  {
    title: 'AI Workflow Automation',
    description: 'Intelligent process automation, decision engines, and AI-powered business logic for operational efficiency.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    ),
  },
  {
    title: 'AI-assisted Development',
    description: 'GitHub Copilot, Cursor, AI-powered code generation, testing, and development workflow optimization.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
  },
  {
    title: 'LLM Applications',
    description: 'Chatbots, content generation, data analysis, summarization, and custom AI-powered product features.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"></path>
        <circle cx="12" cy="14" r="3"></circle>
      </svg>
    ),
  },
  {
    title: 'REST API Integrations',
    description: 'Third-party API design, webhook systems, microservices architecture, and scalable integration patterns.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
        <line x1="4" y1="22" x2="4" y2="15"></line>
      </svg>
    ),
  },
];

export default function AIExpertise() {
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
    <section id="ai-expertise" ref={sectionRef} className="ai-expertise">
      <div className="ai-expertise-bg" aria-hidden="true"></div>

      <div className="container">
        <div className="ai-expertise-header fade-in">
          <span className="section-eyebrow">Capabilities</span>
          <h2 className="section-title">Deep AI Engineering Capabilities</h2>
          <p className="section-subtitle">
            Practical AI integration experience building production-ready
            applications that deliver real business value.
          </p>
        </div>

        <div className="ai-expertise-grid">
          {expertise.map((item, index) => (
            <article
              key={item.title}
              className="ai-expertise-card fade-in"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="ai-expertise-icon" aria-hidden="true">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="ai-expertise-accent" aria-hidden="true"></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
