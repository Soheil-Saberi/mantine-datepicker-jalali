import React from 'react';
import { MantineDemo } from '@mantine/ds';
import { DateTimePicker } from 'mantine-dates-6';

const code = `
import { DateTimePicker } from 'mantine-dates-6';

function Demo() {
  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <DateTimePicker placeholder="Pick date and time" />
    </div>
  );
}
`;

function Demo() {
  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <DateTimePicker placeholder="Pick date and time" popoverProps={{ withinPortal: true }} />
    </div>
  );
}

export const usage: MantineDemo = {
  type: 'demo',
  component: Demo,
  code,
};
