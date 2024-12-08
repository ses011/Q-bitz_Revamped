const helper = require('./helper');
const React = require("react");
const { useState, useEffect} = React;
const { useDrag } = require('react-dnd');

const Dice = (props) => {
    const [id] = useState(props.id);
    const [face] = useState(props.face);
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
        type: helper.ItemTypes.DICE,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    let img = `assets/img/dicePatterns/${face}.png`;

    let die = <img id={id} className={face} src={img} alt={face}></img>;
    
    return (
        <div ref={drag}>
            {die}
        </div>
    )
}

module.exports = {
    Dice
};
