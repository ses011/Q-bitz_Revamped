const helper = require('./helper');
const React = require("react");
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const indexes = [11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44];

const Tray = (props) => {
    let src = "assets/img/transparent.png";

    const imgs = indexes.map(index => {
        for (let i = 1; i < 5; i++) {
            for (let j = 1; j < 5; j++) {
                let id = `t${i}${j}`;
                console.log(`${id}\n`);
                return <img src={src} id={id} alt=""></img>;
            }
        }
    })

    return (
        <div id="tray">
            { imgs }
        </div>
    )
}

const Dice = (props) => {

}

function setFaceImg(img) {
    let face = diceList[img.id].getFace();
    
    img.src = `assets/img/dicePatterns/${face}.png`;
    img.alt = face;
}

module.exports = {
    Tray,
    setFaceImg,

}