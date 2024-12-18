const helper = require('./helper.js');
const Dice = require('./dice.jsx');
const React = require("react");
const { useState, useEffect } = React;
const { useDrop } = require("react-dnd");

const indexes = [11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44];


const TraySquare = (props) => {
    const [holding, setHolding] = useState(props.holding);

    const [, drop] = useDrop(() => ({
        accept: helper.ItemTypes.DICE,
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
    let counter = -1;
    const traySquares = indexes.map(i => {
        counter++;
        let trayIndex = `t${i}`;
        console.log(`index: ${trayIndex}`);

        return <TraySquare
            trayIndex={trayIndex}
            holding={props.holding[counter]}
            num={counter}
            updateHolding={props.updateHolding}
        />;
    })

    return (
        <div id="tray">
            {traySquares}
        </div>
    )
}

module.exports = {
    Tray,
}