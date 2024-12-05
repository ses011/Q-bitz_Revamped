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

const Profile = () => {
    const [reloadStatus, setReloadStatus] = useState(false);

    return (
        <div>
            <div id='premiumStatus'>
                <Status status={[]} reloadStatus={reloadStatus} />
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