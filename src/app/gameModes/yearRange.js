export function getYearRange(yearRangeId, yearRanges) {

  if (isNaN(yearRangeId) || yearRangeId === null) throw new Error('YearRangeId is not an int.');

  const yearRange = yearRanges.find(yearRange => yearRange.id == yearRangeId);

  if (yearRange === undefined) throw new Error('YearRangeId does not match a year range.');

  return [yearRange.minYear, yearRange.maxYear];

}

export function getMaxYearRange(yearRanges) {

  const minYearRange = yearRanges.reduce((p, c) => p.minYear < c.minYear ? p : c);
  const maxYearRange = yearRanges.reduce((p, c) => p.maxYear > c.maxYear ? p : c);

  return [minYearRange.minYear, maxYearRange.maxYear];

}