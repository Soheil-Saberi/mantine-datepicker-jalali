import React from 'react';
import { JalaliDay } from './JalaliDay';

export default { title: 'JalaliDay' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliDay date={new Date()} />
      <JalaliDay date={new Date()} weekend />
      <JalaliDay date={new Date()} outside />
      <JalaliDay date={new Date()} selected />
      <JalaliDay date={new Date()} selected weekend />
      <JalaliDay date={new Date()} selected outside />
      <JalaliDay date={new Date()} disabled />
      <JalaliDay date={new Date()} renderDay={(date) => date.getFullYear()} />
    </div>
  );
}

export function Static() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliDay date={new Date()} static />
      <JalaliDay date={new Date()} static weekend />
      <JalaliDay date={new Date()} static outside />
      <JalaliDay date={new Date()} static selected />
      <JalaliDay date={new Date()} static disabled />
      <JalaliDay date={new Date()} static firstInRange inRange selected />
      <JalaliDay date={new Date()} static inRange />
      <JalaliDay date={new Date()} static inRange />
      <JalaliDay date={new Date()} static inRange />
      <JalaliDay date={new Date()} static lastInRange inRange selected />
    </div>
  );
}

export function Range() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliDay date={new Date()} firstInRange inRange selected />
      <JalaliDay date={new Date()} inRange />
      <JalaliDay date={new Date()} inRange />
      <JalaliDay date={new Date()} inRange />
      <JalaliDay date={new Date()} lastInRange inRange selected />
    </div>
  );
}
