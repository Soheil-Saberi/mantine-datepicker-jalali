import path from 'path';
import fs from 'fs-extra';
import { generateDeclarations } from './generate-declarations';

// Paths for components that require props information extraction
const PATHS = [
  '../../src/components/Calendar/Calendar.tsx',
  '../../src/components/DateInput/DateInput.tsx',
  '../../src/components/DatePicker/DatePicker.tsx',
  '../../src/components/DatePickerInput/DatePickerInput.tsx',
  '../../src/components/DateTimePicker/DateTimePicker.tsx',
  '../../src/components/MonthPicker/MonthPicker.tsx',
  '../../src/components/MonthPickerInput/MonthPickerInput.tsx',
  '../../src/components/TimeInput/TimeInput.tsx',
  '../../src/components/YearPicker/YearPicker.tsx',
  '../../src/components/YearPickerInput/YearPickerInput.tsx',
].map((filePath) => path.join(__dirname, filePath));

fs.writeJSONSync(path.join(__dirname, '../../docs/docgen.json'), generateDeclarations(PATHS), {
  spaces: 2,
});
