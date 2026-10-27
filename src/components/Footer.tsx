'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="vm-footer">
      <div className="vm-footer-grid">
        {/* Brand & Mission */}
        <div>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div className="vm-logo-circle" style={{ width: '40px', height: '40px', background: '#ffffff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                src="/vm-logo-transparent.png"
                alt="VM Logo"
                width={30}
                height={30}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>
              Valkyrrie Meds
            </span>
          </Link>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', lineHeight: 1.6, margin: '1rem 0 1.5rem', maxWidth: '320px' }}>
            Empowering minds through entrepreneurship training, leadership soft skills, and guided mental wellness practices.
          </p>
          <div style={{ display: 'flex', gap: '0.85rem' }}>
            <a
              href="https://www.instagram.com/valkyrrie.meds/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @valkyrrie.meds"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                transition: 'background 0.2s',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="mailto:valkyrriemeds@gmail.com"
              aria-label="Email Valkyrrie Meds"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                transition: 'background 0.2s',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
            Quick Links
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>Home</Link></li>
            <li><Link href="/about" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>About Us</Link></li>
            <li><Link href="/gallery" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>Gallery</Link></li>
            <li><Link href="/contact" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>Contact Us</Link></li>
            <li><Link href="/join-us" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>Join Us</Link></li>
          </ul>
        </div>

        {/* Programs */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
            Our Programs
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
            <li><Link href="/programs" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>Overview</Link></li>
            <li><Link href="/programs/entrepreneurship" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>Entrepreneurship</Link></li>
            <li><Link href="/programs/meditation" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>Meditation &amp; Calm</Link></li>
            <li><Link href="/programs/soft-skills" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>Soft Skills Mastery</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
            Office Address
          </h3>
          <address style={{ fontStyle: 'normal', color: 'rgba(255,255,255,0.7)', fontSize: '0.92rem', lineHeight: 1.65 }}>
            VALKYRRIE MEDS<br />
            H NO 2-7-271/5, STREET NO. 5,<br />
            MAMATHA NAGAR COLONY, CHANDANAGAR,<br />
            NAGOLE, UPPAL, MEDCHAL (MALKAJGIRI)<br />
            Hyderabad, Telangana, India
          </address>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="vm-footer-bottom">
        <div>
          © {currentYear} Valkyrrie Meds Pvt. Ltd. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="/contact" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Contact</Link>
          <Link href="/login" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Login</Link>
          <Link href="/register" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Register</Link>
        </div>
      </div>
    </footer>
  );
}
