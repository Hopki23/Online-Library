import { useState, useEffect } from 'react';
import * as bookService from '../../services/book-services';

import './Catalog.css'

const Catalog = () => {
    const [book, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        bookService.getAll()
            .then((b) => setBooks(b))
    }, []);

    const filteredBooks = book.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
      };

    return (
        <div className="catalog-container">
            <h2>Book Catalog</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className="book-list">
                {filteredBooks.map((book) => (
                    <div key={book.id} className="book-item">
                        <img
                            src={book.imageUrl}
                            alt={`Cover of ${book.title}`}
                            className="book-image"
                        />
                        <h3 className="book-title">{book.title}</h3>
                        <p>About: {book.resume}</p>
                        <p>Genre: {book.genreName}</p>
                        <button className="details-button">Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Catalog;