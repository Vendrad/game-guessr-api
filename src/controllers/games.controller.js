'use strict';

import gamesStore from '../datastore/gamesStore';
import validator from 'validator';
import gameModes from '../config/gamemodes.config';

class GamesController {

  static async random (req) {

    const [minYear, maxYear] = GamesController.getYearRange(req);

    const game = await gamesStore.random(minYear, maxYear);

    return game;

  }

  static async search (req) {

    if(validator.isEmpty(req.params.searchString)) throw Error('No search string provided.');

    const searchString = validator.escape(req.params.searchString);

    const games = await gamesStore.search(searchString, 5);

    return games;

  }

  static getYearRange(req) {

    if (req.params.decade !== undefined) {

      const possibleGameModes = gameModes.map(mode => { return mode.id; });

      if (!validator.isInt(req.params.decade, possibleGameModes)) throw Error('Incorrect decade id.');

      const gameMode = gameModes.find(mode => { return mode.id.toString() === req.params.decade });

      return [gameMode.minYear, gameMode.maxYear];

    }

    return [1900, 2100];

  }

}

export default GamesController;