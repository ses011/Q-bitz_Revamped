const helper = require("./helper.js");
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const handleToggle = (e) => {
    e.preventDefault();
    helper.hideError();

    helper.sendPost(e.target.action);
    return false;
}

const PremiumForm = (props) => {
    return (
        <form id="premiumForm"
            name="premiumForm"
            onSubmit={handleToggle}
            action="/premiumToggle"
            method="POST"
            className="mainForm"
        >

            <input className='formSubmit' type="submit" value="Toggle premium" />
        </form>
    );
};

const Status = (props) => {
    const [status, setStatus] = useState(props.status);

    let data;
    useEffect(() => {
        const getStatusFromServer = async () => {
            const response = await fetch('/getStatus');
            data = await response.json();
            setStatus(data.status);
        };
        getStatusFromServer();
    }, [props.reloadStatus]);

    console.log(`data: ${status}`);
    return (
        <h3>Current status: {status.toString()}</h3>
    )
}

const PuzzleList = (props) => {
    const [puzzles, setPuzzles] = useState(props.puzzles);

    useEffect(() => {
        const loadPuzzlesFromServer = async () => {
            const response = await fetch('/getAllPuzzles');
            const data = await response.json();
            setPuzzles(data.puzzles);
        };
        loadPuzzlesFromServer();
    });

    if (puzzles.length === 0) {
        return (
            <div className='puzzleList'>
                <h3 className='emptyPuzzle'>No Puzzles Yet</h3>
            </div>
        );
    }

    const puzzleNodes = puzzles.map(puzzle => {
        return (
            <div key={puzzle.id} className='prompt'>
                {puzzle.solution.map ((section) => {
                    let src = `assets/img/cardPatterns/${Object.keys(helper.FACES)[section]}.png`;
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

const Profile = () => {
    const [reloadStatus, setReloadStatus] = useState(false);

    return (
        <div>
            <div id='premiumStatus'>
                <Status status={[]} reloadStatus={reloadStatus} />
            </div>
            <div id="puzzleList">
                <PuzzleList puzzles={[]}/>
            </div>
            <div id='toggleForm'>
                <PremiumForm triggerReload={() => setReloadStatus(!reloadStatus)} />
            </div>
            
        </div>
    )
}

const init = () => {
    const root = createRoot(document.getElementById('content'));
    root.render(<Profile />);
};

window.onload = init;