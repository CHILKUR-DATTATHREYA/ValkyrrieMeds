'use client';

import { useState } from 'react';
import Link from 'next/link';

const audienceCards = [
  {
    id: 'students',
    title: 'Students & Young Aspirants',
    desc: 'Join our workshops, access startup toolkits, and grow your confidence through skill-building programs.',
    btnLabel: 'Enroll as a Learner',
    tag: 'Learner Track',
  },
  {
    id: 'institutions',
    title: 'Educators & Institutions',
    desc: 'Bring Valkyrrie Meds training programs to your college or organization. Let your students grow beyond textbooks.',
    btnLabel: 'Partner With Us',
    tag: 'Institutional Partnership',
  },
  {
    id: 'mentors',
    title: 'Mentors, Coaches & Collaborators',
    desc: 'Are you a startup mentor, soft skills coach, or mental wellness guide? Join our expert panel to impact more lives.',
    btnLabel: 'Join as a Mentor',
    tag: 'Mentor Fellowship',
  },
];

const benefits = [
  'Access to exclusive toolkits and guided resources',
  'Certificates for completed programs',
  'Invitations to Phoenix Circles (community events & mentorship calls)',
  'Discounted passes to leadership and healing retreats',
  'A network of purpose-driven peers and changemakers',
];

export default function JoinUsPage() {
  const [activeModalTrack, setActiveModalTrack] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    interest: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const openModal = (track: string) => {
    setActiveModalTrack(track);
    setForm(prev => ({ ...prev, interest: track }));
    setStatus('idle');
    setErrorMsg('');
  };

  const closeModal = () => {
    setActiveModalTrack(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.city.trim()) {
      setErrorMsg('Full Name, Email, and City are required.');
      return;
    }
    setErrorMsg('');
    setStatus('loading');

    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Submission failed. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  return (
    <>
      {/* ══════════════════ HEADER ══════════════════ */}
      <section style={{ padding: '4rem 0 3rem', textAlign: 'center', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--text-main)', marginBottom: '1rem' }}>
            Join Us
          </h1>
          <h2 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '1.25rem' }}>
            Be Part of a Movement That Empowers Minds &amp; Heals Souls
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '780px', margin: '0 auto' }}>
            At <strong>Valkyrrie Meds</strong>, we&apos;re building a community where ideas grow, voices rise, and hearts heal. Whether you&apos;re a student, educator, entrepreneur, or wellness seeker — there&apos;s a place here for you.
          </p>
        </div>
      </section>

      {/* ══════════════════ THREE AUDIENCE CARDS ══════════════════ */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="section-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {audienceCards.map((card) => (
              <div
                key={card.id}
                className="vm-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  padding: '3rem 2rem',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '1.35rem',
                      color: 'var(--text-main)',
                      marginBottom: '1rem',
                      paddingBottom: '0.85rem',
                      borderBottom: '1px solid var(--border-color)',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.65, minHeight: '75px' }}>
                    {card.desc}
                  </p>
                </div>

                <div style={{ marginTop: '2rem' }}>
                  <button
                    type="button"
                    onClick={() => openModal(card.title)}
                    style={{
                      background: '#0f172a',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.85rem 1.75rem',
                      borderRadius: '0.5rem',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      width: '100%',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {card.btnLabel}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ══════════════════ BENEFITS OF JOINING ══════════════════ */}
          <div
            style={{
              maxWidth: '800px',
              margin: '5rem auto 0',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: '1.25rem',
              padding: 'clamp(2rem, 5vw, 3.5rem)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <h2 style={{ fontSize: '1.6rem', color: 'var(--text-main)', textAlign: 'center', marginBottom: '2rem' }}>
              Benefits of Joining
            </h2>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {benefits.map((b, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', color: 'var(--text-secondary)', fontSize: '1rem' }}>
                  <span style={{ color: '#10b981', fontWeight: 800, fontSize: '1.2rem', lineHeight: 1 }}>✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                Need Help Deciding?
              </div>
              <div>
                Email:{' '}
                <a href="mailto:valkyrriemeds@gmail.com" style={{ color: 'var(--accent-teal)', fontWeight: 600, textDecoration: 'none' }}>
                  valkyrriemeds@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ APPLICATION MODAL ══════════════════ */}
      {activeModalTrack && (
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
          onClick={closeModal}
        >
          <div
            className="vm-card"
            style={{ width: '100%', maxWidth: '540px', padding: '2.5rem', position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              ✕
            </button>

            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              Apply: {activeModalTrack}
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Fill in your details below and our team will get in touch with you.
            </p>

            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎉</div>
                <h4 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  Application Submitted!
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  Thank you for joining Valkyrrie Meds. We will contact you at {form.email} within 48 hours.
                </p>
                <button type="button" className="btn-primary" onClick={closeModal}>
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {errorMsg && (
                  <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '0.5rem', color: '#dc2626', fontSize: '0.88rem', marginBottom: '1rem' }}>
                    {errorMsg}
                  </div>
                )}

                <div className="vm-form-group">
                  <label htmlFor="modal-name" className="vm-label">Full Name: *</label>
                  <input
                    id="modal-name"
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
                  <label htmlFor="modal-email" className="vm-label">Email Address: *</label>
                  <input
                    id="modal-email"
                    name="email"
                    type="email"
                    className="vm-input"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="vm-form-group">
                    <label htmlFor="modal-phone" className="vm-label">Phone Number:</label>
                    <input
                      id="modal-phone"
                      name="phone"
                      type="tel"
                      className="vm-input"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="vm-form-group">
                    <label htmlFor="modal-city" className="vm-label">City: *</label>
                    <input
                      id="modal-city"
                      name="city"
                      type="text"
                      className="vm-input"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="e.g. Hyderabad"
                      required
                    />
                  </div>
                </div>

                <div className="vm-form-group">
                  <label htmlFor="modal-msg" className="vm-label">Background or Message (Optional):</label>
                  <textarea
                    id="modal-msg"
                    name="message"
                    rows={3}
                    className="vm-textarea"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us briefly about your goals or organization…"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={status === 'loading'}
                  style={{ width: '100%', padding: '0.85rem' }}
                >
                  {status === 'loading' ? 'Submitting…' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
