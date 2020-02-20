import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Col, Row } from 'react-bootstrap';

function EditUser(props) {
  const { match } = props;

  const [user, setUser] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const url = `http://ibcc.herokuapp.com/users/${user._id}`;

  function getUser() {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        setUser(response);
      })
      .catch(console.error);
  }

  const handleSubmit = e => {
    e.preventDefault();

    let data = {};

    data.name = user.target['name'].value;

    const updateUser = data => {
      console.log('fetch PUT reached');
    };
  };

  return (
    <div>
      <Container className="postUser">
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGrid">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder={user.name} name="name" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder={user.email}
                name="email"
              />
            </Form.Group>
          </Form.Row>
          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Admin" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default EditUser;
