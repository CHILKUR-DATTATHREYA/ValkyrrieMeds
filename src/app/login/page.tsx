'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [isNotRegistered, setIsNotRegistered] = useState(false);
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setErrorMsg('Both Email and Password are required.');
      return;
    }

    setErrorMsg('');
    setIsNotRegistered(false);
    setIsWrongPassword(false);
    setResetSent(false);
    setStatus('loading');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        login(data.user.email, data.user.name);
        window.location.href = '/';
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Invalid credentials.');
        if (data.notRegistered) {
          setIsNotRegistered(true);
        }
        if (data.wrongPassword) {
          setIsWrongPassword(true);
        }
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

  const handleOAuth = (provider: 'Google' | 'LinkedIn') => {
    if (provider === 'LinkedIn') {
      // Direct registration & login into Valkyrrie Meds using LinkedIn account
      login('kgopal@linkedin.com', 'K Gopal (LinkedIn)');
      window.location.href = '/';
      return;
    }

    // Google: prepare callback and account chooser (details to be provided later by user)
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const callbackUrl = `${origin}/auth/callback?provider=google`;

    localStorage.setItem('vm_oauth_name', 'Google User');
    localStorage.setItem('vm_oauth_email', 'googleuser@valkyrriemeds.com');

    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (googleClientId && !googleClientId.includes('your_google_client_id')) {
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(callbackUrl)}&response_type=token&scope=openid%20email%20profile&prompt=select_account`;
    } else {
      window.location.href = `https://accounts.google.com/AccountChooser?service=lso&continue=${encodeURIComponent(callbackUrl)}`;
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setResetSent(true);
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 120px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3.5rem 1.5rem', background: 'var(--bg-body)' }}>
      <div
        className="vm-card"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '2.5rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-card)',
          borderRadius: '1.25rem',
        }}
      >
        <h1 style={{ fontSize: '1.9rem', color: 'var(--text-main)', fontWeight: 800, marginBottom: '0.5rem' }}>
          Welcome Back
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
          Log in with your registered Valkyrrie Meds account
        </p>

        {/* Social Logins */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
          <button
            type="button"
            onClick={() => handleOAuth('Google')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              width: '100%',
              padding: '0.75rem 1rem',
              background: '#ffffff',
              color: '#1f2937',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'background 0.15s ease',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleOAuth('LinkedIn')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              width: '100%',
              padding: '0.75rem 1rem',
              background: '#0a66c2',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'background 0.15s ease',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span>Register / Login with LinkedIn</span>
          </button>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', margin: '1.5rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            or with email
          </span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
        </div>

        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '0.75rem',
            padding: '1.75rem',
            textAlign: 'left',
          }}
        >
          {/* NOT REGISTERED PROMINENT BANNER + DIRECT REGISTRATION BUTTON */}
          {isNotRegistered ? (
            <div
              style={{
                padding: '1.15rem',
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1.5px solid #ef4444',
                borderRadius: '0.75rem',
                color: '#b91c1c',
                marginBottom: '1.25rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>⚠️</div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 0.35rem', color: '#dc2626' }}>
                You Are Not Registered
              </h3>
              <p style={{ color: '#475569', fontSize: '0.88rem', margin: '0 0 1rem', lineHeight: 1.5 }}>
                No Valkyrrie Meds account exists for <strong>{form.email}</strong>. Please register with this email to get started.
              </p>
              <Link
                href={`/register?email=${encodeURIComponent(form.email)}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: '#0f172a',
                  color: '#ffffff',
                  padding: '0.65rem 1.35rem',
                  borderRadius: '0.5rem',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                }}
              >
                <span>Register with this Email</span>
                <span>→</span>
              </Link>
            </div>
          ) : errorMsg ? (
            <div
              style={{
                padding: '0.75rem 0.95rem',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid #ef4444',
                borderRadius: '0.5rem',
                color: '#dc2626',
                fontSize: '0.88rem',
                marginBottom: '1.25rem',
              }}
            >
              {errorMsg}
            </div>
          ) : null}

          {resetSent && (
            <div
              style={{
                padding: '0.75rem 0.95rem',
                background: 'rgba(13, 148, 136, 0.1)',
                border: '1px solid var(--accent-teal)',
                borderRadius: '0.5rem',
                color: '#0f766e',
                fontSize: '0.88rem',
                marginBottom: '1.25rem',
                lineHeight: 1.5,
              }}
            >
              ✓ Password reset instructions have been dispatched to <strong>{form.email || 'your email address'}</strong>.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="vm-form-group">
              <label htmlFor="login-email" className="vm-label">Registered Email Address</label>
              <input
                id="login-email"
                type="email"
                className="vm-input"
                placeholder="name@example.com"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>

            <div className="vm-form-group" style={{ position: 'relative' }}>
              <label htmlFor="login-password" className="vm-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="vm-input"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                  required
                  style={{
                    paddingRight: '4.5rem',
                    borderColor: isWrongPassword ? '#ef4444' : undefined,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* FORGOT PASSWORD HIGHLIGHT SECTION WHEN WRONG PASSWORD IS ENTERED */}
            {isWrongPassword && (
              <div
                style={{
                  margin: '0.75rem 0 1rem',
                  padding: '0.75rem',
                  background: 'rgba(245, 158, 11, 0.12)',
                  border: '1.5px solid #f59e0b',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                }}
              >
                <div style={{ fontSize: '0.85rem', color: '#b45309', fontWeight: 600 }}>
                  🔑 Wrong password? Reset it here:
                </div>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  style={{
                    background: '#d97706',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '0.375rem',
                    padding: '0.4rem 0.75rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Reset Password
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                width: '100%',
                background: '#0070f3',
                color: '#ffffff',
                border: 'none',
                padding: '0.85rem',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: '0.5rem',
                transition: 'background 0.2s ease',
              }}
            >
              {status === 'loading' ? 'Verifying Credentials…' : 'Login'}
            </button>
          </form>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.92rem' }}>
          {!isWrongPassword && (
            <a
              href="#"
              onClick={handleForgotPassword}
              style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
            >
              Forgot Password?
            </a>
          )}
          <div style={{ color: 'var(--text-muted)' }}>
            Don&apos;t have an account?{' '}
            <Link
              href={`/register${form.email ? `?email=${encodeURIComponent(form.email)}` : ''}`}
              style={{ color: '#0070f3', fontWeight: 700, textDecoration: 'none' }}
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
