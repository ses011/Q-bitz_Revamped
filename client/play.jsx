const helper = require('./helper');
const puzzleHelp = require('./puzzleHelper.jsx');
const React = require("react");
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');


const PuzzlePrompt = (props) => {
    const [puzzle, setPuzzles] = useState(props.puzzle);

    useEffect(() => {
        const loadPuzzleFromServer = async () => {
            const response = await fetch('/getRandomPuzzle');
            const data = await response.json();
            setPuzzles(data.puzzle);
        };
        loadPuzzleFromServer();
    }, [props.reloadPuzzles]);

    if (puzzle.length === 0) {
        return (
            <div className='prompt'>
                <h3 className='emptyPuzzle'>Couldn't find a puzzle</h3>
            </div>
        );
    }

    return (
        <div className='puzzle'>
            <div key={puzzle.id} className='prompt'>
                {puzzle.solution.map ((section) => {
                    let src = `assets/img/cardPatterns/${Object.keys(helper.FACES)[section]}.png`;
                    return <img src={src}></img>

                })}
        
            </div>
    
        </div>
    );
}

const Player = () => {
    //const [reloadPuzzles] = useState(false);

    return (
        <div>
            <PuzzlePrompt puzzle={[]} />
            <puzzleHelp.Tray tray = {[]}></puzzleHelp.Tray>
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<Player />);
};

window.onload = init;