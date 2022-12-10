import { DayOfWeek } from '../../../types';
import { getStartOfWeek } from '../get-start-of-week/get-start-of-week';
import { getEndOfWeek } from '../get-end-of-week/get-end-of-week';

export function getMonthDays(
  month: Date,
  firstDayOfWeek: DayOfWeek = 1,
  locale?: string
): Date[][] {
  const startOfMonthJalali: any = (date: any) => {
    const dayDateJalali = parseInt(
      new Intl.DateTimeFormat('en-US-u-ca-persian', { day: 'numeric' }).format(date),
      10
    );
    const d = dayDateJalali - 1;
    return date.setDate(date.getDate() - d);
  };

  const endOfMonthJalali: any = (date: any) => {
    const daysMonthJalali = [0, 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    const dayDateJalali = parseInt(
      new Intl.DateTimeFormat('en-US-u-ca-persian', { day: 'numeric' }).format(date),
      10
    );

    const monthDateJalali = parseInt(
      new Intl.DateTimeFormat('en-US-u-ca-persian', {
        month: 'numeric',
      }).format(date),
      10
    );
    const d = daysMonthJalali[monthDateJalali] - dayDateJalali;
    return date.setDate(date.getDate() + d);
  };

  const currentMonth = month.getMonth();
  const startOfMonth =
    locale && locale === 'fa'
      ? startOfMonthJalali(month)
      : new Date(month.getFullYear(), currentMonth, 1);
  const endOfMonth =
    locale && locale === 'fa'
      ? endOfMonthJalali(month)
      : new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const endDate = getEndOfWeek(endOfMonth, firstDayOfWeek);
  const date = getStartOfWeek(startOfMonth, firstDayOfWeek);
  const weeks: Date[][] = [];

  while (date <= endDate) {
    const days: Date[] = [];

    for (let i = 0; i < 7; i += 1) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    weeks.push(days);
  }

  return weeks;
}
