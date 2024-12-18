const helper = require('./helper');
const Puzzle = require('./puzzle.jsx');
const React = require("react");
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');
const { DndProvider } = require('react-dnd');
const { HTML5Backend } = require('react-dnd-html5-backend');


const handleNewPuzzle = (e, holding) => {
    console.log(`handle ${holding[0]}`);
    e.preventDefault();
    helper.hideError();

    const nums = [];

    for (let spot of holding) {
        if (spot.id === false) {
            helper.handleError("The entire grid must be used");
            return false;
        }
        nums.push(helper.FACES[spot.face]);
    }

    console.log(`nums ${nums}`)
    if (nums.length == 16) {
        helper.sendPost(e.target.action, { nums });
    }
    return false;
}

const PuzzleForm = (props) => {
    const setInit = () => {
        let slots = []
        for (let i = 0; i < 16; i++) {
            slots[i] = { id: false, face: "" };
        }
        return slots;
    }

    const [holding] = useState(setInit());


    const updateHolding = (num, val) => {
        holding[num] = val;
        console.log(holding);
    }


    return (
        <form id="newPuzzleForm"
            onSubmit={(e) => handleNewPuzzle(e, holding)}
            name="newPuzzleForm"
            action="/maker"
            method="POST"
            className="newPuzzleForm"
        >
            <DndProvider backend={HTML5Backend}><Puzzle.Puzzle holding={holding} updateHolding={updateHolding} /></DndProvider>
            <input className='newPuzzleSubmit' type="submit" value="New Puzzle" />
        </form>
    );
};

const Maker = () => {
    return (
        <div className='content'>
            <div id='makePuzzle'>
                <PuzzleForm />
            </div>
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<Maker />);
};

window.onload = init;