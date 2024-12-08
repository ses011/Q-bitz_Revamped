const helper = require('./helper');
const React = require("react");
const { useState, useEffect, PureComponent} = React;

const Dice = (props) => {
    const [id] = useState(props.id);
    const [face] = useState(props.face);

    let img = `assets/img/dicePatterns/${face}.png`;

    return <img id={id} className={face} src={img} alt={face}></img>;
}

module.exports = {
    Dice
};
