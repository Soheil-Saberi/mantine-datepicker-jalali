import fs from 'fs-extra';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import pkg from '../package.json';
import { getNextVersion } from './get-next-version';

export function updateVersion(config: { type: string; stage?: string }) {
  const nextVersion = getNextVersion(pkg.version, config);
  pkg.version = nextVersion;
  fs.writeJsonSync(path.join(dirname(fileURLToPath(import.meta.url)), '../package.json'), pkg, {
    spaces: 2,
  });
  return pkg;
}
