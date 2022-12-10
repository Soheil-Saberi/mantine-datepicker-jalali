import 'dayjs/locale/ru';
import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  itSupportsGetControlRef,
  itSupportsMonthsListProps,
  itSupportsOnControlKeydown,
  itSupportsOnControlClick,
  itSupportsOnControlMouseEnter,
} from '../../tests';
import { JalaliMonthsList, JalaliMonthsListProps } from './JalaliMonthsList';

const defaultProps: JalaliMonthsListProps = {
  year: new Date(2022, 3, 11),
};

describe('@mantine-datepicker-jalali/JalaliMonthsList', () => {
  itSupportsGetControlRef(JalaliMonthsList, 12, defaultProps);
  itSupportsMonthsListProps(JalaliMonthsList, defaultProps);
  itSupportsOnControlKeydown(JalaliMonthsList, defaultProps);
  itSupportsOnControlClick(JalaliMonthsList, defaultProps);
  itSupportsOnControlMouseEnter(JalaliMonthsList, defaultProps);

  it('has correct default __staticSelector', () => {
    render(<JalaliMonthsList {...defaultProps} />);
    expect(screen.getByRole('table')).toHaveClass('mantine-MonthsList-monthsList');
    expect(screen.getAllByRole('button')[0]).toHaveClass('mantine-MonthsList-pickerControl');
  });

  it('supports custom __staticSelector', () => {
    render(<JalaliMonthsList {...defaultProps} __staticSelector="Calendar" />);
    expect(screen.getByRole('table')).toHaveClass('mantine-Calendar-monthsList');
    expect(screen.getAllByRole('button')[0]).toHaveClass('mantine-Calendar-pickerControl');
  });

  it('supports styles api (styles)', () => {
    render(
      <JalaliMonthsList
        {...defaultProps}
        styles={{
          monthsList: { borderColor: '#331156' },
          pickerControl: { borderColor: '#123123' },
        }}
      />
    );

    expect(screen.getByRole('table')).toHaveStyle({ borderColor: '#331156' });
    expect(screen.getAllByRole('button')[0]).toHaveStyle({ borderColor: '#123123' });
  });

  it('supports styles api (classNames)', () => {
    render(
      <JalaliMonthsList
        {...defaultProps}
        classNames={{ monthsList: 'test-months-list', pickerControl: 'test-control' }}
      />
    );
    expect(screen.getByRole('table')).toHaveClass('test-months-list');
    expect(screen.getAllByRole('button')[0]).toHaveClass('test-control');
  });
});
