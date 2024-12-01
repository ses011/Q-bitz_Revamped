const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
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
