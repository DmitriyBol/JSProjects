import BooksList from "./components/BookList";
import "./styles.css"
import React, {useState} from "react";

function App() {
     const [book, setNewbook] = useState([]);

    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const authorHander = (e) => {
        setAuthor(e.target.value);
    }
    const titleHandler = (e) => {
        setTitle(e.target.value);
    }
    const submitData = () => {
        setNewbook([...book, {
            title: title,
            author: author,
        }])
    }
    const deleteHandler = (id) => {
        const newBooksList = [...book];
        newBooksList.splice(id, 1);
        setNewbook(newBooksList);
    }

  return (
    <div className="container">
        <div className="inputBlock">
            <input
                type="text"
                placeholder="введите автора"
                value={author}
                onChange={authorHander}/>
            <input
                type="text"
                placeholder="введите название"
                value={title}
                onChange={titleHandler}/>
            <button onClick={submitData}>Добавить книгу</button>
        </div>
      <h1 className="cont_title">Список Книг</h1>
        {book && (
            book.map((el, index) => {
                return (
                    <div id={index} style={{border: '1px solid black', padding: '5px', margin: '5px 0', display: 'flex', justifyContent: 'space-evenly', alignItems:'center'}}>
                        {el.author} - {el.title} IS GAY
                        <button style={{
                            padding: '10px',
                            backgroundColor: 'darkred',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }} onClick={() => deleteHandler(index)}>
                            delete
                        </button>
                    </div>
                )
            })
        )}
    </div>
  );
}

export default App;
