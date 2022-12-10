import React from 'react';
import { render } from '@testing-library/react';
import {
  itSupportsMonthProps,
  itSupportsGetDayRef,
  itSupportsOnDayKeydown,
  itSupportsOnDayClick,
} from '../../tests';
import { JalaliMonth, JalaliMonthProps } from './JalaliMonth';

const defaultProps: JalaliMonthProps = {
  month: new Date(2022, 3, 2),
};

describe('@mantine-datepicker-jalali/JalaliMonth', () => {
  itSupportsMonthProps(JalaliMonth, defaultProps);
  itSupportsGetDayRef(JalaliMonth, defaultProps);
  itSupportsOnDayKeydown(JalaliMonth, defaultProps);
  itSupportsOnDayClick(JalaliMonth, defaultProps);

  it('has correct default __staticSelector', () => {
    const { container } = render(<JalaliMonth {...defaultProps} />);
    expect(container.querySelector('table')).toHaveClass('mantine-Month-month');
    expect(container.querySelector('thead tr')).toHaveClass('mantine-Month-weekdaysRow');
    expect(container.querySelector('tbody tr td button')).toHaveClass('mantine-Month-day');
  });

  it('supports __staticSelector', () => {
    const { container } = render(<JalaliMonth {...defaultProps} __staticSelector="Calendar" />);
    expect(container.querySelector('table')).toHaveClass('mantine-Calendar-month');
    expect(container.querySelector('thead tr')).toHaveClass('mantine-Calendar-weekdaysRow');
    expect(container.querySelector('tbody tr td button')).toHaveClass('mantine-Calendar-day');
  });

  it('supports styles api (styles)', () => {
    const { container } = render(
      <JalaliMonth
        {...defaultProps}
        styles={{
          day: { borderColor: '#CECECE' },
          month: { borderColor: '#EFC65E' },
          weekdaysRow: { borderColor: '#FF4534' },
        }}
      />
    );
    expect(container.querySelector('table')).toHaveStyle({ borderColor: '#EFC65E' });
    expect(container.querySelector('thead tr')).toHaveStyle({ borderColor: '#FF4534' });
    expect(container.querySelector('tbody tr td button')).toHaveStyle({ borderColor: '#CECECE' });
  });

  it('supports styles api (classNames)', () => {
    const { container } = render(
      <JalaliMonth
        {...defaultProps}
        classNames={{
          day: 'test-day',
          month: 'test-month',
          weekdaysRow: 'test-weekdays',
        }}
      />
    );
    expect(container.querySelector('table')).toHaveClass('test-month');
    expect(container.querySelector('thead tr')).toHaveClass('test-weekdays');
    expect(container.querySelector('tbody tr td button')).toHaveClass('test-day');
  });

  it('supports static prop', () => {
    const { container, rerender } = render(<JalaliMonth {...defaultProps} />);
    expect((container.querySelector('td').firstChild as HTMLElement).tagName).toBe('BUTTON');

    rerender(<JalaliMonth {...defaultProps} static />);
    expect((container.querySelector('td').firstChild as HTMLElement).tagName).toBe('DIV');
  });
});
