import 'dayjs/locale/ru';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { JalaliDecadeLevel, JalaliDecadeLevelProps } from './JalaliDecadeLevel';
import {
  itSupportsHeaderProps,
  itSupportsWithNextPrevious,
  itSupportsYearsListProps,
  itSupportsGetControlRef,
  itSupportsOnControlKeydown,
  itSupportsOnControlClick,
  itSupportsOnControlMouseEnter,
} from '../../tests';

function expectLabel(label: string) {
  expect(screen.getByLabelText('level-control')).toHaveTextContent(label);
}

const defaultProps: JalaliDecadeLevelProps = {
  decade: new Date(2022, 3, 11),
  levelControlAriaLabel: 'level-control',
  nextLabel: 'next',
  previousLabel: 'prev',
};

describe('@mantine-datepicker-jalali/JalaliDecadeLevel', () => {
  itSupportsHeaderProps(JalaliDecadeLevel, defaultProps);
  itSupportsWithNextPrevious(JalaliDecadeLevel, defaultProps);
  itSupportsYearsListProps(JalaliDecadeLevel, defaultProps);
  itSupportsGetControlRef(JalaliDecadeLevel, 10, defaultProps);
  itSupportsOnControlKeydown(JalaliDecadeLevel, defaultProps);
  itSupportsOnControlClick(JalaliDecadeLevel, defaultProps);
  itSupportsOnControlMouseEnter(JalaliDecadeLevel, defaultProps);

  it('renders correct CalendarHeader label', () => {
    render(<JalaliDecadeLevel {...defaultProps} />);
    expectLabel('2020 – 2029');
  });

  it('supports changing decade label format', () => {
    render(<JalaliDecadeLevel {...defaultProps} decadeLabelFormat="MM/YY" />);
    expectLabel('01/20 – 01/29');
  });

  it('supports changing decade label with callback', () => {
    render(
      <JalaliDecadeLevel
        {...defaultProps}
        decadeLabelFormat={(startOfDecade, endOfDecade) =>
          `${startOfDecade.getMonth()}/${startOfDecade.getFullYear()} – ${endOfDecade.getMonth()}/${endOfDecade.getFullYear()}`
        }
      />
    );

    expectLabel('0/2020 – 0/2029');
  });

  it('has correct default __staticSelector', () => {
    const { container } = render(<JalaliDecadeLevel {...defaultProps} />);
    expect(container.firstChild).toHaveClass('mantine-DecadeLevel-decadeLevel');
    expect(container.querySelector('table td button')).toHaveClass(
      'mantine-DecadeLevel-pickerControl'
    );
    expect(screen.getByLabelText('level-control')).toHaveClass(
      'mantine-DecadeLevel-calendarHeaderLevel'
    );
  });

  it('supports custom __staticSelector', () => {
    const { container } = render(
      <JalaliDecadeLevel {...defaultProps} __staticSelector="Calendar" />
    );
    expect(container.firstChild).toHaveClass('mantine-Calendar-decadeLevel');
    expect(container.querySelector('table td button')).toHaveClass(
      'mantine-Calendar-pickerControl'
    );
    expect(screen.getByLabelText('level-control')).toHaveClass(
      'mantine-Calendar-calendarHeaderLevel'
    );
  });

  it('supports styles api (styles)', () => {
    const { container } = render(
      <JalaliDecadeLevel
        {...defaultProps}
        styles={{
          decadeLevel: { borderColor: '#343436' },
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
      <JalaliDecadeLevel
        {...defaultProps}
        classNames={{
          decadeLevel: 'test-decade-level',
          pickerControl: 'test-picker-control',
          calendarHeaderLevel: 'test-level',
        }}
      />
    );

    expect(container.firstChild).toHaveClass('test-decade-level');
    expect(container.querySelector('table td button')).toHaveClass('test-picker-control');
    expect(screen.getByLabelText('level-control')).toHaveClass('test-level');
  });

  it('disables next control if maxDate is before end of month', () => {
    render(<JalaliDecadeLevel {...defaultProps} maxDate={new Date(2022, 3, 11)} />);
    expect(screen.getByLabelText('next')).toBeDisabled();
  });

  it('disables previous control if minDate is after start of month', () => {
    render(<JalaliDecadeLevel {...defaultProps} minDate={new Date(2022, 3, 11)} />);
    expect(screen.getByLabelText('prev')).toBeDisabled();
  });
});
