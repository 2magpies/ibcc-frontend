import React, { useEffect, useState } from 'react';

function Delete(props) {
  console.log(props);

  const { match } = props;
  const [event, setEvent] = useState([]);

  useEffect(() => {
    getEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const url = `http://ibcc.herokuapp.com/events/${match.params.id}`;

  function getEvent() {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        setEvent(response);
      })
      .catch(console.error);
  }

  const handleSubmit = (e) => {
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
        window.location.href = 'http://localhost:3000';
      })
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{event.name}</h1>
      <button type="submit">Delete</button>
    </form>
  );
}

export default Delete;
