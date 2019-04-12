import express from 'express';
import Controller from '../controllers/controller';
import GamesController from '../controllers/games.controller';

const router = express.Router();

router.get('/games/random/', Controller(GamesController.random));
router.get('/games/random/:decade', Controller(GamesController.randomFromDecade));
router.get('/games/search/:searchString', Controller(GamesController.search));

export default router;