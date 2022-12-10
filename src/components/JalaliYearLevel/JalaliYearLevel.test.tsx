import 'dayjs/locale/ru';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { JalaliYearLevel, JalaliYearLevelProps } from './JalaliYearLevel';
import {
  itSupportsHeaderProps,
  itSupportsWithNextPrevious,
  itSupportsMonthsListProps,
  itSupportsOnControlKeydown,
  itSupportsGetControlRef,
  itSupportsOnControlClick,
  itSupportsOnControlMouseEnter,
} from '../../tests';

function expectLabel(label: string) {
  expect(screen.getByLabelText('level-control')).toHaveTextContent(label);
}

const defaultProps: JalaliYearLevelProps = {
  year: new Date(2022, 3, 11),
  levelControlAriaLabel: 'level-control',
  nextLabel: 'next',
  previousLabel: 'prev',
};

describe('@mantine-datepicker-jalali/JalaliYearLevel', () => {
  itSupportsHeaderProps(JalaliYearLevel, defaultProps);
  itSupportsWithNextPrevious(JalaliYearLevel, defaultProps);
  itSupportsMonthsListProps(JalaliYearLevel, defaultProps);
  itSupportsOnControlKeydown(JalaliYearLevel, defaultProps);
  itSupportsGetControlRef(JalaliYearLevel, 12, defaultProps);
  itSupportsOnControlClick(JalaliYearLevel, defaultProps);
  itSupportsOnControlMouseEnter(JalaliYearLevel, defaultProps);

  it('renders correct CalendarHeader label', () => {
    render(<JalaliYearLevel {...defaultProps} />);
    expectLabel('2022');
  });

  it('supports changing year label format', () => {
    render(<JalaliYearLevel {...defaultProps} yearLabelFormat="MM/YY" />);
    expectLabel('04/22');
  });

  it('supports changing year label with callback', () => {
    render(
      <JalaliYearLevel
        {...defaultProps}
        yearLabelFormat={(date) => `${date.getMonth()}/${date.getFullYear()}`}
      />
    );

    expectLabel('3/2022');
  });

  it('has correct default __staticSelector', () => {
    const { container } = render(<JalaliYearLevel {...defaultProps} />);
    expect(container.firstChild).toHaveClass('mantine-YearLevel-yearLevel');
    expect(container.querySelector('table td button')).toHaveClass(
      'mantine-YearLevel-pickerControl'
    );
    expect(screen.getByLabelText('level-control')).toHaveClass(
      'mantine-YearLevel-calendarHeaderLevel'
    );
  });

  it('supports custom __staticSelector', () => {
    const { container } = render(<JalaliYearLevel {...defaultProps} __staticSelector="Calendar" />);
    expect(container.firstChild).toHaveClass('mantine-Calendar-yearLevel');
    expect(container.querySelector('table td button')).toHaveClass(
      'mantine-Calendar-pickerControl'
    );
    expect(screen.getByLabelText('level-control')).toHaveClass(
      'mantine-Calendar-calendarHeaderLevel'
    );
  });

  it('supports styles api (styles)', () => {
    const { container } = render(
      <JalaliYearLevel
        {...defaultProps}
        styles={{
          yearLevel: { borderColor: '#343436' },
          pickerControl: { borderColor: '#232324' },
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
      <JalaliYearLevel
        {...defaultProps}
        classNames={{
          yearLevel: 'test-year-level',
          pickerControl: 'test-picker-control',
          calendarHeaderLevel: 'test-level',
        }}
      />
    );

    expect(container.firstChild).toHaveClass('test-year-level');
    expect(container.querySelector('table td button')).toHaveClass('test-picker-control');
    expect(screen.getByLabelText('level-control')).toHaveClass('test-level');
  });

  it('disables next control if maxDate is before end of month', () => {
    render(<JalaliYearLevel {...defaultProps} maxDate={new Date(2022, 3, 11)} />);
    expect(screen.getByLabelText('next')).toBeDisabled();
  });

  it('disables previous control if minDate is after start of month', () => {
    render(<JalaliYearLevel {...defaultProps} minDate={new Date(2022, 3, 11)} />);
    expect(screen.getByLabelText('prev')).toBeDisabled();
  });
});
