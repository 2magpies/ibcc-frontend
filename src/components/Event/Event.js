import React, { useState, useEffect } from 'react';

function Event(props) {
  const { match } = props;

  const [event, setEvent] = useState([]);

  useEffect(() => {
    getEvent();
  }, []);

  function getEvent() {
    const url = `http://ibcc.herokuapp.com/events/${match.params.id}`;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        setEvent(response);
      })
      .catch(console.error);
  }

  return (
    <>
      <div className="Event">
        <h1>{event.name}</h1>
        <h2>
          {event.date}
          {event.time}
        </h2>
        <p>{event.location}</p>
        <p>{event.price}</p>
        <img src={event.imageUrl} alt={event.name} />
        <p>{event.description}</p>
      </div>
    </>
  );
}

export default Event;
