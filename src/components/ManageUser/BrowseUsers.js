import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, Container, Button, Row, Col } from 'react-bootstrap';
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
      <Container>
        <h4>Active Users</h4>
        <div className="userGrid">
          <ListGroup>
            {users.map(user => (
              <ListGroup.Item key={user._id}>
                <Link to={`/${user._id}`}>
                  <p>
                    {user.name} ({user.email})
                  </p>
                </Link>
                <Row>
                  <Col>
                    <Button variant="outline-info">
                      <Link to={`/${user._id}/edituser`}> Edit</Link>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Container>
    </>
  );
}

export default BrowseUsers;
