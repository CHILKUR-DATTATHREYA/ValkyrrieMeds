import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Soft Skills Program | Valkyrrie Meds',
  description:
    'Elevate your communication, leadership, and interpersonal skills with Valkyrrie Meds. Interactive workshops designed for career acceleration and founder presence.',
};

const skillAreas = [
  { icon: '🎤', title: 'Public Speaking & Presentation', desc: 'Deliver compelling presentations with executive presence, storytelling, and stage confidence.' },
  { icon: '🤝', title: 'Interpersonal & Empathetic Communication', desc: 'Master active listening, feedback dynamics, and emotional intelligence in professional relationships.' },
  { icon: '⚡', title: 'High-Impact Leadership', desc: 'Inspire and rally cross-functional teams, resolve conflicts, and drive unified accountability.' },
  { icon: '💼', title: 'Negotiation & Persuasion', desc: 'Structure win-win proposals, negotiate confidently with stakeholders, and communicate value clearly.' },
];

const outcomes = [
  'Commanding stage presence and persuasive speaking capability',
  'Mastery of difficult conversations and conflict de-escalation',
  'Ability to articulate vision, mission, and strategies with clarity',
  'Team facilitation, trust-building, and cross-cultural competence',
  'Official certification upon successful workshop completion',
  'Networking access to accomplished alumni and industry mentors',
];

export default function SoftSkillsPage() {
  return (
    <>
      {/* ══════════════════ HERO ══════════════════ */}
      <section style={{ padding: '4rem 0 3.5rem', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <div className="section-tag" style={{ color: '#7c3aed', background: 'rgba(124, 58, 237, 0.1)' }}>
                Program 03 • Communication &amp; Leadership
              </div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--text-main)', marginBottom: '1.25rem', lineHeight: 1.2 }}>
                Elevate Your Edge: <span style={{ color: '#7c3aed' }}>Soft Skills for Life &amp; Leadership</span>
              </h1>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Speak with clarity. Lead with confidence. Master the interpersonal finesse that differentiates good contributors from exceptional founders and leaders.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/contact?subject=Soft+Skills+Workshops" className="btn-primary">
                  View Upcoming Workshops
                </Link>
                <Link href="/join-us" className="btn-outline">
                  Apply for Certification
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
                src="/softskills.jpg"
                alt="Soft skills leadership workshop"
                fill
                priority
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ SKILL AREAS ══════════════════ */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-body)' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              Core Skill Domains
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              Actionable communication toolkits built through interactive simulation.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {skillAreas.map((s, i) => (
              <div key={i} className="vm-card" style={{ padding: '2.25rem 1.75rem' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '0.85rem' }}>{s.icon}</div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
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
              Your Growth Milestones
            </h2>
            <div style={{ width: '50px', height: '3px', background: '#7c3aed', margin: '0 auto', borderRadius: '2px' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', maxWidth: '950px', margin: '0 auto' }}>
            {outcomes.map((item, idx) => (
              <div
                key={idx}
                className="vm-card"
                style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.75rem' }}
              >
                <span style={{ color: '#7c3aed', fontWeight: 800, fontSize: '1.3rem', lineHeight: 1 }}>✓</span>
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
            Master the Language of Leadership
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '2rem' }}>
            Elevate your communication and interpersonal skills. Reserve your seat in our next cohort.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact?subject=Soft+Skills+Program" className="btn-primary">
              Enroll in Next Workshop
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
