'use strict';

import games from '../datastore/games';
import validator from 'validator';
import gameModes from '../config/gamemodes.config';

class GamesController {

  static async random (req) {

    const decade = req.params.decade === undefined ? '4' : req.params.decade;

    const possibleGameModes = gameModes.map(mode => { return mode.id; });

    if (!validator.isInt(decade, possibleGameModes)) throw Error('Incorrect decade id.');

    const gameMode = gameModes.find(mode => { return mode.id.toString() === decade });

    const game = await games.random(gameMode.minYear, gameMode.maxYear);

    return game;

  }

  static async search (req) {

    if(validator.isEmpty(req.params.searchString)) throw Error('No search string provided.');

    const searchString = validator.escape(req.params.searchString);

    const games = await games.search(searchString, 5);

    return games;

  }

}

export default GamesController;