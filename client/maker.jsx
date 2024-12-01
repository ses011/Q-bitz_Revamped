const helper = require('./helper');
const React = require("react");
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');
const { object } = require('underscore');

const FACES = Object.freeze({
    "solidWhite": 0,
    "solidColor": 1,
    "whiteCircle": 2,
    "colorCircle": 3,
    "colorDiagL": 4,
    "colorDiagR": 5,
    "whiteDiagL": 6,
    "whiteDiagR": 7
})

const handleNewPuzzle = (e, onPuzzleAdded) => {
    console.log("handle");
    e.preventDefault();
    helper.hideError();

    const nums = e.target.querySelector('#nums').value;

    if (!nums) {
        helper.handleError("Name is required");
        return false;
    }
    helper.sendPost(e.target.action, { nums }, onPuzzleAdded);
    return false;
}

const PuzzleForm = (props) => {
    return (
        <form id="newPuzzleForm"
            onSubmit={(e) => handleNewPuzzle(e, props.triggerReload)}
            name="newPuzzleForm"
            action="/maker"
            method="POST"
            className="newPuzzleForm"
        >
            <label htmlFor="nums">Numbers: </label>
            <input id="nums" type="number" />
            <input className='newPuzzleSubmit' type="submit" value="New Puzzle" />
        </form>
    );
};

const PuzzleList = (props) => {
    const [puzzles, setPuzzles] = useState(props.puzzles);

    useEffect(() => {
        const loadPuzzlesFromServer = async () => {
            const response = await fetch('/getPuzzles');
            const data = await response.json();
            setPuzzles(data.puzzles);
        };
        loadPuzzlesFromServer();
    }, [props.reloadPuzzles]);

    if (puzzles.length === 0) {
        return (
            <div className='puzzleList'>
                <h3 className='emptyPuzzle'>No Puzzles Yet</h3>
            </div>
        );
    }

    const puzzleNodes = puzzles.map(puzzle => {
        // let card = "";
        // for (let i = 0; i < 16; i++) {
        //     let pattern = Object.keys(FACES)[puzzle.solution[i]];
        //     card += `<img src="${__dirname}/../hosted/img/cardPatterns/${pattern}.png"></img>`
        // }
        return (
            <div key={puzzle.id} className='prompt'>
                {puzzle.solution.map ((section) => {
                    let src = `assets/img/cardPatterns/${Object.keys(FACES)[section]}.png`;
                    return <img src={src}></img>

                })}
        
            </div>
        );
    });

    return (
        <div className='puzzleList'>
            {puzzleNodes}
        </div>
    );
};

const App = () => {
    const [reloadPuzzles, setReloadPuzzles] = useState(false);

    return (
        <div>
            <div id='makePuzzle'>
                <PuzzleForm triggerReload={() => setReloadPuzzles(!reloadPuzzles)} />
            </div>
            <div id='puzzles'>
                <PuzzleList puzzles={[]} reloadPuzzles={reloadPuzzles} />
            </div>
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
};

window.onload = init;