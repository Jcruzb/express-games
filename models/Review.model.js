const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
    },
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;

/*
  {
    comment: 'Me gusto mucho',
    game: 'djasd3323fjdslkf33',
    _id: 'dkasdlksajlkasjd121'
  }
*/