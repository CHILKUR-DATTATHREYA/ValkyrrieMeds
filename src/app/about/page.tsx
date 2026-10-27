import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us | Valkyrrie Meds',
  description:
    'Valkyrrie Meds Pvt. Ltd. is a transformative platform dedicated to empowering individuals through a unique fusion of entrepreneurship training, softskills development, and mental wellness practices.',
};

const pillars = [
  {
    num: '01',
    title: 'Entrepreneurship',
    headline: 'Unlock Your Potential',
    desc: 'Entrepreneurship training to turn your vision into reality. We guide aspiring founders through business modeling, market opportunity identification, and resilient execution.',
    color: 'var(--accent-blue)',
    tag: 'Business & Strategy',
  },
  {
    num: '02',
    title: 'Soft Skills',
    headline: 'Elevate Your Edge',
    desc: 'Soft Skills development to excel in a competitive world. Master the communication, negotiation, and leadership skills required to inspire high-performance teams.',
    color: 'var(--accent-teal)',
    tag: 'Communication & Voice',
  },
  {
    num: '03',
    title: 'Wellness',
    headline: 'Nurture Your Mind',
    desc: 'Wellness practices to cultivate inner strength and resilience. Guided mindfulness and meditation to build emotional poise and sustained focus under pressure.',
    color: 'var(--accent-amber)',
    tag: 'Mental Equilibrium',
  },
];

const values = [
  { title: 'Integrity & Purpose', desc: 'Every program is built with sincere dedication to participant transformation.' },
  { title: 'Holistic Development', desc: 'True mastery requires balanced emotional health and outward commercial capability.' },
  { title: 'Actionable Excellence', desc: 'We deliver real-world frameworks, not passive theoretical lectures.' },
  { title: 'Lifelong Growth', desc: 'Cultivating sustainable habits of mind that endure across decades of professional life.' },
];

export default function AboutPage() {
  return (
    <>
      {/* ══════════════════ HERO SECTION ══════════════════ */}
      <section style={{ padding: '4rem 0 3.5rem', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <div className="section-tag">About Valkyrrie Meds</div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--text-main)', marginBottom: '1.25rem', lineHeight: 1.2 }}>
                Empowering Minds, <span style={{ color: 'var(--accent-teal)' }}>Elevating Lives</span>
              </h1>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                Valkyrrie Meds Pvt. Ltd. is a transformative platform dedicated to empowering individuals through a unique fusion of entrepreneurship training, soft skills development, and mental wellness practices.
              </p>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Valkyrrie Meds ignites transformation through entrepreneurship, soft skills, and wellness — guiding students, professionals, and future founders to unlock their highest potential.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/contact?subject=Book+a+Call" className="btn-primary">
                  Book a Call
                </Link>
                <Link href="/programs" className="btn-outline">
                  View Programs
                </Link>
              </div>
            </div>

            <Link
              href="/gallery"
              aria-label="View photo gallery of Valkyrrie Meds workshops"
              style={{
                position: 'relative',
                height: '380px',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--border-color)',
                display: 'block',
                cursor: 'pointer',
              }}
            >
              <Image
                src="/about-team.jpg"
                alt="Valkyrrie Meds Team and Workshop Mentors"
                fill
                priority
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════ THREE PILLARS (MATCHING ORIGINAL SITE) ══════════════════ */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-body)' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              Our Three Foundational Pillars
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              An integrated tripartite methodology engineered for comprehensive personal and professional evolution.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {pillars.map((p) => (
              <div
                key={p.num}
                className="vm-card"
                style={{
                  borderTop: `4px solid ${p.color}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 800, color: p.color, opacity: 0.85 }}>
                      {p.num}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: p.color, background: 'var(--bg-surface)', padding: '0.25rem 0.65rem', borderRadius: '999px', border: '1px solid var(--border-color)' }}>
                      {p.tag}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                    {p.title}
                  </h3>
                  <h4 style={{ fontSize: '1rem', color: p.color, fontWeight: 600, marginBottom: '1rem' }}>
                    {p.headline}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.95rem' }}>
                    {p.desc}
                  </p>
                </div>

                <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <Link
                    href={`/programs/${p.title.toLowerCase().replace(' ', '-')}`}
                    style={{ color: p.color, fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ CORE VALUES ══════════════════ */}
      <section style={{ padding: '4.5rem 0', background: 'var(--bg-surface)' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              Guiding Principles
            </h2>
            <div style={{ width: '50px', height: '3px', background: 'var(--accent-teal)', margin: '0 auto', borderRadius: '2px' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.75rem' }}>
            {values.map((v, idx) => (
              <div key={idx} className="vm-card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                  {v.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ CALL TO ACTION ══════════════════ */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-body)', textAlign: 'center' }}>
        <div className="section-container" style={{ maxWidth: '750px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.2rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
            Ready to Begin Your Transformation?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.7 }}>
            Connect with an advisor today to explore how Valkyrrie Meds can elevate your entrepreneurial skills, communication confidence, and mental clarity.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary">
              Book a Call
            </Link>
            <Link href="/join-us" className="btn-outline">
              Join Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
