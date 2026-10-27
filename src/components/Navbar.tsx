'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { useAuth } from './AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { user, isLoggedIn, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const isProgramsActive = pathname.startsWith('/programs');

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('vm_show_intro'));
    if (pathname !== '/') {
      router.push('/');
    }
  };

type NavItem =
  | { label: string; href: string; isDropdown?: false; dropdown?: never }
  | { label: string; href?: never; isDropdown: true; dropdown: { label: string; href: string }[] };

  // Build nav list dynamically based on auth status
  // Default unauthenticated: Home, About Us, Gallery, Contact Us, Join Us
  // When logged in: insert Programs after About Us
  const baseItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    ...(isLoggedIn
      ? [
          {
            label: 'Programs',
            isDropdown: true as const,
            dropdown: [
              { label: 'Entrepreneurship', href: '/programs/entrepreneurship' },
              { label: 'Meditation', href: '/programs/meditation' },
              { label: 'Soft Skills', href: '/programs/soft-skills' },
            ],
          },
        ]
      : []),
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Join Us', href: '/join-us' },
  ];

  return (
    <header className="vm-header-wrap" style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%', background: 'var(--bg-nav)' }}>
      <nav className="vm-nav" aria-label="Main Navigation" style={{ width: '100%', background: 'var(--bg-nav)', color: '#ffffff' }}>
        <div
          className="vm-nav-inner"
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            padding: '0.75rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            width: '100%',
          }}
        >
          {/* Brand on the left — Clicking replays full-screen intro animation and lands on Home */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="vm-brand"
            aria-label="Valkyrrie Meds Home - Replay Intro Animation"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              textDecoration: 'none',
              flexShrink: 0,
              cursor: 'pointer',
            }}
          >
            <div
              className="vm-logo-circle"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
                overflow: 'hidden',
                flexShrink: 0,
                transition: 'transform 0.2s ease',
              }}
            >
              <Image
                src="/vm-logo-transparent.png"
                alt="VM Logo"
                width={32}
                height={32}
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>
            <span
              className="vm-brand-text"
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                fontSize: '1.35rem',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
              }}
            >
              Valkyrrie Meds
            </span>
          </Link>

          {/* Desktop Navigation Links aligned on the right */}
          <ul
            className="vm-nav-list"
            role="menubar"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '1.25rem',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              flexWrap: 'nowrap',
            }}
          >
            {baseItems.map((item) => {
              if (item.isDropdown && item.dropdown) {
                return (
                  <li
                    key={item.label}
                    ref={dropdownRef}
                    className={`vm-nav-item vm-dropdown-parent ${dropdownOpen ? 'is-open' : ''}`}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    role="none"
                    style={{ position: 'relative', whiteSpace: 'nowrap' }}
                  >
                    <button
                      type="button"
                      className={`vm-nav-link vm-dropdown-btn ${isProgramsActive ? 'active' : ''}`}
                      onClick={() => setDropdownOpen((prev) => !prev)}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                      style={{
                        color: isProgramsActive ? '#ffffff' : 'rgba(255, 255, 255, 0.9)',
                        fontSize: '0.95rem',
                        fontWeight: isProgramsActive ? 700 : 500,
                        textDecoration: 'none',
                        padding: '0.45rem 0.2rem',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        whiteSpace: 'nowrap',
                        borderBottom: isProgramsActive ? '2px solid #ffffff' : 'none',
                      }}
                    >
                      <span>{item.label}</span>
                      <svg
                        className="vm-chevron"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="currentColor"
                        aria-hidden="true"
                        style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                      >
                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    <div
                      className={`vm-dropdown-menu ${dropdownOpen ? 'show' : ''}`}
                      role="menu"
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        left: '50%',
                        transform: dropdownOpen ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(6px)',
                        minWidth: '220px',
                        background: 'var(--bg-nav-dropdown)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '0.625rem',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                        padding: '0.5rem',
                        opacity: dropdownOpen ? 1 : 0,
                        visibility: dropdownOpen ? 'visible' : 'hidden',
                        transition: 'opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease',
                        zIndex: 1050,
                      }}
                    >
                      <Link
                        href="/programs"
                        className="vm-dropdown-overview-link"
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                      >
                        All Programs Overview
                      </Link>
                      <div className="vm-dropdown-divider" />
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`vm-dropdown-item ${pathname === sub.href ? 'active' : ''}`}
                          role="menuitem"
                          onClick={() => setDropdownOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </li>
                );
              }

              const href = item.href || '/';
              const active = isActive(href);
              return (
                <li key={item.label} className="vm-nav-item" role="none" style={{ position: 'relative', whiteSpace: 'nowrap' }}>
                  <Link
                    href={href}
                    className={`vm-nav-link ${active ? 'active' : ''}`}
                    role="menuitem"
                    style={{
                      color: active ? '#ffffff' : 'rgba(255, 255, 255, 0.9)',
                      fontSize: '0.95rem',
                      fontWeight: active ? 700 : 500,
                      textDecoration: 'none',
                      padding: '0.45rem 0.2rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      whiteSpace: 'nowrap',
                      borderBottom: active ? '2px solid #ffffff' : 'none',
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}

            {/* MERGED LOGIN & REGISTER OR LOGGED-IN USER PROFILE */}
            {!isLoggedIn ? (
              <li className="vm-nav-item" role="none" style={{ marginLeft: '0.25rem' }}>
                <Link
                  href="/login"
                  className="vm-merged-auth-btn"
                  role="menuitem"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.45rem 1.05rem',
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    borderRadius: '999px',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>Login / Register</span>
                </Link>
              </li>
            ) : (
              <li className="vm-nav-item" role="none" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '0.25rem' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.35rem 0.85rem',
                    background: 'rgba(255, 255, 255, 0.12)',
                    borderRadius: '999px',
                    color: '#ffffff',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                  }}
                >
                  <span>👤</span>
                  <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user?.name || 'Member'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '999px',
                    color: '#ffffff',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  title="Log out of your account"
                >
                  Logout
                </button>
              </li>
            )}

            {/* Light / Dark Mode Toggle Button */}
            <li className="vm-nav-item vm-theme-toggle-item" role="none" style={{ marginLeft: '0.25rem' }}>
              <button
                type="button"
                className="vm-theme-toggle-btn"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1.05rem',
                  flexShrink: 0,
                }}
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </li>
          </ul>

          {/* Mobile Actions: Theme Toggle + Hamburger */}
          <div className="vm-mobile-actions">
            <button
              type="button"
              className="vm-theme-toggle-btn vm-mobile-theme-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <button
              type="button"
              className="vm-hamburger"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
            >
              <span className={`vm-bar ${mobileOpen ? 'open' : ''}`} />
              <span className={`vm-bar ${mobileOpen ? 'open' : ''}`} />
              <span className={`vm-bar ${mobileOpen ? 'open' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="vm-mobile-drawer" role="dialog" aria-modal="true">
            <ul className="vm-mobile-list">
              {baseItems.map((item) => {
                if (item.isDropdown && item.dropdown) {
                  return (
                    <li key={item.label} className="vm-mobile-item">
                      <div className="vm-mobile-group-title">{item.label}</div>
                      <div className="vm-mobile-subgroup">
                        <Link
                          href="/programs"
                          className="vm-mobile-sublink"
                          onClick={() => setMobileOpen(false)}
                        >
                          All Programs
                        </Link>
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`vm-mobile-sublink ${pathname === sub.href ? 'active' : ''}`}
                            onClick={() => setMobileOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </li>
                  );
                }

                const href = item.href || '/';
                const active = isActive(href);
                return (
                  <li key={item.label} className="vm-mobile-item">
                    <Link
                      href={href}
                      className={`vm-mobile-link ${active ? 'active' : ''}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}

              {/* Mobile Auth button */}
              <li className="vm-mobile-item" style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                {!isLoggedIn ? (
                  <Link
                    href="/login"
                    className="vm-mobile-link"
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      textAlign: 'center',
                      display: 'block',
                      fontWeight: 600,
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    Login / Register
                  </Link>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#ffffff', fontWeight: 600 }}>👤 {user?.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      style={{
                        background: 'none',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '0.375rem',
                        color: '#ffffff',
                        padding: '0.4rem 0.85rem',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
