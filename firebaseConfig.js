import { createRequire } from "module";
const require = createRequire(import.meta.url);
const serviceAccount = require("./fcmServiceAccountkey.json");

import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const messaging = admin.messaging();
