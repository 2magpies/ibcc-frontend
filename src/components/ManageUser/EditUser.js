import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

function EditUser() {
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
    data.email = user.target['email'].value;

    for (var propName in data) {
      if (
        data[propName] === null ||
        data[propName] === '' ||
        data[propName] === undefined
      ) {
        delete data[propName];
      }
    }

    updateUser(data);
  };

  const updateUser = data => {
    console.log('fetch PUT reached');
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        response.json();
      })
      .then(data => {
        console.log('Success:', data);
        window.location.href = 'http://localhost:3000';
      })
      .catch(error => {
        console.error('Error:', error);
      });
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
