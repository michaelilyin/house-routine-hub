export interface VersionInfo {
  name: string;
  version: string;
  repo: string;
  dirty: boolean;
  hash: string;
  tag: string;
  commitsSinceLastTag: string;
  lastTag: string;
  time: Date;
}

export declare const version: VersionInfo;
