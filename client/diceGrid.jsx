const helper = require('./helper');
const Dice = require('./dice.jsx');
const React = require("react");
const { useState, useEffect, PureComponent} = React;

const roll = () => {
    const val = Math.floor(Math.random() * 8);
    return Object.keys(helper.FACES)[val];
}

const DiceGrid = (props) => {
    const [dice, setDice] = useState(props.dice); 

    useEffect(() => {
        let ids = [];
        for (let id = 0; id < 16; id++) {
            ids.push(id);
        }

        const generateDice = ids.map((id) => {
            let face = roll();
            console.log(`face: ${face}`);
            return <div className='dice'><Dice.Dice id={id} face={face}/></div>;
        })    
        setDice(generateDice);
        console.log(`Dice: ${dice}`);

    }, [false])
    


    return (<div id="diceGrid">{dice}</div>);
}

module.exports = {
    DiceGrid
}