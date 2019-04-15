import * as Helpers from './testing';

describe('TestingHelpers : mockCR()', () => {
  const mock = { mockClear: jest.fn(), mockRestore: jest.fn() };

  it('should call mockClear and mockRestore on the given mock.', () => {
    Helpers.mockCR(mock);
    expect(mock.mockClear).toHaveBeenCalledTimes(1);
    expect(mock.mockRestore).toHaveBeenCalledTimes(1);
  });

  it('should return the mock.', () => {
    expect(Helpers.mockCR(mock)).toEqual(mock);
  });

  it('should throw an Error if a mock was not supplied.', () => {
    function catchError() {
      Helpers.mockCR('');
    }
    expect(catchError).toThrow();
  });
});

describe('TestingHelpers : asyncError()', () => {
  const fn = async (error) => {
    if (error) throw Error('Error was thrown.');
  };

  const errorChecker = async () => fn(true);
  const noErrorChecker = async () => fn(false);

  it('should return null if there is no error.', async () => {
    const response = await Helpers.asyncError(noErrorChecker);
    expect(response).toEqual(null);
  });

  it('should catch and return the error if there is an error.', async () => {
    const response = await Helpers.asyncError(errorChecker);
    expect(response).toEqual(Error('Error was thrown.'));
  });

  it('should throw TypeError error if the paramter is not a function.', async () => {
    const response = await Helpers.asyncError();
    expect(response).toEqual(TypeError('fn is not a function'));
  });
});
