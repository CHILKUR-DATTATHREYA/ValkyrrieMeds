'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function IntroAnimation() {
  const [stage, setStage] = useState<'active' | 'fading' | 'gone'>('active');
  const fadeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const doneTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startIntro = () => {
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    if (doneTimerRef.current) clearTimeout(doneTimerRef.current);

    setStage('active');

    fadeTimerRef.current = setTimeout(() => {
      setStage('fading');
    }, 1800);

    doneTimerRef.current = setTimeout(() => {
      setStage('gone');
    }, 2300);
  };

  useEffect(() => {
    // Initial run on page load: automatically fade out and land on home page
    startIntro();

    // Listen for logo click to replay intro animation
    const handleReplay = () => {
      startIntro();
    };

    window.addEventListener('vm_show_intro', handleReplay);

    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      if (doneTimerRef.current) clearTimeout(doneTimerRef.current);
      window.removeEventListener('vm_show_intro', handleReplay);
    };
  }, []);

  if (stage === 'gone') return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Valkyrrie Meds Welcome"
      className={`vm-intro-overlay ${stage === 'fading' ? 'vm-intro-fadeout' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'var(--bg-body)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: stage === 'active' ? 'all' : 'none',
      }}
    >
      <div className="vm-intro-content">
        {/* Animated glowing backdrop ring */}
        <div className="vm-intro-ring" />

        {/* Full-screen prominent transparent logo */}
        <div className="vm-intro-logo-box">
          <Image
            src="/vm-logo-transparent.png"
            alt="Valkyrrie Meds Logo"
            width={240}
            height={240}
            priority
            className="vm-intro-logo-img"
          />
        </div>

        {/* Typography */}
        <div className="vm-intro-text-box">
          <h1 className="vm-intro-title">VALKYRRIE MEDS</h1>
          <p className="vm-intro-tagline">
            Empower the Mind <span className="vm-intro-dot">•</span> Elevate the Self <span className="vm-intro-dot">•</span> Embark on the Journey
          </p>
        </div>

        {/* Progress pulse */}
        <div className="vm-intro-bar-track">
          <div className="vm-intro-bar-fill" />
        </div>
      </div>
    </div>
  );
}
