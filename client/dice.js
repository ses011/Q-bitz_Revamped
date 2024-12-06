/* eslint-disable linebreak-style */
const helper = require('./helper');

class Dice {
  constructor(id) {
    this.id = `${id}`;
    this.roll();
  }

  // Randomly change the face of the dice
  roll() {
    const val = Math.floor(Math.random() * 8);
    this.face = Object.keys(helper.FACES)[val];
  }

  // Check what face the dice should be displaying
  getFace() {
    return this.face;
  }

  getID() {
    return this.id;
  }
}

module.exports.Dice = Dice;
