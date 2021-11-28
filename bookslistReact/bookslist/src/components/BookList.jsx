import React from "react";
import BookItem from "./BookItem";
import "../compStyles/compStyles.css"

export default function BooksList(props) {
    return (
        <ul>
            {props.books.map( (book, index) => {
                return <div className="bookList">
                    <BookItem
                    author = {book.author}
                    title = {book.title}
                    number = {index + 1}
                    /> </div>
            })}
        </ul>
    )
}