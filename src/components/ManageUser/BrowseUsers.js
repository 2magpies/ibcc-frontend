import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Card, CardColumns, Container } from 'react-bootstrap';

//import './App.css';
import './ManageUser.css';

function BrowseUsers({ match }) {
  const [users, setUser] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState(false);

  useEffect( => {
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

  const deleteUser = event => {
    const url = `http://ibcc.herokuapp.com/users/${match.params._id}`;
    fetch(url, { method: 'DELETE' })
      .then(res => {
        setDeleted(true);
      })
      .catch(console.error);
  };
  if (deleted) {
    return <Redirect to="/manage-user" />;
  }

  if (error) {
    return <div>Sorry, there was a problem getting the user list</div>;
  }

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container className="userList">
        <div className="eventGrid">
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
                <button onClick={deleteUser}>Delete</button>
              </Card>
            ))}
          </CardColumns>
        </div>
      </Container>
    </>
  );
}

export default BrowseUsers;
