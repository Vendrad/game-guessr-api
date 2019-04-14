import { getYearRange, getMaxYearRange } from './yearRange';

const yearRanges = [
  { id: 0, minYear: 1980, maxYear: 1989 },
  { id: 1, minYear: 1990, maxYear: 1999 },
  { id: 2, minYear: 2000, maxYear: 2009 },
  { id: 3, minYear: 2010, maxYear: 2019 },
];

describe('yearRange', () => {
  describe('.getYearRange', () => {
    it('should return [2000, 2009] when decade id is 2.', () => {
      expect(getYearRange(2, yearRanges)).toEqual([2000, 2009]);
    });

    it('should return [1990, 1999] when decade id is 1.', () => {
      expect(getYearRange(1, yearRanges)).toEqual([1990, 1999]);
    });

    it('should throw an error when id is not an int', () => {
      expect(() => {
        getYearRange(NaN, yearRanges);
      }).toThrowError('YearRangeId is not an int.');
      expect(() => {
        getYearRange(null, yearRanges);
      }).toThrowError('YearRangeId is not an int.');
      expect(() => {
        getYearRange(undefined, yearRanges);
      }).toThrowError('YearRangeId is not an int.');
      expect(() => {
        getYearRange('string', yearRanges);
      }).toThrowError('YearRangeId is not an int.');
    });

    it('should throw an error when id is an int/number out of range.', () => {
      expect(() => {
        getYearRange(5, yearRanges);
      }).toThrowError('YearRangeId does not match a year range.');
    });
  });

  describe('.getMaxYearRange', () => {
    it('should return [1980, 2019] when yearRanges have those years as min/max possibilities.', () => {
      expect(getMaxYearRange(yearRanges)).toEqual([1980, 2019]);
    });

    it('should still return [1980, 2019] even when yearRanges is out of order.', () => {
      const reorderedYearRanges = [
        { id: 2, minYear: 1990, maxYear: 1999 },
        { id: 0, minYear: 2010, maxYear: 2019 },
        { id: 1, minYear: 2000, maxYear: 2009 },
        { id: 3, minYear: 1980, maxYear: 1989 },
      ];
      expect(getMaxYearRange(reorderedYearRanges)).toEqual([1980, 2019]);
    });
  });
});
