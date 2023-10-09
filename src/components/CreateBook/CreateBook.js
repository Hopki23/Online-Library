import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import * as authorService from '../../services/authorService';
import * as bookService from '../../services/bookService';

import './CreateBook.css';

const CreateBook = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [bookData, setBookData] = useState({
        title: '',
        dateOfPublish: '',
        resume: '',
        genreName: '',
        imageUrl: '',
        authorId: '',
        userId: user.id
    });
    
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        authorService.getAllAuthors()
            .then((a) => setAuthors(a))
    }, [])

    const createBookHandler = async (e) => {
        e.preventDefault();

        try {
            await bookService.createBook(bookData, user.token)

            navigate('/catalog');

        } catch (error) {
            console.log(error);
        }
    };

    const addBookData = (e) => {
        setBookData({ ...bookData, [e.target.name]: e.target.value })
    };

    return (
        <div className="create-book-container">
            <h2>Create a New Book</h2>
            <form onSubmit={createBookHandler} >
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name='title'
                        value={bookData.title}
                        onChange={addBookData}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfPublish">Date of Publish:</label>
                    <input
                        type="date"
                        id="dateOfPublish"
                        name='dateOfPublish'
                        value={bookData.dateOfPublish}
                        onChange={addBookData}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="resume">Resume:</label>
                    <textarea
                        id="resume"
                        name='resume'
                        value={bookData.resume}
                        onChange={addBookData}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="genreName">Genre Name:</label>
                    <input
                        type="text"
                        id="genreName"
                        name='genreName'
                        value={bookData.genreName}
                        onChange={addBookData}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name='imageUrl'
                        value={bookData.imageUrl}
                        onChange={addBookData}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author:</label>
                    <select
                        id="author"
                        name='authorId'
                        value={bookData.selectedAuthor}
                        onChange={(e) => {
                            const selectedAuthor = authors.find(
                                (author) => `${author.firstName} ${author.lastName}` === e.target.value
                            );
                            setBookData({ ...bookData, authorId: selectedAuthor ? selectedAuthor.id : '' });
                        }}
                        required
                    >
                        <option value="">Select an Author</option>
                        {authors.map((author) => (
                            <option key={author.id}>
                                {author.firstName} {author.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Create Book</button>
            </form>
        </div>
    );

}

export default CreateBook;