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

const ItemTypes = {
    DICE: 'dice'
}

const handleError = (message) => {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('domoMessage').classList.remove('hidden');
};

const sendPost = async (url, data, handler) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    document.getElementById('domoMessage').classList.add('hidden');

    if (result.redirect) {
        window.location = result.redirect;
    }

    if (result.error) {
        handleError(result.error);
    }

    if (handler) {
        handler(result);
    }
};


const hideError = () => {
    document.getElementById('domoMessage').classList.add('hidden');
};

module.exports = {
    handleError,
    FACES,
    ItemTypes,
    sendPost,
    hideError,
};