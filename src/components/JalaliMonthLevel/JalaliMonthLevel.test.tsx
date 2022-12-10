import 'dayjs/locale/ru';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { JalaliMonthLevel, JalaliMonthLevelProps } from './JalaliMonthLevel';
import {
  itSupportsMonthProps,
  itSupportsHeaderProps,
  itSupportsGetDayRef,
  itSupportsWithNextPrevious,
  itSupportsOnDayKeydown,
  itSupportsOnDayClick,
} from '../../tests';

function expectLabel(label: string) {
  expect(screen.getByLabelText('level-control')).toHaveTextContent(label);
}

const defaultProps: JalaliMonthLevelProps = {
  month: new Date(2022, 3, 11),
  levelControlAriaLabel: 'level-control',
  nextLabel: 'next',
  previousLabel: 'prev',
};

describe('@mantine-datepicker-jalali/JalaliMonthLevel', () => {
  itSupportsHeaderProps(JalaliMonthLevel, defaultProps);
  itSupportsMonthProps(JalaliMonthLevel, defaultProps);
  itSupportsGetDayRef(JalaliMonthLevel, defaultProps);
  itSupportsWithNextPrevious(JalaliMonthLevel, defaultProps);
  itSupportsOnDayKeydown(JalaliMonthLevel, defaultProps);
  itSupportsOnDayClick(JalaliMonthLevel, defaultProps);

  it('renders correct CalendarHeader label', () => {
    render(<JalaliMonthLevel {...defaultProps} />);
    expectLabel('April 2022');
  });

  it('supports changing month label format', () => {
    render(<JalaliMonthLevel {...defaultProps} monthLabelFormat="MM/YY" />);
    expectLabel('04/22');
  });

  it('supports changing month label with callback', () => {
    render(
      <JalaliMonthLevel
        {...defaultProps}
        monthLabelFormat={(date) => `${date.getMonth()}/${date.getFullYear()}`}
      />
    );

    expectLabel('3/2022');
  });

  it('has correct default __staticSelector', () => {
    const { container } = render(<JalaliMonthLevel {...defaultProps} />);
    expect(container.firstChild).toHaveClass('mantine-MonthLevel-monthLevel');
    expect(container.querySelector('table td button')).toHaveClass('mantine-MonthLevel-day');
    expect(screen.getByLabelText('level-control')).toHaveClass(
      'mantine-MonthLevel-calendarHeaderLevel'
    );
  });

  it('supports custom __staticSelector', () => {
    const { container } = render(
      <JalaliMonthLevel {...defaultProps} __staticSelector="Calendar" />
    );
    expect(container.firstChild).toHaveClass('mantine-Calendar-monthLevel');
    expect(container.querySelector('table td button')).toHaveClass('mantine-Calendar-day');
    expect(screen.getByLabelText('level-control')).toHaveClass(
      'mantine-Calendar-calendarHeaderLevel'
    );
  });

  it('supports styles api (styles)', () => {
    const { container } = render(
      <JalaliMonthLevel
        {...defaultProps}
        styles={{
          monthLevel: { borderColor: '#343436' },
          day: { borderColor: '#232324' },
          calendarHeaderLevel: { borderColor: '#121214' },
        }}
      />
    );

    expect(container.firstChild).toHaveStyle({ borderColor: '#343436' });
    expect(container.querySelector('table td button')).toHaveStyle({ borderColor: '#232324' });
    expect(screen.getByLabelText('level-control')).toHaveStyle({ borderColor: '#121214' });
  });

  it('supports styles api (classNames)', () => {
    const { container } = render(
      <JalaliMonthLevel
        {...defaultProps}
        classNames={{
          monthLevel: 'test-month-level',
          day: 'test-day',
          calendarHeaderLevel: 'test-level',
        }}
      />
    );

    expect(container.firstChild).toHaveClass('test-month-level');
    expect(container.querySelector('table td button')).toHaveClass('test-day');
    expect(screen.getByLabelText('level-control')).toHaveClass('test-level');
  });

  it('disables next control if maxDate is before end of month', () => {
    render(<JalaliMonthLevel {...defaultProps} maxDate={new Date(2022, 3, 11)} />);
    expect(screen.getByLabelText('next')).toBeDisabled();
  });

  it('disables previous control if minDate is after start of month', () => {
    render(<JalaliMonthLevel {...defaultProps} minDate={new Date(2022, 3, 11)} />);
    expect(screen.getByLabelText('prev')).toBeDisabled();
  });
});
