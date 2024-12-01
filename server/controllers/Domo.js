const models = require('../models');

const { Puzzle } = models;

// const makerPage = (req, res) => {
//     res.render('app');
// }
const makerPage = async (req, res) => res.render('app');

const makePuzzle = async (req, res) => {
  if (!req.body.nums) {
    return res.status(400).json({ error: 'nums is required' });
  }

  const puzzleData = {
    solution: req.body.nums.split(''),
    creator: req.session.account._id,
  };

  try {
    const newPuzzle = new Puzzle(puzzleData);
    await newPuzzle.save();
    return res.status(201).json({ solution: newPuzzle.solution, creator: newPuzzle.creator });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'puzzle already exists' });
    }
    return res.status(500).json({ error: 'An error occured making puzzle' });
  }
};

const getPuzzles = async (req, res) => {
  try {
    const query = { creator: req.session.account._id };
    const docs = await Puzzle.find(query).select(' solution ').lean().exec();

    return res.json({ puzzles: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving puzzles' });
  }
};

module.exports = {
  makerPage,
  makePuzzle,
  getPuzzles,
};
