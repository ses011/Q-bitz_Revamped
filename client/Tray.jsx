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

const TraySquare = (props) => {
    const [holding, setHolding] = useState(props.holding);

    const [, drop] = useDrop(() => ({
        accept: helper.ItemTypes.DICE,
        canDrop: () => props.holding.id === false,
        drop: (item) => {
            props.updateHolding(props.num, item);
            setHolding(item);
        }
    }));

    return (
        <div
            ref={drop}
            id={props.trayIndex}
            className='traySquare'
            onDoubleClick={(e) => {
                props.updateHolding(props.num, { id: false, face: "" })
                setHolding({ id: false, face: "" });
            }}>
            <Dice.Dice id={holding.id} face={holding.face} />
        </div>
    )

}


const Tray = (props) => {
    const [reloadSquare, setReloadSquare] = useState(false);

    const triggerReload = () => {
        setReloadSquare(!reloadSquare);
    }

    const updateHolding = (num, val) => {
        props.holding[num] = val;
        console.log(val)
        triggerReload();
    }

    let counter = -1;
    const imgs = indexes.map(i => {
        counter++;
        let trayIndex = `t${i}`;
        console.log(`index ${trayIndex}\n`);

        props.holding[counter] = { id: false };

        return <TraySquare
            trayIndex={trayIndex}
            holding={props.holding[counter]}
            num={counter}
            updateHolding={updateHolding}
            reloadSquare={reloadSquare}
            triggerReload={triggerReload}
        />;
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