/**
 * Return an integer between two values, inclusive
 * of the upper bound. If non integer values are
 * supplied this will produce unexpected results.
 *
 * @param {int} min
 * @param {int} max
 * @return {int} random integer
 */
export function randBetweenInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Shortens a string to a given length
 *
 * Any characters after a count stipulated by length will be
 * removed. If any shortening occurs ellipses will be postfixed
 * to the string. The ellipses are not included in the character count.
 *
 * @param {string} string
 * @param {int} length a non int value will be rounded down
 * @return {string} the truncated string
 */
export function truncateString(string, length) {
  if (length <= 0) return '';
  if (string.length <= length) return string;
  return `${string.substr(0, length)}...`;
}
