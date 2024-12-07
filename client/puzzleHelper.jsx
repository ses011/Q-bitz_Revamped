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

const swap = (e) => {
    e.preventDefault();

    let dice = diceList[e.target.id];
    let val = helper.FACES[dice.getFace()] + 1;
    if (val == 8) {
        val = 0;
    }
    dice.face = Object.keys(helper.FACES)[val]

    let classes = e.target.classList.value

    if (classes.includes(" ")) {
        e.target.classList.value = dice.face + " " + classes.split(" ")[1] ;
    }
    else {
        e.target.classList.value = dice.face;
    }

    setFaceImg(e.target);
}

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

    for (let id = 0; id < 16; id++) {
        let tempDice = new Dice.Dice(id);
        dice.push(tempDice);

        let img = `assets/img/dicePatterns/${tempDice.getFace()}.png`;

        diceDiv.innerHTML += `<img id=${id} className=${tempDice.getFace()} src=${img} alt=${tempDice.getFace()}></img>`;
    }
    
    for (let img of document.querySelectorAll("div#dice img")) {
        img.onmousedown = doMouseDown;
        img.ondblclick = swap;
        let vw = window.innerWidth;

        let id = parseInt(img.id);
        img.style.left = `${((vw * 0.11) * (id % 4)) + (vw * 0.5)}px`;
        img.style.top = `${((vw * 0.11) * Math.floor(id / 4)) + 50}px`;
    }
}


module.exports = {
    Tray,
    DiceGrid,
}