const helper = require("./helper.js");
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const handleToggle = (e, handler) => {
    e.preventDefault();
    helper.hideError();
    
    helper.sendPost(e.target.action, {}, handler);
    return false;
}

const PremiumForm = (props) => {
    return (
        <form id="premiumForm"
            name="premiumForm"
            onSubmit={(e) => handleToggle(e, props.triggerReload) }
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
    },[false]);

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
                <Status status={""} reloadStatus={reloadStatus} />
            </div>
            <div id="puzzleList">
                <PuzzleList puzzles={[]} />
            </div>
            <div id='toggleForm'>
                <PremiumForm triggerReload={() => setReloadStatus(!reloadStatus)} />
            </div>
            
        </div>
    )
}

const handleChangePass = (e) => {
    e.preventDefault();
    helper.hideError();

    const current = e.target.querySelector('#current').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;

    if(!current || !pass || !pass2) {
        helper.handleError("ALL fields are required");
        return false;
    }

    if (pass !== pass2) {
        helper.handleError("Passwords do not match");
        return false;
    }

    helper.sendPost(e.target.action, {current, pass, pass2});
    return false;
}

const ChangePass = (props) => {
    return (
        <form id="changePassForm"
            name="changePassForm"
            onSubmit= {handleChangePass}
            action="/changePass"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="current">Username: </label>
            <input id="current" type="text" name="current" placeholder="current password"/>
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="new password"/>
            <label htmlFor="pass">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype new password"/>
            <input className='formSubmit' type="submit" value="Change Password"/>
        </form>
    );
}

const init = () => {
    const root = createRoot(document.getElementById('content'));
    const changeButton = document.querySelector("#passChange");

    changeButton.onclick = (e) => {
        e.preventDefault();
        root.render(<ChangePass />);
        return false;
    }

    root.render(<Profile />);

};

window.onload = init;