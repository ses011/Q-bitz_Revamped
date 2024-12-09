const helper = require('./helper');
const DiceGrid = require('./diceGrid.jsx');
const Tray = require('./Tray.jsx');
const React = require("react");
const { useState, useEffect} = React;



const Puzzle = (props) => {
    const [dice, setDice] = useState(props.dice);

    const remove = (id) => {
        document.querySelector(`#d${id}`).classList.add('hidden');
        console.log(`remove ${dice[id]}`);
    }

    const add = (die, id) => {
        dice[id] = die;
        console.log(`add: ${die}`);
    }

    useEffect(() => {

    })

    return (
        <div>
            <Tray.Tray remove={remove} add={add}/>
            <DiceGrid.DiceGrid dice={dice} setDice={setDice}/>
        </div>
    )
}

module.exports = {
    Puzzle,

}