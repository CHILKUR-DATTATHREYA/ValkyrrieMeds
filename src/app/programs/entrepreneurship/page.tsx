import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Entrepreneurship Program | Valkyrrie Meds',
  description:
    'Transform your entrepreneurial vision into reality with structured training at Valkyrrie Meds. Develop a business mindset, identify opportunities, and build your venture.',
};

const outcomes = [
  'Develop a clear entrepreneurial mindset and commercial vision',
  'Identify and validate business opportunities effectively',
  'Understand core business fundamentals, unit economics, and strategy',
  'Build resilience to navigate uncertainty and take decisive action',
  'Master the art of pitching, storytelling, and investor readiness',
  'Access founder toolkits, legal roadmaps, and venture frameworks',
];

const benefits = [
  { icon: '🎯', title: 'Focused Curriculum', desc: 'Structured content designed around real founder challenges and startup mechanics.' },
  { icon: '🤝', title: 'Guided Mentoring', desc: 'Direct guidance from experienced facilitators who understand the entrepreneurial journey.' },
  { icon: '💡', title: 'Practical Application', desc: 'Emphasis on market validation, case studies, and execution — not just theory.' },
  { icon: '🌱', title: 'Holistic Growth', desc: 'Combines strategic business acumen with stress resilience for sustainable success.' },
];

export default function EntrepreneurshipPage() {
  return (
    <>
      {/* ══════════════════ HERO ══════════════════ */}
      <section style={{ padding: '4rem 0 3.5rem', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <div className="section-tag">Program 01 • Business &amp; Strategy</div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--text-main)', marginBottom: '1.25rem', lineHeight: 1.2 }}>
                Unlock Your <span style={{ color: 'var(--accent-blue)' }}>Entrepreneurial Potential</span>
              </h1>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                A transformative training experience designed to help you turn your vision into a sustainable, scalable reality. Built for aspiring founders, innovators, and changemakers.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/contact?subject=Entrepreneurship+Program" className="btn-primary">
                  Enquire About Program
                </Link>
                <Link href="/join-us" className="btn-outline">
                  Apply for Cohort
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
                src="/entrepreneur.jpg"
                alt="Entrepreneurship session at Valkyrrie Meds"
                fill
                priority
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ LEARNING OUTCOMES ══════════════════ */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-body)' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              What You Will Master
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              Key competencies designed to take you from initial spark to venture execution.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', maxWidth: '950px', margin: '0 auto' }}>
            {outcomes.map((item, idx) => (
              <div
                key={idx}
                className="vm-card"
                style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.75rem' }}
              >
                <span style={{ color: 'var(--accent-blue)', fontWeight: 800, fontSize: '1.3rem', lineHeight: 1 }}>✓</span>
                <span style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: 500, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ PROGRAM HIGHLIGHTS ══════════════════ */}
      <section style={{ padding: '4.5rem 0', background: 'var(--bg-surface)' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              Program Advantages
            </h2>
            <div style={{ width: '50px', height: '3px', background: 'var(--accent-blue)', margin: '0 auto', borderRadius: '2px' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {benefits.map((b, i) => (
              <div key={i} className="vm-card" style={{ padding: '2.25rem 1.75rem' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '0.85rem' }}>{b.icon}</div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{b.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA ══════════════════ */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-body)', textAlign: 'center' }}>
        <div className="section-container" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.2rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
            Ready to Build Your Venture?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '2rem' }}>
            Join our next upcoming cohort and gain the business fundamentals, frameworks, and network to succeed.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact?subject=Entrepreneurship+Program" className="btn-primary">
              Enquire Today
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
