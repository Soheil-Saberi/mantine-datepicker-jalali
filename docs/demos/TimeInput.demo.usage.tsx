import React from 'react';
import { MantineDemo } from '@mantine/ds';
import { JalaliTimeInput } from 'mantine-datepicker-jalali/src';

const code = `
import { TimeInput } from 'mantine-dates-6';

function Demo() {
  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <TimeInput label="Pick time" withSeconds />
    </div>
  );
}
`;

function Demo() {
  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <JalaliTimeInput label="Pick time" withSeconds />
    </div>
  );
}

export const usage: MantineDemo = {
  type: 'demo',
  component: Demo,
  code,
};
