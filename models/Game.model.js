const mongoose = require('mongoose');

const REQUIRED_ERROR = 'Required field';

const GENRES = require('../data/genres');

const Publisher = require('../models/Publisher.model');
const Review = require('../models/Review.model');

// Schema

const GameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, REQUIRED_ERROR],
    },
    publicationYear: {
      type: Number,
      required: [true, REQUIRED_ERROR],
    },
    description: {
      type: String,
      required: [true, REQUIRED_ERROR],
    },
    genre: {
      type: String,
      required: [true, REQUIRED_ERROR],
      enum: GENRES
    },
    image: {
      type: String,
      required: [true, REQUIRED_ERROR],
    },
    publishers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: Publisher.modelName,
      required: true
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
)

GameSchema.virtual('reviews', {
  ref: Review.modelName,
  foreignField: 'game',
  localField: '_id',
  justOne: false,
})

// Model

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;