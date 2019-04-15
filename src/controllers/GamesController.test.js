import supertest from 'supertest';
import app from '../index';
import GameStore from '../app/datastore/GamesStore';
import * as Logger from '../core/logging/Logger';
import { mockCR } from '../helpers/testing';

const game = {
  id: 1,
  game: {
    name: 'Dummy Game',
    alternative_names: [
      {
        name: 'Dummy',
      },
    ],
    storyline: 'Cool Storyline',
  },
  y: 2001,
};

const gameStore = {
  count: jest.fn().mockReturnValue(1),
  offset: jest.fn().mockReturnValue(game),
  search: jest.fn().mockReturnValue([game]),
};

describe('GamesController', () => {
  let logger;

  beforeEach(() => {
    logger = jest.fn();
    Logger.default = logger;
    GameStore.count = gameStore.count;
    GameStore.offset = gameStore.offset;
    GameStore.search = gameStore.search;
  });

  afterEach(() => {
    mockCR(logger);
  });

  describe('randomFromDecade', () => {
    it('should return with status code 200.', async () => {
      const response = await supertest(app).get('/api/v1/games/random/0');
      expect(response.statusCode).toEqual(200);
    });

    it('should return a game within a specific decade.', async () => {
      const response = await supertest(app).get('/api/v1/games/random/0');
      expect(response.body).toEqual(game);
    });

    it('should return with a status code 500 if the decade id is incorrect.', async () => {
      const response = await supertest(app).get('/api/v1/games/random/5');
      expect(response.statusCode).toEqual(500);
    });
  });

  describe('random', () => {
    it('should return with status code 200.', async () => {
      const response = await supertest(app).get('/api/v1/games/random');
      expect(response.statusCode).toEqual(200);
    });

    it('should return a game.', async () => {
      const response = await supertest(app).get('/api/v1/games/random');
      expect(response.body).toEqual(game);
    });

    it('should return with a status code 500 if no game is found.', async () => {
      GameStore.offset = jest.fn().mockImplementation(() => {
        throw Error('Could not retrieve a single game.');
      });
      const response = await supertest(app).get('/api/v1/games/random');
      expect(response.statusCode).toEqual(500);
    });
  });

  describe('search', () => {
    it('should return with status code 200.', async () => {
      const response = await supertest(app).get('/api/v1/games/search/Dummy');
      expect(response.statusCode).toEqual(200);
    });

    it('should return an array of games that match the search string.', async () => {
      const response = await supertest(app).get('/api/v1/games/search/Dummy');
      expect(response.body).toEqual([game]);
    });

    it('should return an empty array of games if no games match the search string.', async () => {
      GameStore.search = jest.fn().mockImplementation(() => []);
      const response = await supertest(app).get(
        '/api/v1/games/search/Something',
      );
      expect(response.body).toEqual([]);
    });
  });
});
