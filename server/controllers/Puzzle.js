const models = require('../models');

const { Puzzle } = models;

const makerPage = async (req, res) => res.render('maker');

const playerPage = async (req, res) => res.render('player');

const getRandomPuzzle = async (req, res) => {
  try {
    const query = { };
    const docs = await Puzzle.find(query).select(' solution ').lean().exec();
    
    const rand = Math.round(Math.random() * (docs.length - 1));
    const puzzle = docs[rand];
    
    console.log(`random: ${rand}`);

    return res.json({ puzzle });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving puzzles' });
  }
};

const getAllPuzzles = async (req, res) => {
  try {
    const query = { creator: req.session.account._id };
    const docs = await Puzzle.find(query).select(' solution ').lean().exec();

    return res.json({ puzzles: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving puzzles' });
  }
};

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

module.exports = {
  makerPage,
  playerPage,
  makePuzzle,
  getRandomPuzzle,
  getAllPuzzles,
};
