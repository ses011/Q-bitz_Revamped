const helper = require('./helper');
const React = require("react");
const { useState, useEffect } = React;
const { useDrag } = require('react-dnd');

const Dice = (props) => {
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
        type: helper.ItemTypes.DICE,
        item: { face: props.face },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),

    }));

    let src = "";
    if (props.face) {
        src = `assets/img/dicePatterns/${props.face}.png`;
    }
    let die = <img className={props.face} src={src} alt={props.face} onError={() => this.src = 'assets/img/transparent.png'}></img>;

    return (
        <div ref={drag}>
            {die}
        </div>
    )
}

module.exports = {
    Dice
};
