import React, { useState } from 'react';
import './Header.css';
import Search from '../Search/Search';
import {
  Nav,
  Row,
  Col,
  Navbar,
  Dropdown,
  DropdownButton,
  Modal,
  Button,
  Tab,
  Form
} from 'react-bootstrap';

function Header(props) {
  const { handleSubmit, handleChange, searchString, lastSearch } = props;
  const [modalShow, setModalShow] = useState(false);
  const [storedUser, setStoredUser] = useState(
    localStorage.getItem('storedUserName') || ''
  );
  const [currentUser, setCurrentUser] = useState('');

  const postNewUser = data => {
    const url = 'http://ibcc.herokuapp.com/users';

    fetch(url, {
      method: 'POST',
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
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const registerUser = event => {
    event.preventDefault();
    let data = {};
    data.name = event.target['name'].value;
    data.email = event.target['email'].value;
    postNewUser(data);
    setModalShow(false);
    storeName(event);
  };

  const storeName = event => {
    localStorage.setItem('storedUserName', currentUser);
    event.preventDefault();
    setStoredUser(currentUser);
    setCurrentUser('');
  };

  const resetStoredName = event => {
    localStorage.clear();
    setStoredUser(event.target.value);
  };

  const changeUserName = event => {
    event.preventDefault();
    setCurrentUser(event.target.value);
  };

  function CenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Sign Up or Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tab.Container defaultActiveKey="first">
            <Row>
              <Nav fill variant="tabs" className="flex-row">
                <Col sm={100}>
                  <Nav.Item className="nav">
                    <Nav.Link eventKey="first">Sign Up</Nav.Link>
                  </Nav.Item>
                </Col>
                <Col sm={100}>
                  <Nav.Item className="nav">
                    <Nav.Link eventKey="second">Login</Nav.Link>
                  </Nav.Item>
                </Col>
              </Nav>
            </Row>
            <Row>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <form onSubmit={registerUser}>
                      <Form>
                        <Form.Group>
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your full name"
                            name="name"
                            onChange={changeUserName}
                          />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your email"
                            name="email"
                          />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                          <Form.Check type="checkbox" label="Admin" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </Form>
                    </form>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <form onSubmit={registerUser}>
                      <Form>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your full name"
                            name="name"
                          />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your email"
                            name="email"
                          />
                        </Form.Group>
                        {/* <Form.Group controlId="formBasicCheckbox">
                          <Form.Check type="checkbox" label="Admin" />
                        </Form.Group> */}
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </Form>
                    </form>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <Navbar bg="light" variant="light" className="navbar">
        <Navbar.Brand href="/">IBCC</Navbar.Brand>
        <Search
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          searchString={searchString}
          lastSearch={lastSearch}
        />
        <Nav.Link href="/manage-event">Post an Event</Nav.Link>
        {storedUser && (
          <DropdownButton alignRight title={storedUser} id="dropdownMenu">
            <Dropdown.Item eventKey="1" href="/manage-event">
              Manage Events
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" href="/manage-user">
              Manage Users
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4" onClick={resetStoredName}>
              Logout
            </Dropdown.Item>
          </DropdownButton>
        )}
        {!storedUser && (
          <Button variant="outline-primary" onClick={() => setModalShow(true)}>
            Login
          </Button>
        )}
        <CenteredModal show={modalShow} onHide={() => setModalShow(false)} />
      </Navbar>
    </>
  );
}

export default Header;
