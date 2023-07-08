const mongoose = require('mongoose');

const PublisherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    }
  },
  {
    timestamps: true
  },
)

const Publisher = mongoose.model('Publisher', PublisherSchema);

module.exports = Publisher;