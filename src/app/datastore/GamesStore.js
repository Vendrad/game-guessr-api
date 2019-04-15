import igdb from 'igdb-api-node';

/**
 * IGDB wrapper to make specific API calls
 */
class GamesStore {
  /**
   * Retrieves the count of games released in an
   * inclusive year range that have a storyline.
   *
   * @param {int} minYear
   * @param {int} maxYear
   */
  static async count(minYear, maxYear) {
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
    ) {
      throw Error('Could not find any games.');
    }

    return countResponse.data.count;
  }

  /**
   * Retrieves a game with a storyline, released
   * in an inclusive year range at a specific offset
   *
   * @param {int} minYear
   * @param {int} maxYear
   * @param {int} offset range 0-(count(games) - 1)
   */
  static async offset(minYear, maxYear, offset) {
    // Filter criteria for the search
    const filter = [
      `y >=${minYear}`,
      `y <=${maxYear}`,
      'game.storyline != null',
      'game.category = 0',
    ];

    // Utilise the offset to pull back a game with the given criteria
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
      .offset(offset)
      .request('release_dates');

    // If there is nothing available at the offset, throw an error
    if (response.data.length !== 1) {
      throw Error('Could not retrieve a single game.');
    }

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
