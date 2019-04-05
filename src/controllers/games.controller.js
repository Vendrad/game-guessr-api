import gamesStore from '../datastore/gamesStore';
import validator from 'validator';
import { getYearRange, getMaxYearRange } from '../app/gameMode/yearRange';
import { yearRanges } from '../config/gameMode.config';

class GamesController {

  static async random (req) {

    const id = validator.toInt(req.params.decade);
      
    const [minYear, maxYear] = id === undefined
      ? getYearRange(id, yearRanges)
      : getMaxYearRange(id, yearRanges);
      
    const game = await gamesStore.random(minYear, maxYear);

    return game;

  }

  static async search (req) {

    if(validator.isEmpty(req.params.searchString)) throw Error('No search string provided.');

    const searchString = validator.escape(req.params.searchString);

    const games = await gamesStore.search(searchString, 5);

    return games;

  }

}

export default GamesController;