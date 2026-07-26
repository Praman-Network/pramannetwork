import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import './NewsletterSection.css';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanEmail = email.trim().substring(0, 100);

    if (!cleanEmail) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    if (!EMAIL_REGEX.test(cleanEmail)) {
      setErrorMsg('Please enter a valid email address (e.g., alex@company.com).');
      return;
    }

    // Successfully validated
    setSubscribed(true);
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="glass-card newsletter-card">
          <div className="newsletter-badge">
            <span className="badge badge-cyan">
              <Sparkles size={11} />
              STAY UPDATED
            </span>
          </div>

          <h2 className="newsletter-title">Engineering Insights, Delivered</h2>
          <p className="newsletter-subtitle">
            Get Zero-Knowledge research papers, protocol updates, security advisories, and SDK releases sent straight to your inbox.
          </p>

          {subscribed ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'var(--green)', fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
              <CheckCircle2 size={20} />
              <span>✓ You are subscribed to Praman Engineering Updates!</span>
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
              <input
                type="email"
                className="glass-input newsletter-input"
                placeholder="Enter your work email address..."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                maxLength={100}
                required
              />
              <button type="submit" className="btn-primary">
                SUBSCRIBE
              </button>
            </form>
          )}

          {errorMsg && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'var(--red)', fontSize: '12px', marginTop: '12px' }}>
              <AlertCircle size={14} />
              <span>{errorMsg}</span>
            </div>
          )}

          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '16px' }}>
            No spam. Unsubscribe anytime. Protected by Praman Zero-Trust Privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
