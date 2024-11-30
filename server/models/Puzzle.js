const mongoose = require('mongoose');

const PuzzleSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    required: false,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  scores: {
    type: [mongoose.Schema.ObjectId],
    required: true,
    ref: 'Score',
  },
  solution: {
    type: [Number],
    required: true,
  },
});

PuzzleSchema.statics.toAPI = (doc) => ({
  id: doc.id,
  scores: doc.scores,
});

const PuzzleModel = mongoose.model('Puzzle', PuzzleSchema);
module.exports = PuzzleModel;
