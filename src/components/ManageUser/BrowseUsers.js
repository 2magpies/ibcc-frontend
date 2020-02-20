import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardColumns,
  Container,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import './ManageUser.css';

function BrowseUsers() {
  const [users, setUser] = useState([]);

  useEffect(() => {
    const url = 'https://ibcc.herokuapp.com/users';
    fetch(url)
      .then(response => response.json())
      .then(response => {
        setUser(response);
      })
      .catch(console.error);
  }, []);
  if (!users) {
    return null;
  }

  return (
    <>
      <Container className="col-2-3 browseUser">
        <div className="userGrid">
          <CardColumns>
            {users.map(user => (
              <Card key={user._id}>
                <Link to={`/${user._id}`}>
                  <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Text>{user.email}</Card.Text>
                  </Card.Body>
                </Link>
                <Row>
                  <Col>
                    <Button variant="outline-info">
                      <Link to={`/${user._id}/edituser`}> Edit</Link>
                    </Button>
                  </Col>
                </Row>
              </Card>
            ))}
          </CardColumns>
        </div>
      </Container>
    </>
  );
}

export default BrowseUsers;
