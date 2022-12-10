import React from 'react';
import { JalaliYearLevelGroup } from './JalaliYearLevelGroup';

export default { title: 'YearLevelGroup' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <div>1 column</div>
      <JalaliYearLevelGroup year={new Date(2022, 3, 11)} mb={50} mt="xs" />

      <div>2 columns</div>
      <JalaliYearLevelGroup numberOfColumns={2} year={new Date(2022, 3, 11)} mb={50} mt="xs" />

      <div>3 columns</div>
      <JalaliYearLevelGroup numberOfColumns={3} year={new Date(2022, 3, 11)} mb={50} mt="xs" />
    </div>
  );
}
