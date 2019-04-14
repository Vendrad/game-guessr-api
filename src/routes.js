import express from 'express';
import games from './routes/games';

const router = express.Router();

// List of all top level routes
router.use('/api/v1', games);

export default router;
