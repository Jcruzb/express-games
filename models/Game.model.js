const mongoose = require('mongoose');

const REQUIRED_ERROR = 'Required field';

const GENRES = require('../data/genres');

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
    }
  },
  {
    timestamps: true,
  }
)

// Model

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;