import { useState, useEffect } from 'react';
import * as authorService from '../../services/authorService'
import './CreateBook.css'

const CreateBook = () => {
    const [bookTitle, setBookTitle] = useState('');
    const [dateOfPublish, setDateOfPublish] = useState('');
    const [resume, setResume] = useState('');
    const [genreName, setGenreName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        authorService.getAllAuthors()
            .then((a) => setAuthors(a))
    }, [])

    const createBookHandler = async (e) => {
        e.preventDefault();


    };

    return (
        <div className="create-book-container">
            <h2>Create a New Book</h2>
            <form onSubmit={createBookHandler} >
                <div className="form-group">
                    <label htmlFor="bookTitle">Title:</label>
                    <input
                        type="text"
                        id="bookTitle"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfPublish">Date of Publish:</label>
                    <input
                        type="date"
                        id="dateOfPublish"
                        value={dateOfPublish}
                        onChange={(e) => setDateOfPublish(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="resume">Resume:</label>
                    <textarea
                        id="resume"
                        value={resume}
                        onChange={(e) => setResume(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="genreName">Genre Name:</label>
                    <input
                        type="text"
                        id="genreName"
                        value={genreName}
                        onChange={(e) => setGenreName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author:</label>
                    <select
                        id="author"
                        value={selectedAuthor}
                        onChange={(e) => setSelectedAuthor(e.target.value)}
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