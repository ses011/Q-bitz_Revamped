const helper = require('./helper');
const puzzleHelp = require('./puzzleHelper.jsx');
const React = require("react");
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const handleNewPuzzle = (e, onPuzzleAdded) => {
    console.log("handle");
    e.preventDefault();
    helper.hideError();

    const nums = [];
    for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 5; j++) {
            let spot = document.getElementById(`t${i}${j}`);

            // TODO: the enum of the dice at spot
            let val = null;

            if (!val) {
                helper.handleError("The entire grid must be used");
                return false;
            } 
            nums.push(val);
        }
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
            {puzzleHelp.Tray()}
            <input className='newPuzzleSubmit' type="submit" value="New Puzzle" />
        </form>
    );
};

const Maker = () => {
    return (
        <div>
            <div id='makePuzzle'>
                <PuzzleForm />
                
            </div>
            {puzzleHelp.DiceGrid() }
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<Maker />);
};

window.onload = init;