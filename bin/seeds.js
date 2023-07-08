require('../config/db.config');

const mongoose = require('mongoose');
const Game = require('../models/Game.model');
const Publisher = require('../models/Publisher.model');
const games = require('../games.json');
const publishers = require('../publishers.json');

mongoose.connection.once('open', () => {
  mongoose.connection.dropDatabase()
    .then(() => {
      console.log('DB cleared');

      return Publisher.create(publishers)
    })
    .then((publishersDB) => {
      publishersDB.forEach(publisher => {
        console.log(`${publisher.name} has been created`)
      })

      const gamesWithPublisherId = games.map(game => {
        return {
          ...game,
          publishers: [
            publishersDB[Math.floor(Math.random() * publishersDB.length)]._id,
            publishersDB[Math.floor(Math.random() * publishersDB.length)]._id,
          ]
        }
      })

      return Game.create(gamesWithPublisherId)
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