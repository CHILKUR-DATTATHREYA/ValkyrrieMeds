'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const galleryItems = [
  {
    id: 1,
    src: '/entrepreneur.jpg',
    alt: 'Kickstart your startup journey presentation',
    title: 'Market Size & Strategy Session',
    category: 'Kickstart your startup journey',
  },
  {
    id: 2,
    src: '/softskills.jpg',
    alt: 'Confidence Building workshop with student group',
    title: 'Confidence Building & Public Speaking',
    category: 'Confidence Building',
  },
  {
    id: 3,
    src: '/about-team.jpg',
    alt: 'School & College Group confidence session',
    title: 'Institutional Outreach & Youth Aspirants',
    category: 'Confidence Building',
  },
  {
    id: 4,
    src: '/meditation.jpg',
    alt: 'Mindfulness & emotional balance workshop',
    title: 'Mindfulness for Resilient Founders',
    category: 'Kickstart your startup journey',
  },
  {
    id: 5,
    src: '/hero-bg.jpg',
    alt: 'Valkyrrie Meds interactive cohort environment',
    title: 'Collaborative Startup Incubator Lab',
    category: 'Kickstart your startup journey',
  },
];

const categories = ['All', 'Confidence Building', 'Kickstart your startup journey'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(i => i.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const navigate = useCallback((dir: 'prev' | 'next') => {
    if (lightboxIndex === null) return;
    const total = filtered.length;
    setLightboxIndex(dir === 'next'
      ? (lightboxIndex + 1) % total
      : (lightboxIndex - 1 + total) % total
    );
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigate('next');
      if (e.key === 'ArrowLeft') navigate('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, navigate]);

  return (
    <>
      {/* ══════════════════ HEADER ══════════════════ */}
      <section style={{ padding: '4rem 0 2.5rem', textAlign: 'center', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-container" style={{ maxWidth: '750px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            Gallery
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            Click a folder or tab to view photos from that category.
          </p>

          {/* Folder tabs */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setLightboxIndex(null);
                }}
                style={{
                  background: activeCategory === cat ? 'var(--btn-primary-bg)' : 'var(--bg-card)',
                  color: activeCategory === cat ? 'var(--btn-primary-text)' : 'var(--text-secondary)',
                  border: `1px solid ${activeCategory === cat ? 'transparent' : 'var(--border-color)'}`,
                  padding: '0.6rem 1.4rem',
                  borderRadius: '999px',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeCategory === cat ? 'var(--shadow-sm)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ GRID ══════════════════ */}
      <section style={{ padding: '4rem 0 6rem' }}>
        <div className="section-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {filtered.map((item, idx) => (
              <div
                key={item.id}
                className="vm-card"
                onClick={() => openLightbox(idx)}
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                <div style={{ position: 'relative', height: '240px' }}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div style={{ padding: '1.25rem 1.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-teal)', letterSpacing: '0.05em' }}>
                    {item.category}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', margin: '0.35rem 0 0' }}>
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ LIGHTBOX ══════════════════ */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(0, 0, 0, 0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#ffffff',
              fontSize: '1.5rem',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); navigate('prev'); }}
            style={{
              position: 'absolute',
              left: '1.5rem',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#ffffff',
              fontSize: '1.5rem',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ‹
          </button>

          <div
            style={{ maxWidth: '900px', width: '100%', textAlign: 'center' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: 'relative', height: '65vh', width: '100%' }}>
              <Image
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <p style={{ color: '#ffffff', fontSize: '1.1rem', marginTop: '1rem', fontWeight: 500 }}>
              {filtered[lightboxIndex].title} ({lightboxIndex + 1} / {filtered.length})
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); navigate('next'); }}
            style={{
              position: 'absolute',
              right: '1.5rem',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#ffffff',
              fontSize: '1.5rem',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
