require('../config/db.config');

const mongoose = require('mongoose');
const Game = require('../models/Game.model');
const games = require('../games.json');

mongoose.connection.once('open', () => {
  mongoose.connection.dropCollection('games')
    .then(() => {
      console.log('DB cleared');

      return Game.create(games)
    })
    .then(gamesDB => {
      gamesDB.forEach(game => {
        console.log(`${game.title} has been created`)
      })

      console.log(`${gamesDB.length} games have been created`);
    })
    .catch(err => console.error(err))
    .finally(() => {
      mongoose.disconnect();
    })
})