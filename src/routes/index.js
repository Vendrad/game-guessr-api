import cors from 'cors';
import corsConfig from '../config/cors.config';

import error from '../middleware/error';
import games from './games';

/**
 * General top level routes file
 * 
 * @param {*} app 
 */
const routes = app => {

  // Adds CORS configuration to the response
  app.use(cors(corsConfig));

  // All /games routes
  app.use('/api/v1', games);

  // General error handling middleware
  app.use(error);
  
};

export default routes;