import admin from "firebase-admin";
import fs from "fs";
import "dotenv/config";

let credential;

if (process.env.NODE_ENV === "production") {
  const {
    FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY,
  } = process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error("Missing Firebase environment variables");
  }

  credential = admin.credential.cert({
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  });
} else {
  credential = admin.credential.cert(
    JSON.parse(fs.readFileSync("serviceAccountKey.json", "utf8"))
  );
}

admin.initializeApp({ credential });

export const db = admin.firestore();
