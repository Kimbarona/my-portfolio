import { useEffect, useRef, useState } from 'react';
import './Metrics.css';

const metrics = [
  { number: 8, suffix: '+', label: 'Years Experience' },
  { number: 30, suffix: '+', label: 'Projects Delivered' },
  { number: 10, suffix: '+', label: 'AI Integrations' },
  { number: 50, suffix: '+', label: 'APIs Built' },
  { number: 6, suffix: '+', label: 'Enterprise Systems' },
];

function useCountUp(target, isVisible, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return count;
}

function MetricCard({ metric, isVisible, index }) {
  const count = useCountUp(metric.number, isVisible);

  return (
    <div
      className="metric-card fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <span className="metric-number">
        {count}{metric.suffix}
      </span>
      <span className="metric-label">{metric.label}</span>
    </div>
  );
}

export default function Metrics() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="metrics" ref={sectionRef} className="metrics">
      <div className="container">
        <div className="metrics-strip">
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.label}
              metric={metric}
              isVisible={isVisible}
              index={index}
            />
          ))}
        </div>

        <div className="availability-cta glass-card fade-in">
          <div className="availability-content">
            <div className="availability-badge">
              <span className="availability-dot"></span>
              Available for Remote AI Engineering Opportunities
            </div>
            <p className="availability-timezone">
              EST (UTC-5) — Flexible with US team schedules and async workflows
            </p>
            <p className="availability-desc">
              Open to full-time senior roles, contract engagements, and AI integration projects.
              I work across time zones and thrive in remote-first environments.
            </p>
          </div>
          <a href="#contact" className="btn btn-primary availability-btn">
            Let's Talk
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
