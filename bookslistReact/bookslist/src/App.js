import BooksList from "./components/BookList";
import "./styles.css"
import React, {useState} from "react";

let idDATA = 1;

function App() {
     const [book, setNewbook] = useState([
        {id: 1, author: ' JJ TOLKIEN ', title: ' Lord of the Rings '},
        {id: 2, author: ' Stephen Hoking ', title: ' To The Stars and Back '},
        {id: 3, author: ' Dr.PH Morris ', title: ' Back in Time '},
    ]);

    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    function submitData () {
        const newBook = {
            id: idDATA,
            author: author,
            title: title,
        }
        idDATA++;
        setNewbook([...book, newBook]);
    }

  return (
    <div className="container">
        <div className="inputBlock">
            <input
                type="text"
                placeholder="введите автора"
                value={author}
                onChange={ev => setAuthor(ev.target.value)}/>
            <input
                type="text"
                placeholder="введите название"
                value={title}
                onChange={ev => setTitle(ev.target.value)}/>
            <button onClick={submitData}>Добавить книгу</button>
        </div>
      <h1 className="cont_title">Список Книг</h1>
        <BooksList books={ book }/>
    </div>
  );
}

export default App;
