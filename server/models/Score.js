const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    default: 'Anon',
  },
  puzzle: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Puzzle',
  },
});

ScoreSchema.statics.toAPI = (doc) => ({
  user: doc.user,
  puzzle: doc.puzzle,
});

const ScoreModel = mongoose.model('Score', ScoreSchema);
module.exports = ScoreModel;
