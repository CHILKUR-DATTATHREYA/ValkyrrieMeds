// src/lib/firebaseAdmin.ts
// Firebase Admin SDK — server-side dynamic loader (100% serverless safe, no ESM/CJS conflicts)

export async function saveToFirestore(
  collectionName: string,
  data: Record<string, unknown>,
  docId?: string
): Promise<string | null> {
  try {
    const adminApp = await import('firebase-admin/app');
    const adminFirestore = await import('firebase-admin/firestore');

    const existingApps = adminApp.getApps();
    let app = existingApps.length > 0 ? existingApps[0] : null;

    if (!app) {
      let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
      if (privateKey) {
        privateKey = privateKey.replace(/^["']|["']$/g, '').replace(/\\n/g, '\n');
      }

      if (
        process.env.FIREBASE_ADMIN_PROJECT_ID &&
        process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
        privateKey
      ) {
        app = adminApp.initializeApp({
          credential: adminApp.cert({
            projectId:   process.env.FIREBASE_ADMIN_PROJECT_ID,
            clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
            privateKey,
          }),
        });
      }
    }

    if (!app) {
      return null;
    }

    const db = adminFirestore.getFirestore(app);
    if (docId) {
      await db.collection(collectionName).doc(docId).set(data);
      return docId;
    } else {
      const ref = await db.collection(collectionName).add(data);
      return ref.id;
    }
  } catch (err) {
    console.warn(`[Firestore] ${collectionName} mirror skipped:`, err);
    return null;
  }
}

// Backward-compatible safe proxy so static adminDb references never crash
export const adminDb = {
  collection: (name: string) => ({
    doc: (id: string) => ({
      set: async (data: Record<string, unknown>) => saveToFirestore(name, data, id),
    }),
    add: async (data: Record<string, unknown>) => {
      const id = await saveToFirestore(name, data);
      return { id: id || 'temp_id' };
    },
  }),
};
