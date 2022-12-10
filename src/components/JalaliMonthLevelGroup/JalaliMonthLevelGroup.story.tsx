import React from 'react';
import { JalaliMonthLevelGroup } from './JalaliMonthLevelGroup';

export default { title: 'MonthLevelGroup' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <div>1 month</div>
      <JalaliMonthLevelGroup month={new Date(2022, 3, 11)} mb={50} mt="xs" />

      <div>2 months</div>
      <JalaliMonthLevelGroup numberOfColumns={2} month={new Date(2022, 3, 11)} mb={50} mt="xs" />

      <div>3 months</div>
      <JalaliMonthLevelGroup numberOfColumns={3} month={new Date(2022, 3, 11)} mb={50} mt="xs" />
    </div>
  );
}
