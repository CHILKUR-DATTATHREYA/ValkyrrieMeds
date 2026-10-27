import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/components/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import IntroAnimation from '@/components/IntroAnimation';

export const metadata: Metadata = {
  title: {
    default: 'Valkyrrie Meds — Empower the Mind. Elevate the Self.',
    template: '%s | Valkyrrie Meds',
  },
  description:
    'Valkyrrie Meds Pvt. Ltd. — transformative training in entrepreneurship, soft skills development, and mental wellness. Unlock your potential.',
  keywords: ['entrepreneurship training', 'soft skills', 'meditation', 'mental wellness', 'Hyderabad', 'Valkyrrie Meds'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://valkyrriemeds.com',
    siteName: 'Valkyrrie Meds',
    title: 'Valkyrrie Meds — Empower the Mind. Elevate the Self.',
    description: 'Transformative training in entrepreneurship, soft skills, and mental wellness.',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/vm-logo-transparent.png', type: 'image/png' },
    ],
    shortcut: '/vm-logo-transparent.png',
    apple: '/vm-logo-transparent.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Inline script to set theme before first paint (prevents flash)
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('vm-theme') || 'light';
    if(t === 'light' || t === 'dark'){
      document.documentElement.setAttribute('data-theme', t);
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    document.documentElement.style.visibility = 'visible';
  } catch(e) {
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.style.visibility = 'visible';
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/vm-logo-transparent.png" />
        <link rel="apple-touch-icon" href="/vm-logo-transparent.png" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <IntroAnimation />
            <Navbar />
            <main id="main-content" style={{ minHeight: 'calc(100vh - 70px)' }}>
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
