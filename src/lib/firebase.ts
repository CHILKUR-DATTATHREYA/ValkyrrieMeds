// src/lib/firebase.ts
// Firebase Client SDK — used in browser (Auth, Firestore, Analytics)
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyD-69VSRQKpD52sD7qrM_KCoLC7iPFLS80',
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'valkyrrie-meds.firebaseapp.com',
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'valkyrrie-meds',
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'valkyrrie-meds.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '939863579942',
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:939863579942:web:a1269759cee655b1a635e7',
  measurementId:     process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-4SYKHZPQ6H',
};

// Prevent duplicate initialization in Next.js dev hot-reload & SSR
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Firebase Auth
export const auth = getAuth(app);

// Google Auth Provider — forces account chooser popup
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Firestore Database
export const db = getFirestore(app);

export default app;
