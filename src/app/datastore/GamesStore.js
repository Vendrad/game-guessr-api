import igdb from 'igdb-api-node';
import { randBetweenInclusive } from '../../helpers';

/**
 * IGDB wrapper to make specific API calls
 */
class GamesStore {
  /**
   * Retrieves a random game released in an inclusive year range
   *
   * @param {int} minYear
   * @param {int} maxYear
   */
  static async random(minYear, maxYear) {
    // Filter criteria for the search
    const filter = [
      `y >=${minYear}`,
      `y <=${maxYear}`,
      'game.storyline != null',
      'game.category = 0',
    ];

    // Get count of games that match the criteria
    const countResponse = await igdb()
      .where(filter)
      .request('release_dates/count');

    // If no games could be found throw an error
    if (
      countResponse.data.count === undefined
      || countResponse.data.count === 0
    ) throw Error('Could not find any games.');

    // Utilise the number of games to pull back one specific game at random using offset
    const response = await igdb()
      .fields([
        'id',
        'game.name',
        'game.alternative_names.name',
        'game.storyline',
        'y',
      ])
      .where(filter)
      .limit(1)
      .offset(randBetweenInclusive(0, countResponse.data.count - 1))
      .request('release_dates');

    // If the store changed between getting the count and retrieving a game, throw an error
    if (response.data.length !== 1) throw Error('Could not retrieve a single game.');

    // Return the game object
    return response.data[0];
  }

  /**
   * Retrieve a list of games using the API search functionality
   *
   * @param {string} searchString
   * @param {int} limit
   */
  static async search(searchString, limit) {
    const response = await igdb()
      .fields(['id', 'name', 'cover.url'])
      .search(searchString)
      .limit(limit)
      .request('games');

    return response.data;
  }
}

export default GamesStore;
