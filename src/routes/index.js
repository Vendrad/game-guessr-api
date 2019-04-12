import cors from 'cors';
import corsConfig from '../config/cors.config';

import error from '../middleware/error';
import games from './games';

const routes = app => {

  app.use(cors(corsConfig));

  app.use('/api/v1', games);

  app.use(error);
  
};

export default routes;