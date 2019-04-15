import AsyncController from './AsyncController';

const SpecificController = jest
  .fn()
  .mockImplementation(req => (req
    ? Promise.resolve('view')
    : Promise.reject(new Error('Error in Controller.'))));

const defaults = {
  req: 'The request',
  res: { send: jest.fn().mockReturnValue('SendReturn') },
  next: jest.fn(),
};

describe('AsyncController', () => {
  it('should call the specific controller with req, res, next.', async () => {
    const { req, res, next } = defaults;
    await AsyncController(SpecificController)(req, res, next);
    expect(SpecificController).toHaveBeenCalledWith(req, res, next);
  });

  it('should pass the return of SpecificController into send() on the response object if there are no errors.', async () => {
    const { req, res, next } = defaults;
    await AsyncController(SpecificController)(req, res, next);
    expect(res.send).toHaveBeenCalledWith('view');
  });

  it('should return the return of send if there are no errors.', async () => {
    const { req, res, next } = defaults;
    const response = await AsyncController(SpecificController)(req, res, next);
    expect(response).toEqual('SendReturn');
  });

  it('should pass any errors to next.', async () => {
    const { res, next } = defaults;
    await AsyncController(SpecificController)(false, res, next);
    expect(next).toHaveBeenCalledWith(new Error('Error in Controller.'));
  });
});
