'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';

function CallbackInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();
  const [provider, setProvider] = useState<'Google' | 'LinkedIn'>('Google');

  useEffect(() => {
    const provParam = searchParams.get('provider');
    const detectedProvider = provParam === 'linkedin' ? 'LinkedIn' : 'Google';
    setProvider(detectedProvider);

    // Save authenticated session for returned user
    const pendingName = localStorage.getItem('vm_oauth_name') || `${detectedProvider} Member`;
    const pendingEmail = localStorage.getItem('vm_oauth_email') || `${detectedProvider.toLowerCase()}_user@valkyrriemeds.com`;

    login(pendingEmail, pendingName);

    localStorage.removeItem('vm_oauth_name');
    localStorage.removeItem('vm_oauth_email');
    localStorage.removeItem('vm_oauth_pending');

    const timer = setTimeout(() => {
      router.push('/');
    }, 1200);

    return () => clearTimeout(timer);
  }, [searchParams, router, login]);

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 120px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'var(--bg-body)',
      }}
    >
      <div
        className="vm-card"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '3rem 2rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-card)',
          borderRadius: '1.25rem',
        }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem', animation: 'spin 1.5s linear infinite' }}>
          ⏳
        </div>
        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '0.5rem', fontWeight: 700 }}>
          Authorizing with {provider}…
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Finalizing your account credentials. Redirecting you to Valkyrrie Meds…
        </p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading authentication…</div>}>
      <CallbackInner />
    </Suspense>
  );
}
