const mongoose = require('mongoose');
const _ = require('underscore');

const setName = (name) => _.escape(name).trim();

const PuzzleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true,
    set: setName,
  },
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
    ref: "Score",
  },
  solution: {
    type: [Number],
    required: true,
  }
});

DomoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  id: doc.id,
  score: doc.score,
});

const PuzzleModel = mongoose.model('Puzzle', PuzzleSchema);
module.exports = PuzzleModel;
