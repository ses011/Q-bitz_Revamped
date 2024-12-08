const helper = require('./helper');
const Dice = require('./dice.jsx');
const React = require("react");
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const indexes = [11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44];

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

    const imgs = indexes.map(index => {
        let id = `t${index}`;
        console.log(`${id}\n`);
        return <div id={id}></div>;

    })

    return (
        <div id="tray">
            {imgs}
        </div>
    )
}

module.exports = {
    Tray,
}