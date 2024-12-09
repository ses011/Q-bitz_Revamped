const helper = require('./helper');
const React = require("react");
const { useState, useEffect} = React;
const { useDrag } = require('react-dnd');

const Dice = (props) => {
    const [id] = useState(props.id);
    const [face] = useState(props.face);
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
        type: helper.ItemTypes.DICE,
        item: {id: id, face: face},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),
        // end: (item) => {
            
        // }
    }));

    let die = <img className={face} src={`assets/img/dicePatterns/${face}.png`} alt={face}></img>;
    
    return (
        <div ref={drag}>
            {die}
        </div>
    )
}

module.exports = {
    Dice
};
