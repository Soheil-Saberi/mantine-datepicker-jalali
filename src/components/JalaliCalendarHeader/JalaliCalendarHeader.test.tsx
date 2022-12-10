import React from 'react';
import { render, screen } from '@testing-library/react';
import { itSupportsHeaderProps, itSupportsWithNextPrevious } from '../../tests';
import { JalaliCalendarHeader, JalaliCalendarHeaderProps } from './JalaliCalendarHeader';

const defaultProps: JalaliCalendarHeaderProps = {
  nextLabel: 'next',
  previousLabel: 'prev',
  label: '',
};

describe('@mantine-datepicker-jalali/JalaliCalendarHeader', () => {
  itSupportsHeaderProps(JalaliCalendarHeader, defaultProps);
  itSupportsWithNextPrevious(JalaliCalendarHeader, defaultProps);

  it('renders given label', () => {
    render(<JalaliCalendarHeader {...defaultProps} label="test-label" />);
    expect(screen.getByText('test-label')).toBeInTheDocument();
  });

  it('supports levelControlAriaLabel', () => {
    render(
      <JalaliCalendarHeader
        {...defaultProps}
        label="test-label"
        levelControlAriaLabel="Change month"
      />
    );

    expect(screen.getByText('test-label')).toHaveAttribute('aria-label', 'Change month');
  });

  it('has correct default __staticSelector', () => {
    render(<JalaliCalendarHeader {...defaultProps} />);
    expect(screen.getByLabelText('next')).toHaveClass(
      'mantine-CalendarHeader-calendarHeaderControl'
    );
  });

  it('supports custom __staticSelector', () => {
    render(<JalaliCalendarHeader {...defaultProps} __staticSelector="Calendar" />);
    expect(screen.getByLabelText('next')).toHaveClass('mantine-Calendar-calendarHeaderControl');
  });

  it('supports styles api (styles)', () => {
    render(
      <JalaliCalendarHeader
        {...defaultProps}
        styles={{ calendarHeaderControl: { borderColor: '#CECECE' } }}
      />
    );

    expect(screen.getByLabelText('next')).toHaveStyle({ borderColor: '#CECECE' });
  });

  it('supports styles api (classNames)', () => {
    render(
      <JalaliCalendarHeader
        {...defaultProps}
        classNames={{ calendarHeaderControl: 'test-control' }}
      />
    );
    expect(screen.getByLabelText('next')).toHaveClass('test-control');
  });
});
