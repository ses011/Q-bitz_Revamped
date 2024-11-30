const helper = require('./helper');
const React = require("react");
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const handleNewPuzzle = (e, onPuzzleAdded) => {
    e.preventDefault();
    helper.hideError();

    const nums = e.target.querySelector('#nums').value;

    if (!nums) {
        helper.handleError("Nums are required!!!");
        return false;
    }

    helper.sendPost(e.target.action, { nums }, onPuzzleAdded);
    return false;
}

const NewPuzzleForm = (props) => {
    return (
        <form id="newPuzzleForm"
            onsubmit={(e) => handleNewPuzzle(e, props.triggerReload)}
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

const DomoList = (props) => {
    const [domos, setDomos] = useState(props.domos);

    useEffect(() => {
        const loadDomosFromServer = async () => {
            const response = await fetch('/getDomos');
            const data = await response.json();
            setDomos(data.domos);
        };
        loadDomosFromServer();
    }, [props.reloadPuzzles]);

    if (domos.length === 0) {
        return (
            <div className='domoList'>
                <h3 className='emptyDomo'>No Domos Yet</h3>
            </div>
        );
    }

    const domoNodes = domos.map(domo => {
        return (
            <div key={domo.id} className='domo'>
                <img src='/assets/img/domoface.jpeg' alt='domo face' className='domoFace' />
                <h3 className='domoName'>Name: {domo.name}</h3>
                <h3 className='domoAge'>Age: {domo.age}</h3>
                <h3 className='domoScore'>Score: {domo.score}</h3>
            </div>
        );
    });

    return (
        <div className='domoList'>
            {domoNodes}
        </div>
    );
};

const App = () => {
    const [reloadPuzzles, setReloadPuzzles] = useState(false);

    return (
        <div>
            <div id='makePuzzle'>
                <NewPuzzleForm triggerReload={() => setReloadPuzzles(!reloadPuzzles)} />
            </div>
            {/* <div id='domos'>
                <DomoList domos={[]} reloadPuzzles={reloadPuzzles} />
            </div> */}
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
};

window.onload = init;