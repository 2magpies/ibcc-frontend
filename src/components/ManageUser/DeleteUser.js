import React, { useEffect, useState } from 'react';

function DeleteUser(props) {
  console.log(props);

  const { match } = props;
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
      })
      .catch(console.error);
  }

  const handleSubmit = e => {
    e.preventDefault();
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        window.location.href = 'http://localhost:3000/manage-user';
      })
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{user.name}</h1>
      <button type="submit">Delete</button>
    </form>
  );
}

export default DeleteUser;
