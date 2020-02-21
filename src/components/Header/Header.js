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
  Form,
  NavDropdown
} from 'react-bootstrap';

function Header(props) {
  const { handleSubmit, handleChange, searchString, lastSearch } = props;
  const [modalShow, setModalShow] = useState(false);
  const [storedUser, setStoredUser] = useState(
    localStorage.getItem('storedUserName') || ''
  );
  const [storedEmail, setStoredEmail] = useState(
    localStorage.getItem('storedEmail') || ''
  );
  const [storedAdmin, setStoredAdmin] = useState(
    localStorage.getItem('storedAdmin') || ''
  );

  // https://stackoverflow.com/questions/56356900/way-to-determine-checkbox-checked-in-react-usestate
  const [checked, setChecked] = useState(false);
  const handleClick = () => setChecked(!checked);

  const onChange = () => {};

  const postNewUser = data => {
    const url = 'https://ibcc.herokuapp.com/users';

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
    localStorage.setItem('storedUserName', event.target['name'].value);
    localStorage.setItem('storedEmail', event.target['email'].value);
    setStoredUser(event.target['name'].value);
    setStoredEmail(event.target['email'].value);

    if (checked) {
      if (event.target['admin'].value === process.env.REACT_APP_ADMIN) {
        localStorage.setItem('storedAdmin', event.target['admin'].value);
        setStoredAdmin(event.target['admin'].value);
      }
    }
  };

  const resetStoredName = event => {
    localStorage.clear();
    setStoredUser();
    setStoredAdmin();
    setStoredEmail();
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
                    <Nav.Link eventKey="first" style={{ padding: '1rem' }}>
                      Sign Up
                    </Nav.Link>
                  </Nav.Item>
                </Col>
                <Col sm={100}>
                  <Nav.Item className="nav">
                    <Nav.Link eventKey="second" style={{ padding: '1rem' }}>
                      Login
                    </Nav.Link>
                  </Nav.Item>
                </Col>
              </Nav>
            </Row>
            <Row style={{ margin: '1rem 0 0 0' }}>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <form onSubmit={registerUser}>
                      <>
                        <Form.Group>
                          <Form.Check
                            type="checkbox"
                            label="Admin"
                            onClick={handleClick}
                            onChange={onChange}
                            checked={checked}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your full name"
                            name="name"
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your email"
                            name="email"
                          />
                        </Form.Group>
                        {checked && (
                          <Form.Group>
                            <Form.Label>Admin Key</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Enter admin key"
                              name="admin"
                            />
                          </Form.Group>
                        )}
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </>
                    </form>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <form onSubmit={registerUser}>
                      <>
                        <Form.Group>
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your full name"
                            name="name"
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your email"
                            name="email"
                          />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </>
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
      <Navbar collapseOnSelect expand="lg" id="navbar" variant="dark">
        <Navbar.Brand href="/">
          <img src="/images/gup-logo2.png" alt="GatherUp!" id="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav id="navbarSearch">
            <Search
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              searchString={searchString}
              lastSearch={lastSearch}
            />
          </Nav>
          <Nav align="center" className="mr-auto" id="navbarLogin">
            {!storedUser && (
              <Nav.Link onClick={() => setModalShow(true)}>Login</Nav.Link>
            )}
            {storedUser && (
              <NavDropdown title={storedUser} id="basic-nav-dropdown">
                <NavDropdown.Item href="/manage-event">
                  Manage Events
                </NavDropdown.Item>
                {storedAdmin && (
                  <NavDropdown.Item href="/manage-user">
                    Manage Users
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={resetStoredName}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <CenteredModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default Header;
