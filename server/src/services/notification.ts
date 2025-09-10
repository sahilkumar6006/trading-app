import admin from "firebase-admin";

const serviceAccount = require("../../firebase-admin-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();

export { messaging };
