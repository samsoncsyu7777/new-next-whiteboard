import admin from 'firebase-admin';
import path from 'path';

const serviceAccountPath = process.env.FIREBASE_ADMIN_CREDENTIALS;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require(serviceAccountPath)),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  });
}

const adminDb = admin.firestore();

export { adminDb };
