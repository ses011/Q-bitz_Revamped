const helper = require('./helper.js');
const Dice = require('./dice.jsx');
const React = require("react");
const { useState, useEffect } = React;
const { useDrop } = require("react-dnd");

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
        e.target.classList.value = dice.face + " " + classes.split(" ")[1];
    }
    else {
        e.target.classList.value = dice.face;
    }

    setFaceImg(e.target);
}

const canMoveDice = (index) => {
    let slot = document.querySelector(`#${index}`);
    return !(slot.innerHTML.includes("Dice"))
}


const TraySquare = (props) => {
    const [index, setIndex] = useState(props.index);
    const [holding, setHolding] = useState(props.holding);  // Reference to the Dice component in that spot

    useEffect(() => {
        console.log(`effect: ${holding}`);
    });

    const [, drop] = useDrop(() => ({
        accept: helper.ItemTypes.DICE,
        canDrop: () => canMoveDice(index),
        drop: (item) => {
            setHolding(item);
            props.remove(item.id);
        }
    }));


    if (holding && holding != "") {
        let dice = (
            <div ref={drop} id={index} className='dice'>
                <Dice.Dice id={holding.id} face={holding.face}/>
            </div>
        );

        //props.add(dice, holding.id);
        return dice;
    }
    else {
        return (
            <div ref={drop} id={index}></div>
        )
    }
}

const Tray = (props) => {
    const [holding] = useState(props.holding);

    // needs to know what each tray square is holding 
    // and dice ID
    const imgs = indexes.map(i => {
        let index = `t${i}`;
        console.log(`${index}\n`);
        return <TraySquare index={index} remove={props.remove} add={props.add}/>;
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