import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Col } from 'react-bootstrap';
import DeleteUser from './DeleteUser';

function EditUser({ match }) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const url = `http://ibcc.herokuapp.com/users/${match.params.id}`;

  function getUser() {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        setUser(response);
        console.log(user);
      })
      .catch(console.error);
  }
  // console.log(user);
  const handleSubmit = event => {
    event.preventDefault();

    let data = {};

    data.name = event.target['name'].value;
    data.email = event.target['email'].value;

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
        console.log('Success:');
        window.location.href = 'http://localhost:3000/manage-user';
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
              <Form.Control type="text" placeholder="name" name="name" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="{email}" name="email" />
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
      <DeleteUser />
    </div>
  );
}

export default EditUser;
