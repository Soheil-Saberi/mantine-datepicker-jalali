import React, { useState } from 'react';
import { MantineDemo } from '@mantine/ds';
import { Stack, Text } from '@mantine/core';
import { DatesRangeValue, DateValue, JalaliMonthPicker } from 'mantine-datepicker-jalali/src';

const code = `
import { useState } from 'react';
import { Stack, Text } from '@mantine/core';
import { DatesRangeValue, DateValue, MonthPicker } from 'mantine-dates-6';

function Demo() {
  const [singleValue, setSingleValue] = useState<DateValue>(null);
  const [multipleDates, setMultipleDates] = useState<Date[]>([]);
  const [rangeValue, setRangeValue] = useState<DatesRangeValue>([null, null]);

  return (
    <Stack>
      <div>
        <Text mb="sm">
          Pick one value, current value:{' '}
          <b>{singleValue ? \`\${singleValue.getMonth()}/\${singleValue.getFullYear()}\` : 'null'}</b>
        </Text>
        <MonthPicker value={singleValue} onChange={setSingleValue} />
      </div>

      <div>
        <Text mb="sm">
          Pick multiple values, current value:{' '}
          <b>
            {multipleDates.length > 0
              ? multipleDates.map((item) => \`\${item.getMonth()}/\${item.getFullYear()}\`).join(', ')
              : 'empty array'}
          </b>
        </Text>
        <MonthPicker type="multiple" value={multipleDates} onChange={setMultipleDates} />
      </div>

      <div>
        <Text mb="sm">
          Pick range, current value:{' '}
          <b>
            {rangeValue.filter((i) => i).length > 0
              ? rangeValue
                  .filter((i) => i)
                  .map((item) => \`\${item?.getMonth()}/\${item?.getFullYear()}\`)
                  .join(' – ')
              : 'empty array'}
          </b>
        </Text>
        <MonthPicker type="range" value={rangeValue} onChange={setRangeValue} />
      </div>
    </Stack>
  );
}
`;

function Demo() {
  const [singleValue, setSingleValue] = useState<DateValue>(null);
  const [multipleDates, setMultipleDates] = useState<Date[]>([]);
  const [rangeValue, setRangeValue] = useState<DatesRangeValue>([null, null]);

  return (
    <Stack>
      <div>
        <Text mb="sm">
          Pick one value, current value:{' '}
          <b>{singleValue ? `${singleValue.getMonth()}/${singleValue.getFullYear()}` : 'null'}</b>
        </Text>
        <JalaliMonthPicker value={singleValue} onChange={setSingleValue} />
      </div>

      <div>
        <Text mb="sm">
          Pick multiple values, current value:{' '}
          <b>
            {multipleDates.length > 0
              ? multipleDates.map((item) => `${item.getMonth()}/${item.getFullYear()}`).join(', ')
              : 'empty array'}
          </b>
        </Text>
        <JalaliMonthPicker type="multiple" value={multipleDates} onChange={setMultipleDates} />
      </div>

      <div>
        <Text mb="sm">
          Pick range, current value:{' '}
          <b>
            {rangeValue.filter((i) => i).length > 0
              ? rangeValue
                  .filter((i) => i)
                  .map((item) => `${item?.getMonth()}/${item?.getFullYear()}`)
                  .join(' – ')
              : 'empty array'}
          </b>
        </Text>
        <JalaliMonthPicker type="range" value={rangeValue} onChange={setRangeValue} />
      </div>
    </Stack>
  );
}

export const usage: MantineDemo = {
  type: 'demo',
  component: Demo,
  code,
};
