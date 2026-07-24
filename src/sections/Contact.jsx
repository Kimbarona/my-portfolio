import { useEffect, useRef, useState } from 'react';
import './Contact.css';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/Kimbarona',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/kim-aldwin-barona-77b4932b1',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

const initialFormData = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  subject: '',
  message: '',
  website: '',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 20;
const SUCCESS_MESSAGE = "Thanks for reaching out. I'll get back to you as soon as possible.";
const ERROR_MESSAGE = 'I could not send the message right now. Please try again later.';
const SUCCESS_NOTICE_DURATION = 5000;

async function readResponseBody(response) {
  const text = await response.text();

  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const successTimerRef = useRef(null);
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState(null);

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

  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        window.clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  const clearSuccessTimer = () => {
    if (successTimerRef.current) {
      window.clearTimeout(successTimerRef.current);
      successTimerRef.current = null;
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const trimmed = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    if (!trimmed.name) newErrors.name = 'Full name is required.';
    if (!trimmed.email) {
      newErrors.email = 'Email address is required.';
    } else if (!emailPattern.test(trimmed.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!trimmed.subject) newErrors.subject = 'Subject is required.';
    if (!trimmed.message) {
      newErrors.message = 'Message is required.';
    } else if (trimmed.message.length < MIN_MESSAGE_LENGTH) {
      newErrors.message = `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearSuccessTimer();

    if (!validateForm()) {
      setStatus('error');
      setNotice({
        type: 'error',
        message: 'Please review the highlighted fields before sending.',
      });
      return;
    }

    setNotice(null);
    setErrors({});
    setStatus('sending');
    setIsSubmitting(true);

    const payload = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value])
    );

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await readResponseBody(response);

      if (!response.ok) {
        if (result.errors) setErrors(result.errors);
        throw new Error(result.error || ERROR_MESSAGE);
      }

      if (result.success === false) {
        if (result.errors) setErrors(result.errors);
        throw new Error(result.error || ERROR_MESSAGE);
      }

      setStatus('success');
      setErrors({});
      setFormData({ ...initialFormData });
      setNotice({
        type: 'success',
        message: result.message || SUCCESS_MESSAGE,
      });
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      successTimerRef.current = window.setTimeout(() => {
        setNotice(null);
        setStatus('idle');
        successTimerRef.current = null;
      }, SUCCESS_NOTICE_DURATION);
    } catch (error) {
      setStatus('error');
      setNotice({
        type: 'error',
        message: error.message || ERROR_MESSAGE,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    clearSuccessTimer();
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
    if (notice) setNotice(null);
    if (status === 'success' || status === 'error') setStatus('idle');
  };

  const isSending = isSubmitting;

  return (
    <section id="contact" ref={sectionRef} className="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info fade-in">
            <h2 className="section-title">Let's Work Together</h2>
            <p className="section-subtitle" style={{ marginBottom: '40px' }}>
              Open to full-time AI engineering roles, contract engagements, and AI integration projects. If
              you're hiring or have something to build, I'd love to hear from you.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <span className="contact-label">Email</span>
                  <span className="contact-value">kimbarona1228@gmail.com</span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <span className="contact-label">Location</span>
                  <span className="contact-value">Apalit, Pampanga, Philippines</span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <span className="contact-label">Response Time</span>
                  <span className="contact-value">Within 24 hours</span>
                </div>
              </div>
            </div>

            <div className="social-links">
              <span className="social-label">Connect with me</span>
              <div className="social-icons">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label={link.name}
                    title={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-form-container fade-in" style={{ animationDelay: '0.2s' }}>
            <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-header">
                <span className="form-eyebrow">Get in touch</span>
                <h3>Let's talk about the role or project</h3>
                <p>Share a few details — whether it's a job opportunity or a project — and I'll reply within 24 hours.</p>
              </div>

              {notice && (
                <div
                  className={`form-notice ${notice.type}`}
                  role={notice.type === 'error' ? 'alert' : 'status'}
                  aria-live={notice.type === 'error' ? 'assertive' : 'polite'}
                >
                  {notice.type === 'success' ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  )}
                  <span>{notice.message}</span>
                </div>
              )}

              <div className="honeypot-field" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                />
              </div>

              <div className="form-row">
                <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSending}
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    placeholder="John Doe"
                  />
                  {errors.name && <span id="name-error" className="error-message">{errors.name}</span>}
                </div>
                <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSending}
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    placeholder="john@example.com"
                  />
                  {errors.email && <span id="email-error" className="error-message">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company">Company Name <span>Optional</span></label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={isSending}
                    autoComplete="organization"
                    placeholder="Acme Inc."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="projectType">Inquiry Type <span>Optional</span></label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    disabled={isSending}
                  >
                    <option value="">Select a type</option>
                    <option value="AI Integration Project">AI Integration Project</option>
                    <option value="Full-time AI Engineer Role">Full-time AI Engineer Role</option>
                    <option value="Contract/Freelance">Contract / Freelance</option>
                    <option value="SaaS Development">SaaS Development</option>
                    <option value="Enterprise Systems">Enterprise Systems</option>
                    <option value="Other / general inquiry">Other / general inquiry</option>
                  </select>
                </div>
              </div>

              <div className={`form-group ${errors.subject ? 'has-error' : ''}`}>
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={isSending}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  placeholder="Project Inquiry"
                />
                {errors.subject && <span id="subject-error" className="error-message">{errors.subject}</span>}
              </div>

              <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSending}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error message-help' : 'message-help'}
                  placeholder="Tell me about your goals, timeline, and the problem you want to solve..."
                  rows="6"
                ></textarea>
                <span id="message-help" className="field-hint">Minimum {MIN_MESSAGE_LENGTH} characters.</span>
                {errors.message && <span id="message-error" className="error-message">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className={`btn btn-primary submit-btn ${status}`}
                disabled={isSending}
                aria-busy={isSending}
              >
                {isSending ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Inquiry
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </>
                )}
              </button>

              <p className="form-footnote">
                Your message is sent securely and never shared with third parties.
              </p>
            </form>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2026 Developer Portfolio. Built with React & passion.</p>
            <p className="footer-tagline">
              <span className="gradient-text">AI Integration Engineer</span> |{' '}
              <span className="gradient-text">Senior Full Stack Developer</span>
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
