'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ContactFormInner() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState({ rating: '5', text: '' });
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    const sub = searchParams.get('subject');
    if (sub) {
      setForm((prev) => ({ ...prev, subject: decodeURIComponent(sub) }));
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.fullName.trim()) return 'Full name is required.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'A valid email address is required.';
    if (!form.subject.trim()) return 'Subject is required.';
    if (!form.message.trim() || form.message.length < 10) return 'Message must be at least 10 characters.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setErrorMsg(err);
      return;
    }
    setErrorMsg('');
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setForm({ fullName: '', email: '', mobile: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Submission failed. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.text.trim()) return;
    setFeedbackStatus('loading');
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
      });
    } catch {}
    setFeedbackStatus('success');
    setTimeout(() => {
      setShowFeedbackModal(false);
      setFeedbackStatus('idle');
      setFeedback({ rating: '5', text: '' });
    }, 1800);
  };

  return (
    <>
      {/* ══════════════════ HEADER ══════════════════ */}
      <section style={{ padding: '4rem 0 2.5rem', textAlign: 'center', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-container" style={{ maxWidth: '750px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', color: 'var(--text-main)', marginBottom: '0.85rem' }}>
            We&apos;d Love to Hear From You!
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Whether you have a question, want to collaborate, or simply share your experience, we&apos;re here to listen and respond.
          </p>
        </div>
      </section>

      {/* ══════════════════ MAIN CONTENT ══════════════════ */}
      <section style={{ padding: '4rem 0 5rem' }}>
        <div className="section-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'start' }}>
            {/* Left Column: Contact Information */}
            <div>
              <h2 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '1.5rem', borderBottom: '2px solid var(--accent-teal)', paddingBottom: '0.5rem', display: 'inline-block' }}>
                Contact Information
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginTop: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                    Email
                  </div>
                  <a href="mailto:valkyrriemeds@gmail.com" style={{ color: 'var(--text-main)', fontSize: '1.05rem', fontWeight: 600, textDecoration: 'none' }}>
                    valkyrriemeds@gmail.com
                  </a>
                </div>

                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                    Instagram
                  </div>
                  <a href="https://www.instagram.com/valkyrrie.meds/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-main)', fontSize: '1.05rem', fontWeight: 600, textDecoration: 'none' }}>
                    @valkyrrie.meds
                  </a>
                </div>

                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                    Office Address
                  </div>
                  <address style={{ fontStyle: 'normal', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.98rem' }}>
                    <strong>VALKYRRIE MEDS</strong><br />
                    H NO 2-7-271/5, STREET NO. 5,<br />
                    MAMATHA NAGAR COLONY, CHANDANAGAR,<br />
                    NAGOLE, UPPAL, MEDCHAL (MALKAJGIRI)<br />
                    Hyderabad, Telangana, India
                  </address>
                </div>
              </div>
            </div>

            {/* Right Column: Send Us a Message Form */}
            <div className="vm-card" style={{ padding: 'clamp(2rem, 4vw, 2.75rem)' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1.75rem' }}>
                Send Us a Message
              </h2>

              {status === 'success' ? (
                <div style={{ padding: '2rem', background: 'rgba(13, 148, 136, 0.1)', border: '1px solid var(--accent-teal)', borderRadius: '0.75rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✓</div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                    Message Sent Successfully!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                    Thank you for reaching out. An advisor will get back to you within 24–48 hours.
                  </p>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setStatus('idle')}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate>
                  {errorMsg && (
                    <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '0.5rem', color: '#dc2626', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                      {errorMsg}
                    </div>
                  )}

                  <div className="vm-form-group">
                    <label htmlFor="fullName" className="vm-label">Full Name: *</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      className="vm-input"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Your Full Name"
                      required
                    />
                  </div>

                  <div className="vm-form-group">
                    <label htmlFor="email" className="vm-label">Email ID: *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="vm-input"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      required
                    />
                  </div>

                  <div className="vm-form-group">
                    <label htmlFor="mobile" className="vm-label">Mobile Number (Optional):</label>
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      className="vm-input"
                      value={form.mobile}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div className="vm-form-group">
                    <label htmlFor="subject" className="vm-label">Subject: *</label>
                    <select
                      id="subject"
                      name="subject"
                      className="vm-select"
                      value={form.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a Subject…</option>
                      <option value="Entrepreneurship Program">Entrepreneurship Program</option>
                      <option value="Soft Skills Program">Soft Skills Program</option>
                      <option value="Meditation & Wellness Program">Meditation & Wellness Program</option>
                      <option value="Book a Call">Book a Call</option>
                      <option value="Institutional Collaboration">Institutional Collaboration</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>

                  <div className="vm-form-group">
                    <label htmlFor="message" className="vm-label">Message: *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="vm-textarea"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Please share how we can assist your journey…"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={status === 'loading'}
                    style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', marginTop: '0.5rem' }}
                  >
                    {status === 'loading' ? 'Submitting…' : 'Submit'}
                  </button>

                  <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
                    You&apos;ll receive a response within 24–48 hours.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Feedback Section matching original site */}
          <div style={{ marginTop: '5rem', textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '3.5rem' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Want to share your experience or suggestion?
            </p>
            <button
              type="button"
              onClick={() => setShowFeedbackModal(true)}
              style={{
                background: '#ec4899',
                color: '#ffffff',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '999px',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(236, 72, 153, 0.3)',
                transition: 'all 0.2s ease',
              }}
            >
              Give Feedback
            </button>
          </div>
        </div>
      </section>

      {/* FEEDBACK MODAL */}
      {showFeedbackModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={() => setShowFeedbackModal(false)}
        >
          <div
            className="vm-card"
            style={{ width: '100%', maxWidth: '480px', padding: '2.5rem', position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowFeedbackModal(false)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              ✕
            </button>

            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              We Value Your Feedback
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Help us refine and improve the Valkyrrie Meds experience.
            </p>

            {feedbackStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>❤️</div>
                <p style={{ fontWeight: 600, color: 'var(--accent-teal)' }}>Thank you for your feedback!</p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit}>
                <div className="vm-form-group">
                  <label htmlFor="rating-select" className="vm-label">Overall Experience</label>
                  <select
                    id="rating-select"
                    className="vm-select"
                    value={feedback.rating}
                    onChange={(e) => setFeedback((prev) => ({ ...prev, rating: e.target.value }))}
                  >
                    <option value="5">⭐⭐⭐⭐⭐ Outstanding (5/5)</option>
                    <option value="4">⭐⭐⭐⭐ Very Good (4/5)</option>
                    <option value="3">⭐⭐⭐ Good (3/5)</option>
                    <option value="2">⭐⭐ Needs Improvement (2/5)</option>
                    <option value="1">⭐ Poor (1/5)</option>
                  </select>
                </div>

                <div className="vm-form-group">
                  <label htmlFor="feedback-text" className="vm-label">Comments or Suggestions</label>
                  <textarea
                    id="feedback-text"
                    rows={4}
                    className="vm-textarea"
                    placeholder="Tell us what you liked or what we can do better…"
                    value={feedback.text}
                    onChange={(e) => setFeedback((prev) => ({ ...prev, text: e.target.value }))}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={feedbackStatus === 'loading'}
                  style={{ width: '100%', padding: '0.8rem' }}
                >
                  {feedbackStatus === 'loading' ? 'Submitting…' : 'Submit Feedback'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
      <ContactFormInner />
    </Suspense>
  );
}
