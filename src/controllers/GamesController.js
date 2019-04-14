import validator from 'validator';
import gamesStore from '../app/datastore/GamesStore';
import { getYearRange, getMaxYearRange } from '../app/gameModes/yearRange';
import yearRanges from '../config/gamemodes.config';

/**
 * GamesController
 *
 * Provides methods for all /games routes
 */
class GamesController {
  /**
   * Returns a random game using the given decade id to
   * ensure the game's release was in the bounds of that decade
   *
   * @param {*} req
   */
  static async randomFromDecade(req) {
    const id = validator.toInt(req.params.decade);

    if (id === undefined) throw Error('Incorrect decade id provided.');

    const [minYear, maxYear] = getYearRange(id, yearRanges);

    const game = await gamesStore.random(minYear, maxYear);

    return game;
  }

  /**
   * Return a random game using the lower and upper year bounds
   */
  static async random() {
    const [minYear, maxYear] = getMaxYearRange(yearRanges);

    const game = await gamesStore.random(minYear, maxYear);

    return game;
  }

  /**
   * Searches for a game given the inputted search string
   *
   * @param {*} req
   */
  static async search(req) {
    if (validator.isEmpty(req.params.searchString)) throw Error('No search string provided.');

    const searchString = validator.escape(req.params.searchString);

    const games = await gamesStore.search(searchString, 5);

    return games;
  }
}

export default GamesController;
