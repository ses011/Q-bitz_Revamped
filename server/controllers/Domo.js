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
    solution: req.body.nums.split(""),
  };

  try {
    const newPuzzle = new Puzzle(puzzleData);
    await newPuzzle.save();
    return res.status(201).json({ solution: newPuzzle.solution });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'puzzle already exists' });
    }
    return res.status(500).json({ error: 'An error occured making puzzle' });
  }
};

// const getDomos = async (req, res) => {
//   try {
//     const query = { owner: req.session.account._id };
//     const docs = await Domo.find(query).select('name age score').lean().exec();

//     return res.json({ domos: docs });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: 'Error retrieving domos' });
//   }
// };

module.exports = {
  makerPage,
  makePuzzle,
  // getDomos,
};
