// src/lib/firebaseAdmin.ts
// Firebase Admin SDK — server-side only (API routes, secure Firestore writes)
import * as adminApp from 'firebase-admin/app';
import * as adminFirestore from 'firebase-admin/firestore';
import * as adminAuth from 'firebase-admin/auth';

function getOrInitAdmin(): adminApp.App | null {
  try {
    const existingApps = adminApp.getApps();
    if (existingApps.length > 0) {
      return existingApps[0];
    }

    let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
    if (privateKey) {
      // Clean surrounding quotes and convert literal \n to real newlines
      privateKey = privateKey.replace(/^["']|["']$/g, '').replace(/\\n/g, '\n');
    }

    if (
      process.env.FIREBASE_ADMIN_PROJECT_ID &&
      process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
      privateKey
    ) {
      return adminApp.initializeApp({
        credential: adminApp.cert({
          projectId:   process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey,
        }),
      });
    }

    return null;
  } catch (err) {
    console.warn('Firebase Admin initialization deferred/failed:', err);
    return null;
  }
}

/**
 * Returns the Firestore Admin instance if credentials are valid, or null.
 * Never throws at module load time.
 */
export function getAdminDb(): adminFirestore.Firestore | null {
  try {
    const app = getOrInitAdmin();
    if (!app) return null;
    return adminFirestore.getFirestore(app);
  } catch (err) {
    console.warn('Could not initialize admin Firestore:', err);
    return null;
  }
}

/**
 * Returns the Auth Admin service if credentials are valid, or null.
 */
export function getAdminAuth(): adminAuth.Auth | null {
  try {
    const app = getOrInitAdmin();
    if (!app) return null;
    return adminAuth.getAuth(app);
  } catch (err) {
    console.warn('Could not initialize admin Auth:', err);
    return null;
  }
}

// Fallback proxy to maintain backward-compatibility for direct adminDb references
export const adminDb = new Proxy({} as adminFirestore.Firestore, {
  get(_target, prop) {
    const realDb = getAdminDb();
    if (!realDb) {
      // Return safe no-op functions if credentials are not configured yet
      if (prop === 'collection') {
        return () => ({
          doc: () => ({
            set: async () => {},
            get: async () => ({ exists: false, data: () => null }),
          }),
          add: async () => ({ id: 'mock_doc_id' }),
        });
      }
      return undefined;
    }
    const val = (realDb as unknown as Record<string, unknown>)[prop as string];
    return typeof val === 'function' ? (val as Function).bind(realDb) : val;
  },
});

export default getOrInitAdmin;
