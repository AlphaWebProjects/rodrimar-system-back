import * as admin from 'firebase-admin';
import serviceAccount from './admin-firebase.json';
import { loadEnv } from './envs';

loadEnv()

const serviceAccountKey = serviceAccount as admin.ServiceAccount;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    storageBucket: process.env.BUCKET_URL,
});

const bucket = admin.storage().bucket()

export default bucket;
