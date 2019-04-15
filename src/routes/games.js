import express from 'express';
import AsyncController from '../core/controller/AsyncController';
import GamesController from '../controllers/GamesController';

const router = express.Router();

/**
 * All routes defined for /games
 *
 * AsyncController wraps controllers that have asynchronous functionality.
 */
router.get('/games/random/', AsyncController(GamesController.random));

router.get(
  '/games/random/:decade',
  AsyncController(GamesController.randomFromDecade),
);

router.get(
  '/games/search/:searchString',
  AsyncController(GamesController.search),
);

export default router;
