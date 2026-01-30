import admin from "firebase-admin";
import fs from "fs";
import "dotenv/config";

let credential;

if (process.env.NODE_ENV === "production") {
  credential = admin.credential.cert({
    FIREBASE_type:process.env.FIREBASE_type,
    FIREBASE_project_id:process.env.FIREBASE_project_id,
    FIREBASE_private_key_id:process.env.FIREBASE_private_key_id,
    FIREBASE_private_key:process.env.FIREBASE_private_key.replace(/\\n/g, "\n"),
    FIREBASE_client_email:process.env.FIREBASE_client_email,
    FIREBASE_client_id:process.env.FIREBASE_client_id,
    FIREBASE_auth_uri:process.env.FIREBASE_auth_uri,
    FIREBASE_token_uri:process.env.FIREBASE_token_uri,
    FIREBASE_auth_provider_x509_cert_url:process.env.FIREBASE_auth_provider_x509_cert_url,
    FIREBASE_client_x509_cert_url:process.env.FIREBASE_client_x509_cert_url,
    FIREBASE_universe_domain:process.env.FIREBASE_universe_domain,
  });
} else {
  credential = admin.credential.cert(
    JSON.parse(fs.readFileSync("serviceAccountKey.json", "utf8"))
  );
}

admin.initializeApp({ credential });

export const db = admin.firestore();
