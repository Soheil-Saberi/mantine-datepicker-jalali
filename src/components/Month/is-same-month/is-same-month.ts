export function isSameMonth(date: Date, comparison: Date, locale?: string) {
  return locale && locale === 'fa'
    ? parseInt(
        new Intl.DateTimeFormat('en-US-u-ca-persian', { year: 'numeric' }).format(date),
        10
      ) ===
        parseInt(
          new Intl.DateTimeFormat('en-US-u-ca-persian', { year: 'numeric' }).format(comparison),
          10
        ) &&
        parseInt(
          new Intl.DateTimeFormat('en-US-u-ca-persian', { month: 'numeric' }).format(date),
          10
        ) ===
          parseInt(
            new Intl.DateTimeFormat('en-US-u-ca-persian', { month: 'numeric' }).format(comparison),
            10
          )
    : date.getFullYear() === comparison.getFullYear() && date.getMonth() === comparison.getMonth();
}
