import React from 'react';

export default function(props) {
    return (
        <div className="sketch">
            <div className="sketch__close-button">
                <i className="far fa-trash-alt" onClick={() => props.removeSketch()}></i>
            </div>
            <img src={props.drawing.sketch} alt="" width="175" height="175"/>
        </div>
    )
}