import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'
import * as authorService from '../../services/authorService'

import './CreateAuthor.css'

const CreateAuthor = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [authorData, setAuthorData] = useState({
        firstName: '',
        lastName: '',
        imageUrl: '',
        age: 0
    });

    const createAuthorHandler = async (e) => {
        e.preventDefault();

        try {
            await authorService.createAuthor(authorData, user.token);
            navigate('/catalog');
        } catch (error) {
            console.log(error);
        }
    };

    const addAuthorData = (e) => {
        setAuthorData({ ...authorData, [e.target.name]: e.target.value })
    };

    return (
        <div className="create-author-container">
            <h2>Create a New Author</h2>
            <form onSubmit={createAuthorHandler}>
                <div className="form-group">
                    <label htmlFor="authorFirstName">Author First Name:</label>
                    <input
                        type="text"
                        id="authorFirstName"
                        name='firstName'
                        value={authorData.firstName}
                        onChange={addAuthorData}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="authorLastName">Author Last Name:</label>
                    <input
                        type="text"
                        id="authorLastName"
                        name='lastName'
                        value={authorData.lastName}
                        onChange={addAuthorData}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="authorImage">Author Image:</label>
                    <input
                        type="text"
                        id="authorImage"
                        name='imageUrl'
                        value={authorData.imageUrl}
                        onChange={addAuthorData}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="authorAge">Author Age:</label>
                    <input
                        type="number"
                        id="authorAge"
                        name='age'
                        value={authorData.age}
                        onChange={addAuthorData}
                        required
                    />
                </div>
                <button type="submit">Create Author</button>
            </form>
        </div>
    );
}

export default CreateAuthor;