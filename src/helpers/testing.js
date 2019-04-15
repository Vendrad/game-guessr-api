/**
 * Clears and restores the mock
 *
 * @param {Object} mock
 * @return {Object}
 */
export function mockCR(mock) {
  mock.mockClear();
  mock.mockRestore();
  return mock;
}

/**
 * Function for catching errors in asynchronous functions
 *
 * Further reading regarding awkward syntax for checking for
 * errors on async: https://github.com/facebook/jest/issues/1700
 *
 * @param {function} fn
 */
export async function asyncError(fn) {
  try {
    await fn();
  } catch (e) {
    return e;
  }

  return null;
}

export default mockCR;
