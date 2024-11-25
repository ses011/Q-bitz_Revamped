const mongoose = require('mongoose');
const _ = require('underscore');

const setName = (name) => _.escape(name).trim();

const ScoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  puzzle: {
    type: mongoose.Schema.Puzzle,
    required: true,
  },
});

DomoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  score: doc.score,
});

const DomoModel = mongoose.model('Domo', DomoSchema);
module.exports = DomoModel;
