import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Meditation & Wellness Program | Valkyrrie Meds',
  description:
    'Cultivate inner peace, focus, and resilience through guided mindfulness practices at Valkyrrie Meds. Mental wellness practices for leaders and high-performers.',
};

const practices = [
  { icon: '🧘', title: 'Mindfulness & Grounding', desc: 'Practical mindfulness techniques for stress reduction and emotional poise.' },
  { icon: '🌿', title: 'Breathwork & Energy', desc: 'Conscious breathing exercises to restore nervous system equilibrium and mental focus.' },
  { icon: '🧠', title: 'Cognitive Renewal', desc: 'Techniques to prevent burnout, detach from cognitive fatigue, and enhance memory.' },
  { icon: '✨', title: 'Sustainable Well-Being', desc: 'Daily wellness rituals designed to integrate seamlessly into demanding schedules.' },
];

const outcomes = [
  'Reduced stress, anxiety, and mental clutter',
  'Enhanced cognitive focus and daily productivity',
  'Emotional resilience to navigate high-stakes founder decisions',
  'Lifelong breathwork and meditation techniques',
  'Improved sleep quality and physical recuperation',
  'A calm, centered presence in high-pressure environments',
];

export default function MeditationPage() {
  return (
    <>
      {/* ══════════════════ HERO ══════════════════ */}
      <section style={{ padding: '4rem 0 3.5rem', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <div className="section-tag" style={{ color: 'var(--accent-teal)', background: 'rgba(13, 148, 136, 0.1)' }}>
                Program 02 • Mental Wellness &amp; Calm
              </div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--text-main)', marginBottom: '1.25rem', lineHeight: 1.2 }}>
                Healing Through <span style={{ color: 'var(--accent-teal)' }}>Meditation &amp; Mindfulness</span>
              </h1>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Your mental peace is your superpower. Cultivate emotional poise, sustained focus, and nervous-system resilience through guided mindfulness crafted for leaders.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/contact?subject=Meditation+Program" className="btn-primary">
                  Take the Mental Health Check
                </Link>
                <Link href="/join-us" className="btn-outline">
                  Join a Practice Circle
                </Link>
              </div>
            </div>

            <div
              style={{
                position: 'relative',
                height: '380px',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--border-color)',
              }}
            >
              <Image
                src="/meditation.jpg"
                alt="Meditation practice at Valkyrrie Meds"
                fill
                priority
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ CORE PRACTICES ══════════════════ */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-body)' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              Core Mindfulness Dimensions
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              Evidence-based techniques designed to cultivate mental resilience.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {practices.map((p, i) => (
              <div key={i} className="vm-card" style={{ padding: '2.25rem 1.75rem' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '0.85rem' }}>{p.icon}</div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{p.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ OUTCOMES ══════════════════ */}
      <section style={{ padding: '4.5rem 0', background: 'var(--bg-surface)' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              What You Experience
            </h2>
            <div style={{ width: '50px', height: '3px', background: 'var(--accent-teal)', margin: '0 auto', borderRadius: '2px' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', maxWidth: '950px', margin: '0 auto' }}>
            {outcomes.map((item, idx) => (
              <div
                key={idx}
                className="vm-card"
                style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.75rem' }}
              >
                <span style={{ color: 'var(--accent-teal)', fontWeight: 800, fontSize: '1.3rem', lineHeight: 1 }}>✓</span>
                <span style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: 500, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA ══════════════════ */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-body)', textAlign: 'center' }}>
        <div className="section-container" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.2rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
            Begin Your Wellness Journey
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '2rem' }}>
            Experience the profound clarity of intentional mindfulness. Reserve your spot today.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact?subject=Meditation+Program" className="btn-primary">
              Book a Session
            </Link>
            <Link href="/programs" className="btn-outline">
              All Programs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
