import admin from "firebase-admin";
import fs from "fs";
import "dotenv/config";

let credential;

if (process.env.NODE_ENV === "production") {
  credential = admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  });
} else {
  credential = admin.credential.cert(
    JSON.parse(fs.readFileSync("serviceAccountKey.json", "utf8"))
  );
}

admin.initializeApp({ credential });

export const db = admin.firestore();
