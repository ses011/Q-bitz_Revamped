const helper = require('./helper');
const Dice = require('./dice.jsx');
const React = require("react");
const { useState, useEffect, PureComponent } = React;

const DiceGrid = (props) => {
    useEffect(() => {
        const generateDice = Object.keys(helper.FACES).map((face) => {
            
            return <div className='dice' ><Dice.Dice id={false} face={face} /></div>;

        })
        props.setDice(generateDice);
        console.log(`Dice: ${props.dice}`);

    }, [false])

    

    return (
        <div id="diceGrid">
            {props.dice}
            
        </div>
    );
}

module.exports = {
    DiceGrid,
}