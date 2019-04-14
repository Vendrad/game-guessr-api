import whitelist from '../../config/domains.config';
/**
 * Sets cors configuration for the response
 *
 * If the origin domain is not in the whitelist then throw an error
 */
const CorsConfig = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`Origin (${origin}) is not allowed by CORS.`));
    }
  },
};

export default CorsConfig;
