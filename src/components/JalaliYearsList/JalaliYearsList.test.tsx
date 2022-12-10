import 'dayjs/locale/ru';
import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  itSupportsGetControlRef,
  itSupportsYearsListProps,
  itSupportsOnControlKeydown,
  itSupportsOnControlClick,
  itSupportsOnControlMouseEnter,
} from '../../tests';
import { JalaliYearsList, JalaliYearsListProps } from './JalaliYearsList';

const defaultProps: JalaliYearsListProps = {
  decade: new Date(2022, 3, 11),
};

describe('@mantine-datepicker-jalali/JalaliYearsList', () => {
  itSupportsGetControlRef(JalaliYearsList, 10, defaultProps);
  itSupportsYearsListProps(JalaliYearsList, defaultProps);
  itSupportsOnControlKeydown(JalaliYearsList, defaultProps);
  itSupportsOnControlClick(JalaliYearsList, defaultProps);
  itSupportsOnControlMouseEnter(JalaliYearsList, defaultProps);

  it('has correct default __staticSelector', () => {
    render(<JalaliYearsList {...defaultProps} />);
    expect(screen.getByRole('table')).toHaveClass('mantine-YearsList-yearsList');
    expect(screen.getAllByRole('button')[0]).toHaveClass('mantine-YearsList-pickerControl');
  });

  it('supports custom __staticSelector', () => {
    render(<JalaliYearsList {...defaultProps} __staticSelector="Calendar" />);
    expect(screen.getByRole('table')).toHaveClass('mantine-Calendar-yearsList');
    expect(screen.getAllByRole('button')[0]).toHaveClass('mantine-Calendar-pickerControl');
  });

  it('supports styles api (styles)', () => {
    render(
      <JalaliYearsList
        {...defaultProps}
        styles={{
          yearsList: { borderColor: '#331156' },
          pickerControl: { borderColor: '#123123' },
        }}
      />
    );

    expect(screen.getByRole('table')).toHaveStyle({ borderColor: '#331156' });
    expect(screen.getAllByRole('button')[0]).toHaveStyle({ borderColor: '#123123' });
  });

  it('supports styles api (classNames)', () => {
    render(
      <JalaliYearsList
        {...defaultProps}
        classNames={{ yearsList: 'test-years-list', pickerControl: 'test-control' }}
      />
    );
    expect(screen.getByRole('table')).toHaveClass('test-years-list');
    expect(screen.getAllByRole('button')[0]).toHaveClass('test-control');
  });
});
