import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';

import * as bookService from '../../services/book-services';
import { Link } from 'react-router-dom';

const Home = () => {
  const [book, setBooks] = useState([]);

  useEffect(() => {
    bookService.getAll()
      .then((b) => setBooks(b));
  }, []);

  return (
    <>
      <h2 className="text-center">Most liked books by the users</h2>
      <Container>
        <Row className="justify-content-center">
          {book.map((book) => (
            <Col key={book.id}>
              <Card style={{ width: '18rem', marginBottom: '20px' }}>
                <Card.Img variant="top" src={book.imageUrl} />
                <Card.Body>
                  <Card.Title className='text-center'>{book.title}</Card.Title>
                   <div className="d-flex justify-content-center align-items-center">
                      <span role="img" aria-label="Heart Emoji" style={{ fontSize: '24px' }}>
                        ❤️
                      </span>
                      <span className="ml-2">Likes: {book.likes}</span>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <Button variant="primary">Details
                      <Link to= {`catalog/details/${book.id}`}></Link>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
