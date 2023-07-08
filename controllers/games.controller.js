const Game = require('../models/Game.model');
const genres = require('../data/genres');

module.exports.listGames = (req, res, next) => {
  Game.find()
    .then(games => {
      res.render('games/games-list', { games })
    })
    .catch(err => next(err));
}

module.exports.getGame = (req, res, next) => {
  const { id } = req.params;

  Game.findById(id)
    .then(game => {
      res.render('games/games-detail', game)
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
  res.render('games/games-form', { genres });
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

  Game.findById(id)
    .then(game => {
      res.render('games/games-form', { genres, game, isEdit: true });
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