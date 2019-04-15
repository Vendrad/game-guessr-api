import * as Logger from '../logging/Logger';
import standardError from './standardError';

const defaults = {
  err: {
    message: 'An error occured.',
  },
  req: {},
  res: {
    send: jest.fn(),
    sendStatus: jest.fn(),
    headersSent: false,
  },
  next: jest.fn(),
};

const setup = ({
  err, req, res, next,
}) => {
  standardError(err, req, res, next);
};

describe('standardError', () => {
  let logger;

  beforeEach(() => {
    logger = jest.fn();
    Logger.default = logger;
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should log the error and send the message as a response if the app is in development.', () => {
    const originalENV = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    setup(defaults);
    expect(logger).toHaveBeenCalledWith(defaults.err);
    expect(defaults.res.send).toHaveBeenCalledWith(defaults.err.message);
    process.env.NODE_ENV = originalENV;
  });

  it('should log the error and send a status of 500 as a response if the app is not in development.', () => {
    const originalENV = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    setup(defaults);
    expect(logger).toHaveBeenCalledWith(defaults.err);
    expect(defaults.res.sendStatus).toHaveBeenCalledWith(500);
    process.env.NODE_ENV = originalENV;
  });

  it('should move on to the next middleware if the headers are already sent.', () => {
    const params = { ...defaults };
    params.res.headersSent = true;
    setup(params);
    expect(logger).toHaveBeenCalledTimes(0);
    expect(defaults.res.sendStatus).toHaveBeenCalledTimes(0);
    expect(defaults.res.send).toHaveBeenCalledTimes(0);
    expect(defaults.next).toHaveBeenCalledWith(defaults.err);
  });
});
