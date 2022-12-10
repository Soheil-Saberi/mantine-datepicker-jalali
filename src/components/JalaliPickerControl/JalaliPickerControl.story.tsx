import React from 'react';
import { JalaliPickerControl } from './JalaliPickerControl';

export default { title: 'JalaliPickerControl' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliPickerControl>March</JalaliPickerControl>
      <JalaliPickerControl disabled>March</JalaliPickerControl>
      <JalaliPickerControl selected>March</JalaliPickerControl>
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliPickerControl unstyled>March</JalaliPickerControl>
    </div>
  );
}

export function Range() {
  return (
    <div style={{ padding: 40, display: 'flex' }}>
      <JalaliPickerControl firstInRange inRange selected>
        March
      </JalaliPickerControl>
      <JalaliPickerControl inRange>April</JalaliPickerControl>
      <JalaliPickerControl inRange>May</JalaliPickerControl>
      <JalaliPickerControl lastInRange inRange selected>
        June
      </JalaliPickerControl>
    </div>
  );
}
