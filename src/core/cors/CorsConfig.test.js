import * as whitelist from '../../config/domains.config';
import CorsConfig from './CorsConfig';

const defaults = {
  origin: 'http://www.example.org',
  callback: jest.fn(),
};

const callFunction = ({ origin, callback }) => {
  CorsConfig.origin(origin, callback);
};

describe('CorsConfig', () => {
  it('should fire the callback with no errors if the whitelist contains origin.', () => {
    whitelist.default = [defaults.origin];
    callFunction(defaults);
    expect(defaults.callback).toHaveBeenCalledWith(null, true);
  });

  it('should fire the callback with no errors if the origin is falsy.', () => {
    whitelist.default = [defaults.origin];
    const defaultsWithFalseOrigin = { ...defaults };
    defaultsWithFalseOrigin.origin = '';
    callFunction(defaults);
    expect(defaults.callback).toHaveBeenCalledWith(null, true);
    defaultsWithFalseOrigin.origin = false;
    callFunction(defaults);
    expect(defaults.callback).toHaveBeenCalledWith(null, true);
    defaultsWithFalseOrigin.origin = null;
    callFunction(defaults);
    expect(defaults.callback).toHaveBeenCalledWith(null, true);
    defaultsWithFalseOrigin.origin = undefined;
    callFunction(defaults);
    expect(defaults.callback).toHaveBeenCalledWith(null, true);
  });

  it('should pass an error to the callback if the whitelist does not contain origin.', () => {
    whitelist.default = [];
    callFunction(defaults);
    expect(defaults.callback).toHaveBeenCalledWith(
      new Error(`Origin (${defaults.origin}) is not allowed by CORS.`),
    );
  });
});
