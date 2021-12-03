import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import StartBookImage from '../../../../static/books/lord-of-the-rings.jpg'

const Faq = () => {
    const LSTORAGE = window.localStorage;
    const localedBooks = JSON.parse(localStorage.getItem('booksShelf'));
    const [books, setBooks] = useState(localedBooks ? localedBooks : []);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [bookImage, setBookImage] = useState('');

    const handleTitle = (ev) => {
        setTitle(ev.target.value);
    }
    const handleAuthor = (ev) => {
        setAuthor(ev.target.value);
    }
    const handleBookImage = (ev) => {
        setBookImage(URL.createObjectURL(ev.target.files[0]));
    }

    useEffect(() => {
        console.log('updated!')
    }, [books, LSTORAGE])

    const likeMe = (el) => {
        el.liked ? el.liked = false : el.liked = true;
    };
    const submitForm = () => {
        if (!!title && !!author && !!bookImage) {
            const newBook = {
                title: title,
                author: author,
                image: bookImage,
                liked: false,
            };
            setBooks([...books, newBook]);
            LSTORAGE.setItem('booksShelf', JSON.stringify([...books, newBook]));
        }
    }
    const handleDelete = (index) => {
        const newBooksList = [...books];
        newBooksList.splice(index, 1);
        setBooks(newBooksList);
        LSTORAGE.setItem('booksShelf', JSON.stringify(newBooksList));
    }

    return (
        <>
            <div className='faq_container'>
                <h3 className='faq_container_title'>Наверное, <Link to='/'><span
                    className='important-text'>все</span></Link> что нужно я уже рассказал, но, обычно еще просят
                    сделать мини базу или некий чеклист:</h3>
                <div className='faq_container_books'>
                    <p>Мини добавлялка книг:</p>
                    <input placeholder='Название' type="text" className='faq_container_books_input'
                           onChange={handleTitle}/>
                    <input placeholder='Автор' type="text" className='faq_container_books_input'
                           onChange={handleAuthor}/>
                    <input type="file" id="file-input" name="ImageStyle" className='faq_container_books_fileadd'
                           onChange={handleBookImage}/>
                    <button type='button' className='faq_container_books_button' onClick={submitForm}>Добавить книгу
                    </button>
                </div>
                <div className='books_container'>
                    {books.map((book, index) => {
                            return (
                                <div key={index} className='book_element'>
                                    <div className='book_element_info'>
                                        <p>{book.title}</p>
                                        <p>{book.author}</p>
                                    </div>
                                    <div
                                        className={book.liked ? 'book_element_like_button-liked' : 'book_element_like_button'}
                                        onClick={() => {likeMe(book)}}>LIKE!
                                    </div>
                                    <button className='book_element_delete_button' onClick={() => handleDelete(index)}>Delete!</button>
                                    <img src={book.image} alt="" height='320px' width='200px'/>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
        </>
    )
}

export default Faq;