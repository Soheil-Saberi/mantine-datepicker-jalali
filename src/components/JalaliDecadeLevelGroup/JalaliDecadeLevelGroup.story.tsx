import React from 'react';
import { JalaliDecadeLevelGroup } from './JalaliDecadeLevelGroup';

export default { title: 'DecadeLevelGroup' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <div>1 column</div>
      <JalaliDecadeLevelGroup decade={new Date(2022, 3, 11)} mb={50} mt="xs" />

      <div>2 columns</div>
      <JalaliDecadeLevelGroup numberOfColumns={2} decade={new Date(2022, 3, 11)} mb={50} mt="xs" />

      <div>3 columns</div>
      <JalaliDecadeLevelGroup numberOfColumns={3} decade={new Date(2022, 3, 11)} mb={50} mt="xs" />
    </div>
  );
}
