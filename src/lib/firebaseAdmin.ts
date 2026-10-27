// src/lib/firebaseAdmin.ts
// Firebase Admin SDK — server-side only (API routes, secure Firestore writes)
import * as adminApp from 'firebase-admin/app';
import * as adminFirestore from 'firebase-admin/firestore';
import * as adminAuth from 'firebase-admin/auth';

// Prevent duplicate initialization in Next.js dev hot-reload
function getOrInitAdmin() {
  const existingApps = adminApp.getApps();
  if (existingApps.length > 0) {
    return existingApps[0];
  }

  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY
    ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined;

  if (
    process.env.FIREBASE_ADMIN_PROJECT_ID &&
    process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
    privateKey
  ) {
    // Full service account credentials available
    return adminApp.initializeApp({
      credential: adminApp.cert({
        projectId:   process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey,
      }),
    });
  }

  // Fallback: use project ID only (for local dev without service account)
  return adminApp.initializeApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'valkyrrie-meds',
  });
}

const adminAppInstance = getOrInitAdmin();

export const adminDb   = adminFirestore.getFirestore(adminAppInstance);
export const adminAuthService = adminAuth.getAuth(adminAppInstance);
export default adminAppInstance;
