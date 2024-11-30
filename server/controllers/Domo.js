const models = require('../models');

const { Puzzle } = models;

// const makerPage = (req, res) => {
//     res.render('app');
// }
const makerPage = async (req, res) => res.render('app');

const makeNewPuzzle = async (req, res) => {
  console.log(req);
  if (!req.body.nums) {
    return res.status(400).json({ error: 'Nums are required' });
  }

  const puzzleData = {
    solution: req.body.solution,
    creator: req.session.account._id || 'SERVER',
  };

  try {
    const newPuzzle = new Puzzle(puzzleData);
    await newPuzzle.save();
    return res.status(201).json({
      solution: newPuzzle.solution,
      creator: newPuzzle.creator,
      scores: newPuzzle.scores,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists' });
    }
    return res.status(500).json({ error: 'An error occured making domo' });
  }
};

const getPuzzles = async (req, res) => {
  try {
    const query = { owner: req.session.account._id || 'SERVER' };
    const docs = await Puzzle.find(query).select('solution').lean().exec();

    return res.json({ puzzles: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving domos' });
  }
};

module.exports = {
  makerPage,
  makeNewPuzzle,
  getPuzzles,
};
