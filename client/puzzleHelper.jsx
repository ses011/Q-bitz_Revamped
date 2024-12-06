const helper = require('./helper');
const Dice = require('./dice');
const React = require("react");
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const indexes = [11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44];

const doMouseDown = (e) => {
    e.preventDefault();
    let selectedDice = e.target;
    selectedDice.style.zIndex = 1000;
};

const Tray = (props) => {
    let src = "assets/img/transparent.png";

    const imgs = indexes.map(index => {
        let id = `t${index}`;
        console.log(`${id}\n`);
        return <img src={src} id={id} alt=""></img>;
           
    })

    return (
        <div id="tray">
            {imgs}
        </div>
    )
}

const DiceGrid = (props) => {
    let dice = [];

    let diceDiv = document.getElementById('dice');

    for (let i = 0; i < 16; i++) {
        let tempDice = new Dice.Dice(i);
        dice.push(tempDice);
        diceDiv.innerHTML += setFaceImg(tempDice, i);
    }

    return diceDiv;
}

const setFaceImg = (die, id) => {
    let img = `assets/img/dicePatterns/${die.getFace()}.png`;

    let face = <img id={id} className={die.getFace()} src={img} alt={die.getFace()}></img>
    
    return face;
}

module.exports = {
    Tray,
    setFaceImg,
    DiceGrid
}