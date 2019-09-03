const { resolve } = require('path');
const fs = require('fs');

const firebase = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
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
