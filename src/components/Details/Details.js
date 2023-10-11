import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import * as bookService from '../../services/bookService'

import './Details.css'
import DeleteBookModal from "../ModalDialog/DeleteBookModal";

const Details = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [book, setBook] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const year = new Date(book.dateOfPublish).getFullYear();

    useEffect(() => {
        bookService.getById(id)
            .then((b) => setBook(b))
    }, []);
    const toggleDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    };

    const openDeleteModal = () => {
        toggleDeleteModal();
    };

    const closeDeleteModal = () => {
        toggleDeleteModal();
    };

    const likeBook = async () => {
        if (user.id) {
            try {
                const data = { userId: user.id, bookId: id };
                const response = await bookService.likeBook(data, user.token);

                if (response.success) {
                    setBook((prevBook) => ({
                        ...prevBook,
                        likes: prevBook.likes + 1,
                    }));
                } else {
                    console.log(response.message);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    const deleteHandler = async () => {
        try {
            openDeleteModal();
            const response = await bookService.deleteBook(book.id, user.token);

            if (response.success) {

                console.log('Book deleted successfully');
                navigate("/catalog")
            } else {
                console.log(response.message);
            }
        } catch (error) {
            console.error(error);
        }
        finally {
            closeDeleteModal();
        }
    }

    const isOwner = user.id === book.creatorId;

    return (
        <div className="book-details-container">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-xl-7 col-lg-8">
                        <div className="single-book-details mb-50">
                            <div className="book-details">
                                <h2 className="book-title">{book.title}</h2>
                                {book.imageUrl
                                    ?
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <img src={book.imageUrl} alt="Book image" />
                                    </div>
                                    : <h2>No book image</h2>
                                }
                                <br></br>
                                <h2> Genre: {book.genreName}</h2>
                                <div className="d-flex justify-content-center align-items-center">
                                    <span>Date of publish: {year}</span>
                                    <span role="img" aria-label="Heart Emoji" style={{ fontSize: '24px' }}>
                                        ❤️
                                    </span>
                                    <span className="ml-2">Likes: {book.likes}</span>
                                </div>
                                <hr />
                                {user.id &&
                                    (isOwner
                                        ?
                                        (
                                            <div className="d-flex justify-content-center align-items-center">
                                                <Link
                                                    className="btn btn-primary"
                                                    to={`/catalog/edit/${book.id}`}
                                                    style={{ flex: '1', margin: '0 4px' }}
                                                >
                                                    Edit
                                                </Link>
                                                <button onClick={openDeleteModal}
                                                    className="btn btn-danger"
                                                    style={{ flex: '1', margin: '0 4px' }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )
                                        : <div className="d-flex justify-content-center align-items-center">
                                            <button
                                                className="btn btn-primary"
                                                style={{ width: '50px' }}
                                                onClick={likeBook}
                                            >
                                                Like
                                            </button>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                        <div className="book-post-details">
                            <div className="post-details1 mb-50">
                                <div className="small-section-title">
                                    <h3>Book resume</h3>
                                </div>
                                <p className="book-description">{book.resume}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4 col-lg-4">
                        <div className="author-details">
                            <h4 className="author-title">Author Information</h4>
                            {book.author
                                ?
                                <ul className="author-info-list">
                                    {book.author.imageUrl
                                        ?
                                        <img src={book.author.imageUrl} alt="Author image" />
                                        : <h2>No author image</h2>
                                    }
                                    <li>Author: {book.author.firstName} {book.author.lastName}</li>
                                    <li>Age: {book.author.age}</li>
                                </ul>
                                : <h2>No author information</h2>
                            }
                        </div>
                    </div>
                </div>
                <DeleteBookModal
                    show={showDeleteModal}
                    onClose={closeDeleteModal}
                    onDelete={deleteHandler}
                />
            </div>
        </div>
    );
}

export default Details;