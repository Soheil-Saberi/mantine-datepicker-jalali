import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { generateDeclarations } from './generate-declarations';

// Paths for components that require props information extraction
const PATHS = [
  '../../src/components/JalaliCalendar/JalaliCalendar.tsx',
  '../../src/components/JalaliDateInput/JalaliDateInput.tsx',
  '../../src/components/JalaliDatePicker/JalaliDatePicker.tsx',
  '../../src/components/JalaliDatePickerInput/JalaliDatePickerInput.tsx',
  '../../src/components/JalaliDateTimePicker/JalaliDateTimePicker.tsx',
  '../../src/components/JalaliMonthPicker/JalaliMonthPicker.tsx',
  '../../src/components/JalaliMonthPickerInput/JalaliMonthPickerInput.tsx',
  '../../src/components/JalaliTimeInput/JalaliTimeInput.tsx',
  '../../src/components/JalaliYearPicker/JalaliYearPicker.tsx',
  '../../src/components/JalaliYearPickerInput/JalaliYearPickerInput.tsx',
].map((filePath) => path.join(dirname(fileURLToPath(import.meta.url)), filePath));

fs.writeJSONSync(
  path.join(dirname(fileURLToPath(import.meta.url)), '../../docs/docgen.json'),
  generateDeclarations(PATHS),
  {
    spaces: 2,
  }
);
