import admin from "firebase-admin";



const databaseURL = process.env.FIREBASE_DATABASE_URL || ''
export const storageBucket = process.env.USER_UPLOAD_BUCKET_NAME

export const firebase = admin.apps.length
    ? admin.app()
    : admin.initializeApp({
        credential: admin.credential.cert(`../../${process.env.GOOGLE_APPLICATION_CREDENTIALS}`),
        databaseURL,
        storageBucket
    });
