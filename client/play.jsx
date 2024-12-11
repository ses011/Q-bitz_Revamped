const helper = require('./helper');
const Puzzle = require('./puzzle.jsx');
const Tray = require('./Tray.jsx');
const React = require("react");
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');
const { DndProvider } = require('react-dnd');
const { HTML5Backend } = require('react-dnd-html5-backend');

const checkAccuracy = (holding, solution) => {
    console.log(`solution: ${solution}`);
    for (let i in holding) {
        if (holding[i].id === false) {
            console.log(`face: ${holding[i].face}`);
            return false;
        }
        else if (helper.FACES[holding[i].face] !== solution[i]) {
            console.log(`wrong: ${helper.FACES[holding[i].face]}`);
            return false;
        }
    }
    return true;
}

const success = () => {
    document.querySelector('#successMsg').classList.remove('hidden');
}

const PuzzlePrompt = (props) => {
    useEffect(() => {
        const loadPuzzleFromServer = async () => {
            const response = await fetch('/getRandomPuzzle');
            const data = await response.json();
            console.log(`new puzzle ${data.puzzle}`);
            props.setPuzzle(data.puzzle);
            props.updatePuzzle(data.puzzle);
        };
        loadPuzzleFromServer();
    }, [props.reloadPuzzles]);

    if (props.puzzle.length === 0) {
        return (
            <div className='prompt'>
                <h3 className='emptyPuzzle'>Couldn't find a puzzle</h3>
            </div>
        );
    }

    return (
        <div className='puzzle'>
            <div key={props.puzzle.id} className='prompt'>
                {props.puzzle.solution.map((section) => {
                    let src = `assets/img/cardPatterns/${Object.keys(helper.FACES)[section]}.png`;
                    return <img src={src}></img>

                })}

            </div>

        </div>
    );
}

const Player = () => {
    const [puzzle, setPuzzle] = useState([]);
    let localPuzzle = puzzle;

    const setInit = () => {
        let slots = []
        for (let i = 0; i < 16; i++) {
            slots[i] = { id: false, face: "" };
        }
        return slots;
    }

    const [holding] = useState(setInit());
    
    const updatePuzzle = (p) => {
        localPuzzle = p;
    }

    const updateHolding = (num, val) => {
        holding[num] = val;

        if (checkAccuracy(holding, localPuzzle.solution)) {
            success();
        }
    }


    return (
        <div id="content">
            <div id="prompt">
                <PuzzlePrompt puzzle={puzzle} setPuzzle={setPuzzle} updatePuzzle={updatePuzzle}/>

            </div>
            <DndProvider backend={HTML5Backend}><Puzzle.Puzzle dice={[]} holding={holding} updateHolding={updateHolding} /></DndProvider>
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    document.querySelector('#successMsg').classList.add('hidden');
    root.render(<Player />);
};

window.onload = init; 