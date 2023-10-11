import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import * as bookService from "../../services/bookService";
import * as authorService from "../../services/authorService";


import './EditBook.css'


const EditBook = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [bookData, setBookData] = useState({
        title: '',
        dateOfPublish: '',
        resume: '',
        genreName: '',
        imageUrl: '',
        authorId: ''
    });
    const [authors, setAuthors] = useState([]);
    const [selectedAuthorName, setSelectedAuthorName] = useState("");
    const [selectedAuthorId, setSelectedAuthorId] = useState("");

    useEffect(() => {
        authorService.getAllAuthors()
            .then((a) => setAuthors(a))
    }, [])

    useEffect(() => {
        bookService.getById(id)
            .then(b => {
                setBook(b);
                setSelectedAuthorName(`${b.author.firstName} ${b.author.lastName}`);
                setSelectedAuthorId(b.author.id);

                const formattedDate = new Date(b.dateOfPublish).toISOString().split('T')[0];
                setBookData({
                    title: b.title,
                    dateOfPublish: formattedDate,
                    resume: b.resume,
                    genreName: b.genreName,
                    imageUrl: b.imageUrl,
                    authorId: b.author.id,
                });
            })
    }, [id]);

    const addBookData = (e) => {
        setBookData({ ...bookData, [e.target.name]: e.target.value })
    };

    const handleAuthorChange = (e) => {
        const selectedAuthor = authors.find(
            (author) => `${author.firstName} ${author.lastName}` === e.target.value
        );
        setSelectedAuthorName(selectedAuthor ? e.target.value : "");
        setSelectedAuthorId(selectedAuthor ? selectedAuthor.id : "");
    };

    const editBookHandler = async (e) => {
        e.preventDefault();
        
        await bookService.updateBook({ ...bookData, authorId: selectedAuthorId }, id, user.token);
        navigate(`/catalog/details/${id}`);
    };

    return (
        <div className="edit-container">
            <h2>Edit Book</h2>
            <form onSubmit={editBookHandler}>
                <div className="edit-form">
                    <div className="form-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            defaultValue={book.title}
                            value={bookData.title}
                            onChange={addBookData}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date of Publish:</label>
                        <input
                            type="date"
                            name="dateOfPublish"
                            defaultValue={book.dateOfPublish}
                            value={bookData.dateOfPublish}
                            onChange={addBookData}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageUrl">Image URL:</label>
                        <input
                            type="text"
                            id="imageUrl"
                            name='imageUrl'
                            defaultValue={book.imageUrl}
                            value={bookData.imageUrl}
                            onChange={addBookData}
                        />
                    </div>
                    <div className="form-group">
                        <label>Resume:</label>
                        <textarea
                            name="resume"
                            defaultValue={bookData.resume}
                            onChange={addBookData}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Genre Name:</label>
                        <input
                            type="text"
                            name="genreName"
                            defaultValue={book.genreName}
                            value={bookData.genreName}
                            onChange={addBookData}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author:</label>
                        <select
                            id="author"
                            name='authorId'
                            value={selectedAuthorName}
                            onChange={handleAuthorChange}
                        >
                            <option value="">Author</option>
                            {authors.map((author) => (
                                <option key={author.id} value={`${author.firstName} ${author.lastName}`}>
                                    {author.firstName} {author.lastName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input type="submit" className="save-button" value="Save" />
                </div>
            </form>
        </div>
    );
}

export default EditBook;
