import * as functions from 'firebase-functions';

const path = `${process.cwd()}/dist/server`
console.info(path);

const server = require(path);
console.info(server)

export const ssr = functions.https.onRequest(server.app);
