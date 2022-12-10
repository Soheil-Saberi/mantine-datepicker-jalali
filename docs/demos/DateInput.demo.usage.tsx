import React from 'react';
import { MantineDemo } from '@mantine/ds';
// import { DateInput } from 'mantine-dates-6';
// import { JalaliDateInput } from 'mantine-dates-6';
import { JalaliDateInput } from '../../src/components/JalaliDateInput';

const code = `
import { DateInput } from 'mantine-dates-6';

function Demo() {
  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <DateInput placeholder="Free date input" />
    </div>
  );
}
`;

function Demo() {
  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <JalaliDateInput placeholder="Free date input" popoverProps={{ withinPortal: true }} />
    </div>
  );
}

export const usage: MantineDemo = {
  type: 'demo',
  component: Demo,
  code,
};
