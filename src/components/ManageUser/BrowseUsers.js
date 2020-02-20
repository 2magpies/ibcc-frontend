import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Card,
  CardColumns,
  Container,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import DeleteUser from './DeleteUser';

import './ManageUser.css';

function BrowseUsers() {
  const [users, setUser] = useState([]);

  useEffect(() => {
    const url = 'http://ibcc.herokuapp.com/users';
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
      <Container className="userList">
        <div className="userGrid">
          <CardColumns>
            {users.map(user => (
              <Card key={user._id}>
                <Link to={`/${user._id}`}>
                  <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Text>
                      <p>{user.email}</p>
                    </Card.Text>
                  </Card.Body>
                </Link>
                <Row>
                  <Col>
                    <Button variant="outline-info">
                      <Link to={`/${user._id}/edit`}> Edit</Link>
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="outline-danger">
                      <Link to={`/${user._id}/delete`}>Delete</Link>
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
