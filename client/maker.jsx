const helper = require('./helper');
const puzzleHelp = require('./puzzleHelper.jsx');
const React = require("react");
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

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
        puzzleHelp.Tray()
        // <form id="newPuzzleForm"
        //     onSubmit={(e) => handleNewPuzzle(e, props.triggerReload)}
        //     name="newPuzzleForm"
        //     action="/maker"
        //     method="POST"
        //     className="newPuzzleForm"
        // >
        //     <label htmlFor="nums">Numbers: </label>
        //     <input id="nums" type="number" />
        //     <input className='newPuzzleSubmit' type="submit" value="New Puzzle" />
        // </form>
    );
};

const Maker = () => {
    const [reloadPuzzles, setReloadPuzzles] = useState(false);

    return (
        <div>
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