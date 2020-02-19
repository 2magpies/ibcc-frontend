import React from 'react';
import './ManageUser.css';
import {
  Col,
  Button,
  Form,
  Container
} from 'react-bootstrap';
import BrowseUser from './BrowseUsers';

function ManageUser() {
  const postNewUser = userData => {
    const userUrl = 'http://ibcc.herokuapp.com/users';

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
    // userData.city = event.target['city'].value;
    // userData.state = event.target['state'].value;

    postNewUser(userData);
  };
  return (
    <div>
      <Container className="postUser">
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGrid">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="name"
              />
            </Form.Group>

            {/* <Form.Group as={Col} controlId="formGrid">
            <Form.Label>Last Name</Form.Label>
            <Form.Control />
          </Form.Group> */}
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
              />
            </Form.Group>

            {/* <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group> */}
          </Form.Row>

          {/* <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control as="select" value="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>
          </Form.Row> */}

          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Admin" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
      <BrowseUser />
    </div>
  );
}

export default ManageUser;
