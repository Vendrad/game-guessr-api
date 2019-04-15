import * as Helpers from '.';

describe('Helpers : truncateString()', () => {
  it('should return the given string if the truncation length is long enough.', () => {
    expect(Helpers.truncateString('test string', 500)).toEqual('test string');
  });

  it('should return a truncated version with ellipses if truncation length is lower than the string.', () => {
    expect(Helpers.truncateString('test string', 1)).toEqual('t...');
  });

  it('should still work with a 0 length string.', () => {
    expect(Helpers.truncateString('', 1)).toEqual('');
  });

  it('if the length is below 0 it should return an empty string.', () => {
    expect(Helpers.truncateString('test string', -10)).toEqual('');
  });
});
