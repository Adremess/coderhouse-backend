import admin from 'firebase-admin';

import serviceAccount  from './config/comision22460-1c8a5-firebase-adminsdk-lsw2s-936ae504a0.js';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('Firebase connected!');

const db = admin.firestore();

export default db;
