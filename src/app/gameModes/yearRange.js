/**
 * Pulls a specific yearRange out of an array using the yearRange ID
 */
export function getYearRange(yearRangeId, yearRanges) {
  if (!Number.isInteger(yearRangeId)) throw new Error('YearRangeId is not an int.');

  const yearRange = yearRanges.find(range => range.id === yearRangeId);

  if (yearRange === undefined) throw new Error('YearRangeId does not match a year range.');

  return [yearRange.minYear, yearRange.maxYear];
}

/**
 * Get the year lower and upper bounds for a given set of yearRanges
 *
 * Uses reduce to find the lowest and highest years in each year range
 *
 * @param {Array<yearRange>} yearRanges
 * @return {Array} [year, year]
 */
export function getMaxYearRange(yearRanges) {
  const lowYR = yearRanges.reduce((prev, curr) => (prev.minYear < curr.minYear ? prev : curr));
  const highYR = yearRanges.reduce((prev, curr) => (prev.maxYear > curr.maxYear ? prev : curr));

  return [lowYR.minYear, highYR.maxYear];
}
