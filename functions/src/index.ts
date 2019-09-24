import * as functions from 'firebase-functions';

const path = `${process.cwd()}/dist/server`;

const server = require(path);

export const ssr = functions.https.onRequest((req, resp) => {
  return server.app(req, resp);
});
