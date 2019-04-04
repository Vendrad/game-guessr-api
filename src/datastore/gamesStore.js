'use strict';

import igdb from 'igdb-api-node';
import { randBetweenInclusive } from '../helpers';

class gamesStore {

  /**
   * Retrieves a random game released in an inclusive year range
   * 
   * @param {int} minYear 
   * @param {int} maxYear 
   */
  static async random(minYear, maxYear) {

    const countResponse = await igdb()
      .where([
        'y >=' + minYear,
        'y <=' + maxYear,
        'game.storyline != null',
        'game.category = 0'
      ])
      .request('release_dates/count');

    if (countResponse.data.count === undefined || countResponse.data.count === 0) throw Error('Could not find any games.');

    const response = await igdb()
      .fields(['id', 'game.name', 'game.alternative_names.name', 'game.storyline', 'y'])
      .where([
        'y >=' + minYear,
        'y <=' + maxYear,
        'game.storyline != null',
        'game.category = 0'])
      .limit(1)
      .offset(randBetweenInclusive(0, countResponse.data.count - 1))
      .request('release_dates');

    if (response.data.length !== 1) throw Error('Could not retrieve a single game.');

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
      .request("games");

    return response.data;

  }

}

export default gamesStore;