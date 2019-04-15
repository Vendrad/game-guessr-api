import * as igdb from 'igdb-api-node';
import GameStore from './GamesStore';
import { asyncError } from '../../helpers/testing';

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

let igdbMockObject;
let igdbMock;

const setupIGDB = (response) => {
  igdbMockObject = {
    where: jest.fn(),
    search: jest.fn(),
    fields: jest.fn(),
    limit: jest.fn(),
    offset: jest.fn(),
    request: jest.fn(),
  };

  igdbMock = jest.fn().mockImplementation(() => igdbMockObject);

  igdbMockObject.where.mockImplementation(() => igdbMockObject);
  igdbMockObject.search.mockImplementation(() => igdbMockObject);
  igdbMockObject.fields.mockImplementation(() => igdbMockObject);
  igdbMockObject.limit.mockImplementation(() => igdbMockObject);
  igdbMockObject.offset.mockImplementation(() => igdbMockObject);
  igdbMockObject.request.mockImplementation(
    url => new Promise((resolve, reject) => {
      process.nextTick(() => (url ? resolve(response) : reject(new Error('Error in request.'))));
    }),
  );

  return igdbMock;
};

describe('GamesStore', () => {
  beforeEach(() => {
    igdb.default = igdbMock;
  });

  describe('count', () => {
    it('should call where correctly.', async () => {
      igdb.default = setupIGDB({ data: { count: 1 } });
      await GameStore.count(2000, 2003);

      expect(igdbMockObject.where).toHaveBeenCalledWith([
        'y >=2000',
        'y <=2003',
        'game.storyline != null',
        'game.category = 0',
      ]);
    });

    it('should call request correctly.', async () => {
      igdb.default = setupIGDB({ data: { count: 1 } });
      await GameStore.count(2000, 2003);

      expect(igdbMockObject.request).toHaveBeenCalledWith(
        'release_dates/count',
      );
    });

    it('should return the count of games.', async () => {
      igdb.default = setupIGDB({ data: { count: 15 } });
      await expect(GameStore.count(2000, 2003)).resolves.toEqual(15);
    });

    it('should throw an error if there are no games.', async () => {
      igdb.default = setupIGDB({ data: { count: 0 } });

      const functionWithError = async () => GameStore.count(2000, 2003);

      const response = await asyncError(functionWithError);

      expect(response).toEqual(Error('Could not find any games.'));
    });
  });

  describe('offset', () => {
    it('should call where correctly.', async () => {
      igdb.default = setupIGDB({ data: [game] });
      await GameStore.offset(2000, 2003, 15);

      expect(igdbMockObject.where).toHaveBeenCalledWith([
        'y >=2000',
        'y <=2003',
        'game.storyline != null',
        'game.category = 0',
      ]);
    });

    it('should set the fields correctly.', async () => {
      igdb.default = setupIGDB({ data: [game] });
      await GameStore.offset(2000, 2003, 15);
      const expected = [
        'id',
        'game.name',
        'game.alternative_names.name',
        'game.storyline',
        'y',
      ];
      expect(igdbMockObject.fields).toHaveBeenCalledWith(expected);
    });

    it('should set limit correctly.', async () => {
      igdb.default = setupIGDB({ data: [game] });
      await GameStore.offset(2000, 2003, 15);

      expect(igdbMockObject.limit).toHaveBeenCalledWith(1);
    });

    it('should set offset correctly.', async () => {
      igdb.default = setupIGDB({ data: [game] });
      await GameStore.offset(2000, 2003, 15);

      expect(igdbMockObject.offset).toHaveBeenCalledWith(15);
    });

    it('should call request correctly.', async () => {
      igdb.default = setupIGDB({ data: [game] });
      await GameStore.offset(2000, 2003, 15);

      expect(igdbMockObject.request).toHaveBeenCalledWith('release_dates');
    });

    it('should return the game.', async () => {
      igdb.default = setupIGDB({ data: [game] });
      await expect(GameStore.offset(2000, 2003, 15)).resolves.toEqual(game);
    });

    it('should throw an error if there is not a single game response.', async () => {
      igdb.default = setupIGDB({ data: [] });

      const functionWithError = async () => GameStore.offset(2000, 2003, 15);

      const response = await asyncError(functionWithError);

      expect(response).toEqual(Error('Could not retrieve a single game.'));
    });
  });

  describe('search', () => {
    it('should set fields correctly.', async () => {
      igdb.default = setupIGDB({ data: [game] });
      await GameStore.search('Dummy', 5);

      expect(igdbMockObject.fields).toHaveBeenCalledWith([
        'id',
        'name',
        'cover.url',
      ]);
    });

    it('should set search correctly.', async () => {
      igdb.default = setupIGDB({ data: [game] });
      await GameStore.search('Dummy', 5);

      expect(igdbMockObject.search).toHaveBeenCalledWith('Dummy');
    });

    it('should set limit correctly.', async () => {
      igdb.default = setupIGDB({ data: [game] });
      await GameStore.search('Dummy', 5);

      expect(igdbMockObject.limit).toHaveBeenCalledWith(5);
    });

    it('should call request correctly.', async () => {
      igdb.default = setupIGDB({ data: [game] });
      await GameStore.search('Dummy', 5);

      expect(igdbMockObject.request).toHaveBeenCalledWith('games');
    });

    it('should return the list of games.', async () => {
      igdb.default = setupIGDB({ data: [game] });
      await expect(GameStore.search('Dummy', 5)).resolves.toEqual([game]);
    });

    it('should return an empy array if there are no games in the response.', async () => {
      igdb.default = setupIGDB({ data: [] });
      await expect(GameStore.search('Dummy', 5)).resolves.toEqual([]);
    });
  });
});
