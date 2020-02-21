import React from 'react';
import './ManageUser.css';
import { Col, Button, Form, Card } from 'react-bootstrap';
import BrowseUser from './BrowseUsers';

function ManageUser() {
  const postNewUser = userData => {
    const userUrl = 'https://ibcc.herokuapp.com/users';

    fetch(userUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(userData => {
        console.log('Success:', userData);
        window.location.href = 'https://gatherupapp.herokuapp.com/manage-user';
      })
      .catch(error => {
        console.error('Error', error);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    let userData = {};
    userData.name = event.target['name'].value;
    userData.email = event.target['email'].value;

    postNewUser(userData);
  };

  return (
    <div id="manageUsers">
      <div>
        <h4>Add New User</h4>
        <Card id="manageUserPost" style={{ width: '18rem', padding: '1rem' }}>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGrid">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email address"
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
        </Card>
      </div>
      <div>
        <BrowseUser />
      </div>
    </div>
  );
}

export default ManageUser;
