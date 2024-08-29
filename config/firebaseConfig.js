import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import * as path from "path";
import * as fs from "fs";

// Load your Firebase Admin SDK credentials
const serviceAccount = JSON.parse(
  fs.readFileSync(
    path.resolve(
      "./kudoverseassignment-firebase-adminsdk-q9rb3-ea4ce59931.json"
    ),
    "utf8"
  )
);

const firebaseApp = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const storage = getStorage(firebaseApp);
const bucket = getStorage().bucket("kudoverseassignment.appspot.com");

export default bucket;
