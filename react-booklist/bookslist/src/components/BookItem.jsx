import React from "react";
import "../compStyles/compStyles.css";

function BookItem(props) {
    return <div className="itemCard">
        <p> {props.number}.
         Author: <strong>{ props.author }</strong>
        Title: {props.title} </p>
    </div>
}

export default BookItem;
