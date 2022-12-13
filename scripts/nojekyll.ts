import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

fs.writeFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), '../docs/out/.nojekyll'),
  ''
);
