import React from "react";

const ColorCard = (props) => {
    return (
        <div className='colorCard' style={{backgroundColor: props.color}}>
            <span className='colorCard-text'>{props.color.toUpperCase()}</span>
        </div>
    )
}

export default ColorCard;