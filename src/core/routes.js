import cors from 'cors';
import corsConfig from './cors/CorsConfig';

import StandardError from './middleware/standardError';
import games from '../routes/games';

/**
 * General top level routes file
 *
 * @param {*} app
 */
const routes = (app) => {
  // Adds CORS configuration to the response
  app.use(cors(corsConfig));

  // All /games routes
  app.use('/api/v1', games);

  // General error handling middleware
  app.use(StandardError);
};

export default routes;
