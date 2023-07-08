const Review = require('../models/Review.model');

module.exports.createGameReview = (req, res, next) => {
  const { gameId } = req.params;

  // const { comment, username } = req.body;

  // const review = {
  //   game: gameId,
  //   comment: req.body.comment,
  //   username: req.body.username,
  // }
  // const review2 = {
  //   game: gameId,
  //   comment,
  //   username,
  // }

  const review = {
    ...req.body,
    game: gameId,
  }

  Review.create(review)
    .then((review) => {
      console.log(review);
      res.redirect(`/games/${gameId}`);
    })
    .catch(err => next(err));
}