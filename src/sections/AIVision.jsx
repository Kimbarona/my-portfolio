import { useEffect, useRef } from 'react';
import './AIVision.css';

const aiFeatures = [
  {
    title: 'AI Chatbots',
    label: 'Conversation UX',
    description: 'Intelligent conversational interfaces for customer support, lead generation, and user engagement',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
    ),
  },
  {
    title: 'AI SaaS Products',
    label: 'Product Systems',
    description: 'Building scalable AI-powered SaaS applications for content generation, data analysis, and automation',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
  },
  {
    title: 'RAG Systems',
    label: 'Knowledge Retrieval',
    description: 'Retrieval-Augmented Generation systems for intelligent document processing and knowledge management',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        <line x1="11" y1="8" x2="11" y2="14"></line>
        <line x1="8" y1="11" x2="14" y2="11"></line>
      </svg>
    ),
  },
  {
    title: 'AI Integration',
    label: 'Workflow Automation',
    description: 'Seamlessly integrating OpenAI, Claude, and other AI APIs into existing applications and workflows',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    ),
  },
];

function AIFeatureCard({ feature, index }) {
  return (
    <article
      className="ai-feature fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="ai-feature-top">
        <div className="ai-feature-icon" aria-hidden="true">{feature.icon}</div>
        <span className="ai-feature-number">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="ai-feature-content">
        <span className="ai-feature-label">{feature.label}</span>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
      <div className="ai-feature-accent" aria-hidden="true"></div>
    </article>
  );
}

export default function AIVision() {
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
    <section id="ai-vision" ref={sectionRef} className="ai-vision">
      <div className="ai-bg-effects" aria-hidden="true"></div>

      <div className="container">
        <div className="ai-vision-header fade-in">
          <div className="ai-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"></path>
              <circle cx="12" cy="14" r="3"></circle>
            </svg>
            Future Ready
          </div>
          <h2 className="section-title">I Build AI-Powered Applications</h2>
          <p className="section-subtitle">
            Designing practical AI features that improve support workflows,
            internal operations, knowledge search, and product automation.
          </p>
        </div>

        <div className="ai-features">
          {aiFeatures.map((feature, index) => (
            <AIFeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        <div className="ai-cta glass-card fade-in">
          <div className="ai-cta-content">
            <h3>Ready to Build Something Intelligent?</h3>
            <p>
              Let's discuss how AI can transform your business processes and
              create competitive advantages through intelligent automation.
            </p>
          </div>
          <a href="#contact" className="btn btn-primary">
            Start an AI Project
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
