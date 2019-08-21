const getGitInfo = require('git-repo-info');
const {gitDescribeSync} = require('git-describe');
const pack = require('./package.json');
const {resolve} = require('path');
const {writeFileSync} = require('fs-extra');

const git = getGitInfo();
const gitDescribe = gitDescribeSync({
  dirtyMark: false,
  dirtySemver: false
});

const versionInfo = {
  version: pack.version,
  name: pack.name,
  hash: git.abbreviatedSha,
  repo: process.env.npm_package_repository_url.substr(4, process.env.npm_package_repository_url.length - 8),
  tag: git.tag,
  lastTag: git.lastTag,
  commitsSinceLastTag: isFinite(git.commitsSinceLastTag) ? git.commitsSinceLastTag : undefined,
  dirty: gitDescribe.dirty,
  time: new Date()
};

const json = JSON.stringify(versionInfo, null, 2);
const file = resolve(__dirname, 'generated/version.ts');
const lines = [
  '/* IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN! */',
  '/* tslint:disable */',
  `export const version = ${json};`,
  '/* tslint:enable */',
];
writeFileSync(file, lines.join('\n'), {encoding: 'utf-8'});

console.info('versionInfo =', json);
