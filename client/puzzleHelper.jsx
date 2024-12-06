const helper = require('./helper');
const Dice = require('./dice');
const React = require("react");
const { useState, useEffect } = React;

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
            {imgs}
        </div>
    )
}

const DiceGrid = (props) => {
    // const [dice] = useState(props.dice);

    // let doMouseDown = function (e) {
    //     e.preventDefault();
    //     selectedDice = e.target;
    //     selectedDice.style.zIndex = 1000;
    // };

    // let diceDiv = <div id="dice"></div>;

    // for (let i = 0; i < 16; i++) {
    //     let tempDice = new Dice.Dice(i);
    //     dice.push(tempDice);
    //     diceDiv.innerHTML += <img id={i} class="${tempDice.getFace()}"></img>;
    // }

    // return diceDiv;
}

function setFaceImg(img) {
    // const [dice] = useState(props.dice);

    // let face = dice[img.id].getFace();

    // img.src = `assets/img/dicePatterns/${face}.png`;
    // img.alt = face;
}

module.exports = {
    Tray,
    setFaceImg,
    DiceGrid
}