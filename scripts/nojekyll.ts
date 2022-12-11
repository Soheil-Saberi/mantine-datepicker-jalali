import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

fs.writeFileSync(path.join(dirname(fileURLToPath(import.meta.url)), '../docs/out/.nojekyll'), '');
