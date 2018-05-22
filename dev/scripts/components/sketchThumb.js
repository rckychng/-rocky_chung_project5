import React from 'react';

export default function(props) {
    return (
        <div className="sketch">
            <div className="sketch__add-button" onClick={() => props.addDrawing(props.drawing.sketch)}>
                <i className="far fa-plus-square"></i>
            </div>
            <div className="sketch__close-button" onClick={() => props.removeDrawing(props.drawing.key)}>
                <i className="far fa-trash-alt"></i>
            </div>
            <img src={props.drawing.sketch} alt="" width="200" height="200"/>
        </div>
    )
}