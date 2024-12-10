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
    if (nums.length == 16) helper.sendPost(e.target.action, { nums });
    return false;
}

const PuzzleForm = (props) => {
    const [holding] = useState([]);

    useEffect(() => {
        const setInit = () => {
            for (let i = 0; i < 16; i++) {
                updateHolding({ id: false, face: "" });
            }
        }
        setInit();
    }, [false]);


    const updateHolding = (num, val) => {
        holding[num] = val;
    }


    return (
        <form id="newPuzzleForm"
            onSubmit={(e) => handleNewPuzzle(e, holding)}
            name="newPuzzleForm"
            action="/maker"
            method="POST"
            className="newPuzzleForm"
        >
            <DndProvider backend={HTML5Backend}><Puzzle.Puzzle dice={[]} holding={holding} updateHolding={updateHolding} /></DndProvider>
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