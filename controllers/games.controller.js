const Game = require('../models/Game.model');
const Review = require('../models/Review.model');
const genres = require('../data/genres');
const Publisher = require('../models/Publisher.model');

module.exports.listGames = (req, res, next) => {
  Game.find()
    .populate('publishers')
    .then(games => {
      res.render('games/games-list', { games })
    })
    .catch(err => next(err));
}

// module.exports.getGame = (req, res, next) => {
//   const { id } = req.params;

//   const promises = [
//     Game.findById(id),
//     Review.find({ game: id })
//   ];

//   Promise.all(promises)
//     .then(results => {
//       const [ game, reviews ] = results
//       // const game = results[0];
//       // const reviews = results[1];
//       res.render('games/games-detail', { game, reviews })
//     })
//     .catch(err => next(err));
// }

module.exports.getGame = (req, res, next) => {
  const { id } = req.params;

  Game.findById(id)
    // .populate('reviews')
    .populate({
      path: 'reviews',
      populate: {
        path: 'game'
      }
    })
    .then(game => {
      res.render('games/games-detail', { game })
    })
    .catch(err => next(err));
}

module.exports.deleteGame = (req, res, next) => {
  const { id } = req.params;

  Game.findByIdAndDelete(id)
    .then(() => res.redirect('/games'))
    .catch(err => next(err));
}

module.exports.getCreateForm = (req, res, next) => {
  Publisher.find()
    .then(publishers => {
      res.render('games/games-form', { genres, publishers });
    })
}

module.exports.createGame = (req, res, next) => {
  // const newGame = new Game(req.body)
  // newGame.save()

  Game.create(req.body)
    .then(gameDB => {
      res.redirect(`/games/${gameDB._id}`)
    })
    .catch(err => next(err));
}

module.exports.getEditForm = (req, res, next) => {
  const { id } = req.params;

  const promises = [
    Game.findById(id),
    Publisher.find()
  ]

  Promise.all(promises)
    .then(results => {
      const [ game, publishers ] = results;
      res.render('games/games-form', { genres, game, isEdit: true, publishers });
    })
    .catch(err => next(err));
}

module.exports.editGame = (req, res, next) => {
  const { id } = req.params

  Game.findByIdAndUpdate(id, req.body, { new: true })
    .then((game) => {
      res.redirect(`/games/${game._id}`)
    })
    .catch(err => next(err))
}