import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Valkyrrie Meds — Empower the Mind. Elevate the Self. Embark on the Journey.',
  description:
    'Unlock your potential with transformative training in entrepreneurship, communication, and emotional well-being at Valkyrrie Meds Pvt. Ltd.',
};

const programs = [
  {
    title: 'Entrepreneurship & Startup Development',
    category: 'Business & Strategy',
    color: '#0284c7',
    href: '/programs/entrepreneurship',
    bullets: [
      'Turn your ideas into impactful ventures.',
      'Free access to startup templates for verified students.',
      'Resources, mentorship, and guided frameworks.',
    ],
    cta: 'Explore Entrepreneurship →',
  },
  {
    title: 'Soft Skills for Life & Leadership',
    category: 'Communication & Voice',
    color: '#0d9488',
    href: '/programs/soft-skills',
    bullets: [
      'Speak with clarity. Lead with confidence.',
      'Upcoming workshops on communication, leadership, and teamwork.',
      'Official certification for participants upon completion.',
    ],
    cta: 'Explore Soft Skills →',
  },
  {
    title: 'Healing through Meditation',
    category: 'Wellness & Mindfulness',
    color: '#7c3aed',
    href: '/programs/meditation',
    bullets: [
      'Your mental peace is your superpower.',
      'Personalized guided meditation and nervous system journeys.',
      'Group & solo training subscriptions for sustained clarity.',
    ],
    cta: 'Explore Meditation →',
  },
];

const whyReasons = [
  {
    icon: '🌱',
    title: 'Holistic Personal & Professional Growth',
    desc: 'We uniquely bridge external commercial success with inner equilibrium and persuasive communication.',
  },
  {
    icon: '🎓',
    title: 'Trusted by Colleges, Students & Experts',
    desc: 'Empowering universities, budding founders, and working professionals across India with proven pedagogy.',
  },
  {
    icon: '💡',
    title: 'Affordable & Accessible Programs',
    desc: 'World-class leadership, entrepreneurship, and mindfulness training accessible to everyone committed to growth.',
  },
];

const stats = [
  { value: '5,000+', label: 'Aspirants Trained' },
  { value: '120+', label: 'Workshops Conducted' },
  { value: '98%', label: 'Positive Feedback' },
  { value: '3 Pillars', label: 'One Unified Platform' },
];

export default function HomePage() {
  return (
    <div style={{ paddingBottom: '3rem', width: '100%', overflowX: 'hidden' }}>
      {/* ══════════════════ ORIGINAL SIGNATURE HERO ══════════════════ */}
      <section className="vm-hero-section" style={{ padding: '3.5rem 1.5rem', width: '100%' }}>
        <div className="section-container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div
            className="vm-hero-card"
            style={{
              background: 'var(--bg-hero-box)',
              border: '1px solid var(--border-hero)',
              borderRadius: '1.25rem',
              padding: 'clamp(3.5rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3.5rem)',
              textAlign: 'center',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h1
              className="vm-hero-title"
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                fontSize: 'clamp(2.1rem, 4.5vw, 3.4rem)',
                fontWeight: 800,
                color: 'var(--text-main)',
                letterSpacing: '-0.03em',
                lineHeight: 1.25,
                marginBottom: '1.25rem',
                textAlign: 'center',
                maxWidth: '920px',
              }}
            >
              Empower the Mind. Elevate the Self. Embark on the Journey.
            </h1>
            <p
              className="vm-hero-subtitle"
              style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                color: 'var(--text-secondary)',
                maxWidth: '780px',
                margin: '0 auto 2.5rem',
                lineHeight: 1.6,
                textAlign: 'center',
              }}
            >
              Unlock your potential with transformative training in entrepreneurship, communication, and emotional well-being.
            </p>
            <div
              className="vm-hero-buttons"
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.25rem',
                flexWrap: 'wrap',
                width: '100%',
              }}
            >
              <Link
                href="/programs/entrepreneurship"
                className="vm-action-btn"
                style={{
                  background: '#ffffff',
                  color: '#1e293b',
                  border: '1px solid #cbd5e1',
                  padding: '0.85rem 1.65rem',
                  borderRadius: '0.5rem',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  whiteSpace: 'nowrap',
                }}
              >
                Start Your Entrepreneurial Journey
              </Link>
              <Link
                href="/programs/soft-skills"
                className="vm-action-btn"
                style={{
                  background: '#ffffff',
                  color: '#1e293b',
                  border: '1px solid #cbd5e1',
                  padding: '0.85rem 1.65rem',
                  borderRadius: '0.5rem',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  whiteSpace: 'nowrap',
                }}
              >
                View Upcoming Soft Skills Workshops
              </Link>
              <Link
                href="/programs/meditation"
                className="vm-action-btn"
                style={{
                  background: '#ffffff',
                  color: '#1e293b',
                  border: '1px solid #cbd5e1',
                  padding: '0.85rem 1.65rem',
                  borderRadius: '0.5rem',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  whiteSpace: 'nowrap',
                }}
              >
                Take the Mental Health Check
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ THREE FEATURED VISUAL TILES ══════════════════ */}
      <section style={{ padding: '1rem 0 3.5rem' }}>
        <div className="section-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {/* Tile 1: Entrepreneurship Inspiration */}
            <Link
              href="/programs/entrepreneurship"
              className="vm-image-tile"
              aria-label="Explore Entrepreneurship & Startup Development"
              style={{
                position: 'relative',
                height: '300px',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--border-color)',
                display: 'block',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <Image
                src="/entrepreneur.jpg"
                alt="Entrepreneurship - Don't Stop Until You're Proud"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.1) 60%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '1.5rem',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Pillar 01 • Explore Syllabus →
                  </span>
                  <h3 style={{ color: '#ffffff', fontSize: '1.25rem', margin: '0.25rem 0 0' }}>
                    Entrepreneurial Mindset
                  </h3>
                </div>
              </div>
            </Link>

            {/* Tile 2: Speaker / Soft Skills */}
            <Link
              href="/programs/soft-skills"
              className="vm-image-tile"
              aria-label="Explore Soft Skills for Life & Leadership"
              style={{
                position: 'relative',
                height: '300px',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--border-color)',
                display: 'block',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <Image
                src="/softskills.jpg"
                alt="Soft skills workshop with keynote speaker"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.1) 60%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '1.5rem',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#2dd4bf', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Pillar 02 • Explore Syllabus →
                  </span>
                  <h3 style={{ color: '#ffffff', fontSize: '1.25rem', margin: '0.25rem 0 0' }}>
                    Communication &amp; Leadership
                  </h3>
                </div>
              </div>
            </Link>

            {/* Tile 3: Meditation & Wellness */}
            <Link
              href="/programs/meditation"
              className="vm-image-tile"
              aria-label="Explore Healing through Meditation"
              style={{
                position: 'relative',
                height: '300px',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--border-color)',
                display: 'block',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <Image
                src="/meditation.jpg"
                alt="Meditation and mindfulness session"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.1) 60%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '1.5rem',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#a78bfa', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Pillar 03 • Explore Syllabus →
                  </span>
                  <h3 style={{ color: '#ffffff', fontSize: '1.25rem', margin: '0.25rem 0 0' }}>
                    Mental Calm &amp; Wellness
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════ WHAT WE OFFER ══════════════════ */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-surface)' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.5rem)', color: 'var(--text-main)', marginBottom: '0.75rem', fontWeight: 800 }}>
              What We Offer
            </h2>
            <div
              style={{
                width: '60px',
                height: '3px',
                background: 'var(--accent-teal)',
                margin: '0 auto',
                borderRadius: '2px',
              }}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {programs.map((prog) => (
              <div
                key={prog.title}
                className="vm-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: `4px solid ${prog.color}`,
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: prog.color,
                      letterSpacing: '0.08em',
                    }}
                  >
                    {prog.category}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', margin: '0.6rem 0 1.25rem', color: 'var(--text-main)' }}>
                    {prog.title}
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {prog.bullets.map((b, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        <span style={{ color: prog.color, fontWeight: 700, fontSize: '1.1rem', lineHeight: '1.2' }}>•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
                  <Link
                    href={prog.href}
                    style={{
                      color: prog.color,
                      fontWeight: 600,
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    {prog.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ WHY VALKYRRIE MEDS? ══════════════════ */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.5rem)', color: 'var(--text-main)', marginBottom: '0.75rem', fontWeight: 800 }}>
              Why Valkyrrie Meds?
            </h2>
            <div
              style={{
                width: '60px',
                height: '3px',
                background: 'var(--accent-teal)',
                margin: '0 auto',
                borderRadius: '2px',
              }}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {whyReasons.map((item, i) => (
              <div
                key={i}
                className="vm-card"
                style={{ textAlign: 'center', padding: '2.5rem 2rem' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Key Metrics Banner */}
          <div
            style={{
              marginTop: '4rem',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: '1rem',
              padding: '2.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '2rem',
              textAlign: 'center',
            }}
          >
            {stats.map((s, idx) => (
              <div key={idx}>
                <div style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--accent-teal)' }}>
                  {s.value}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', fontWeight: 600, marginTop: '0.25rem' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ STAY INSPIRED & CONNECT ══════════════════ */}
      <section style={{ padding: '3.5rem 0', background: 'var(--bg-surface)' }}>
        <div className="section-container" style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '0.75rem', fontWeight: 700 }}>
            Stay Inspired
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.05rem' }}>
            Get updates on new workshops, masterclasses, and transformative resources.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/about" className="btn-outline">
              About Us
            </Link>
            <Link href="/contact" className="btn-outline">
              Contact
            </Link>
            <Link href="/join-us" className="btn-primary">
              Join Us
            </Link>
            <Link href="/contact" className="btn-outline">
              Feedback
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
