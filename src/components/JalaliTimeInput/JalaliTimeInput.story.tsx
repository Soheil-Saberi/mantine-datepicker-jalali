import React from 'react';
import { JalaliTimeInput } from './JalaliTimeInput';

export default { title: 'JalaliTimeInput' };

export function Usage() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <JalaliTimeInput />
    </div>
  );
}

export function WithSeconds() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <JalaliTimeInput withSeconds />
    </div>
  );
}
