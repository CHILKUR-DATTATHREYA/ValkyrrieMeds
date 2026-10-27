import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Our Programs | Valkyrrie Meds',
  description: 'Explore the three foundational pillars of Valkyrrie Meds: Entrepreneurship Training, Meditation & Wellness, and Soft Skills Mastery.',
};

const programs = [
  {
    num: '01',
    title: 'Entrepreneurship Program',
    subtitle: 'Strategic Business & Venture Building',
    tag: 'Business & Strategy',
    desc: 'Transform your entrepreneurial vision into reality with structured training at Valkyrrie Meds. Learn practical opportunity assessment, business modeling, financial discipline, and resilience to navigate uncertainty.',
    href: '/programs/entrepreneurship',
    image: '/entrepreneur.jpg',
    color: 'var(--accent-blue)',
    accentBg: 'rgba(2, 132, 199, 0.08)',
    borderColor: 'rgba(2, 132, 199, 0.25)',
    outcomes: [
      'Foundational business literacy & strategy',
      'Opportunity validation & market testing',
      'Financial planning & risk management',
      'Pitching, storytelling & investor readiness',
    ],
  },
  {
    num: '02',
    title: 'Meditation & Wellness Program',
    subtitle: 'Mindfulness, Focus & Mental Clarity',
    tag: 'Mental Health & Calm',
    desc: 'Cultivate sustained mental clarity, emotional poise, and nervous-system resilience. Designed specifically for high-achievers and modern professionals seeking inner equilibrium alongside external ambition.',
    href: '/programs/meditation',
    image: '/meditation.jpg',
    color: '#68d391',
    accentBg: 'rgba(104, 211, 145, 0.08)',
    borderColor: 'rgba(104, 211, 145, 0.25)',
    outcomes: [
      'Daily mindfulness & nervous system balance',
      'Stress reduction & emotional self-regulation',
      'Laser focus and enhanced cognitive endurance',
      'Holistic wellness practices for longevity',
    ],
  },
  {
    num: '03',
    title: 'Soft Skills Program',
    subtitle: 'High-Impact Communication & Leadership',
    tag: 'Leadership & Voice',
    desc: 'Master the interpersonal finesse that differentiates good professionals from extraordinary leaders. Build commanding public speaking, active empathetic listening, negotiation, and collaborative teamwork.',
    href: '/programs/soft-skills',
    image: '/softskills.jpg',
    color: '#b794f4',
    accentBg: 'rgba(183, 148, 244, 0.08)',
    borderColor: 'rgba(183, 148, 244, 0.25)',
    outcomes: [
      'Executive-level public speaking & presentation',
      'Interpersonal persuasion and conflict resolution',
      'Team leadership & high-trust collaboration',
      'Emotional intelligence in high-stakes settings',
    ],
  },
];

const steps = [
  { step: '01', title: 'Self-Discovery & Goal Alignment', text: 'Assess your strengths, identify psychological blockers, and clarify your 12-month goals.' },
  { step: '02', title: 'Immersive Experiential Learning', text: 'Engage in hands-on workshops, guided meditation intensives, and simulated leadership scenarios.' },
  { step: '03', title: 'Personalized Facilitator Mentorship', text: 'Receive continuous guidance from dedicated experts committed to your long-term success.' },
  { step: '04', title: 'Lifelong Community & Growth', text: 'Graduate into our private network of founders, innovators, and mindful leaders.' },
];

export default function ProgramsHubPage() {
  return (
    <>
      {/* HERO SECTION */}
      <section
        style={{
          background: 'var(--bg-nav)',
          padding: '7rem 0 5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
        aria-labelledby="programs-hub-heading"
      >
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="section-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
          <div className="section-tag">Holistic Educational Framework</div>
          <h1
            id="programs-hub-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              fontWeight: 700,
              color: 'var(--text-heading)',
              lineHeight: 1.15,
              margin: '1rem 0 1.5rem',
            }}
          >
            Three Integrated Pillars for <span style={{ color: 'var(--gold)' }}>Total Transformation</span>
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
            }}
          >
            At Valkyrrie Meds, we believe true fulfillment requires external business mastery, internal peace, and persuasive communication. Explore our programs and discover the syllabus engineered to elevate your life.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact?subject=Book+a+Call" className="btn-primary">
              Book a Free Discovery Call
            </Link>
            <Link href="/join-us" className="btn-outline">
              Apply to Join
            </Link>
          </div>
        </div>
      </section>

      {/* PROGRAMS DETAILED CARDS */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-body)' }}>
        <div className="section-container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem' }}>
            {programs.map((p, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={p.num}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '3.5rem',
                    alignItems: 'center',
                    background: 'var(--bg-card)',
                    border: `1px solid ${p.borderColor}`,
                    borderRadius: '1.25rem',
                    padding: 'clamp(2rem, 4vw, 3.5rem)',
                    boxShadow: '0 12px 35px rgba(0,0,0,0.15)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ order: isEven ? 2 : 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.8rem',
                          fontWeight: 800,
                          color: p.color,
                        }}
                      >
                        {p.num}
                      </span>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          padding: '0.3rem 0.8rem',
                          borderRadius: '999px',
                          background: p.accentBg,
                          color: p.color,
                          fontWeight: 600,
                        }}
                      >
                        {p.tag}
                      </span>
                    </div>

                    <h2
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                        fontWeight: 700,
                        color: 'var(--text-heading)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {p.title}
                    </h2>
                    <h3
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        color: p.color,
                        marginBottom: '1.25rem',
                      }}
                    >
                      {p.subtitle}
                    </h3>

                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.75rem' }}>
                      {p.desc}
                    </p>

                    <div style={{ marginBottom: '2rem' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Core Learning Outcomes:
                      </h4>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.6rem' }}>
                        {p.outcomes.map((outcome, oIdx) => (
                          <li key={oIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'var(--text-body)', fontSize: '0.95rem' }}>
                            <span style={{ color: p.color, fontWeight: 700 }}>✓</span>
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <Link href={p.href} className="btn-primary" style={{ padding: '0.75rem 1.6rem' }}>
                        Explore Full Syllabus →
                      </Link>
                      <Link href={`/contact?subject=${encodeURIComponent(p.title)}`} className="btn-outline" style={{ padding: '0.75rem 1.4rem' }}>
                        Inquire About Seats
                      </Link>
                    </div>
                  </div>

                  <Link
                    href={p.href}
                    aria-label={`View ${p.title} syllabus`}
                    style={{
                      order: isEven ? 1 : 2,
                      position: 'relative',
                      height: '360px',
                      borderRadius: '1rem',
                      overflow: 'hidden',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.25)',
                      display: 'block',
                      cursor: 'pointer',
                    }}
                  >
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(15,18,25,0.7) 0%, transparent 60%)',
                      }}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEARNING JOURNEY ROADMAP */}
      <section style={{ padding: '5rem 0 6rem', background: 'var(--bg-nav)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
            <div className="section-tag">Your Trajectory</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--text-heading)', margin: '0.75rem 0' }}>
              How You Progress at Valkyrrie Meds
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Our pedagogical philosophy is engineered for retention, behavioral change, and demonstrable real-world application.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {steps.map((st) => (
              <div
                key={st.step}
                style={{
                  background: 'var(--bg-card)',
                  padding: '2rem',
                  borderRadius: '1rem',
                  border: '1px solid var(--border-subtle)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    color: 'var(--gold)',
                    opacity: 0.35,
                    marginBottom: '1rem',
                  }}
                >
                  {st.step}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
                  {st.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {st.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-card)', textAlign: 'center' }}>
        <div className="section-container" style={{ maxWidth: '750px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3vw, 2.6rem)', color: 'var(--text-heading)', marginBottom: '1rem' }}>
            Ready to Discover Your Full Potential?
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
            Whether you want to launch a venture, conquer stress through meditation, or become a powerful communicator, we have a seat waiting for you.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/join-us" className="btn-primary">
              Apply for Fellowship
            </Link>
            <Link href="/contact" className="btn-outline">
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
