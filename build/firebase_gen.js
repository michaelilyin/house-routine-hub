const { resolve } = require('path');
const fs = require('fs');

const firebase = {
  apiKey: process.env.FIREBASE_API_KEY || 'AIzaSyDKNUWbT1ciLI5onf7GjFJ1OS_pToKuJAQ',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'hdh-dev.firebaseapp.com',
  databaseURL: process.env.FIREBASE_DATABASE_URL || "https://hdh-dev.firebaseio.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "hdh-dev",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "1092755768393",
  appId: process.env.FIREBASE_APP_ID || "1:1092755768393:web:3425a39171c129ef"
};

const json = JSON.stringify(firebase, null, 2);
const generated = resolve('generated');
const file = resolve(generated, 'firebase.ts');
const lines = [
  '/* IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN! */',
  '/* tslint:disable */',
  `export const firebase = ${json};`,
  '/* tslint:enable */',
];

if (!fs.existsSync(generated)) {
  fs.mkdirSync(generated);
}

fs.writeFileSync(file, lines.join('\n'), {encoding: 'utf-8'});
