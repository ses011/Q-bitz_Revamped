const helper = require('./helper');
const DiceGrid = require('./diceGrid.jsx');
const Tray = require('./Tray.jsx');
const React = require("react");
const { useState, useEffect} = React;

const Puzzle = (props) => {
    const [dice, setDice] = useState(props.dice);

    return (
        <div id="movingDice">
            <Tray.Tray holding={props.holding} updateHolding={props.updateHolding} />
            <DiceGrid.DiceGrid dice={dice} setDice={setDice}/>
        </div>
    )
}

module.exports = {
    Puzzle,

}