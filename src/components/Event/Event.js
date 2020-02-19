import React, { useState, useEffect } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import './Event.css';
import moment from 'moment';
import Map from '../Map/Map';
import RSVP from '../RSVP/RSVP';

function Event(props) {
  const { match } = props;

  const [event, setEvent] = useState([]);

  useEffect(() => {
    getEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Jumbotron style={{ background: `url(${event.imageUrl}) ` }}>
        <div className="eventInfo">
          <h1>{event.name}</h1>
          <h2>
            <p>{moment(event.date).format('ddd, MMM Do YYYY')}</p>
            <p>{event.location}</p>
          </h2>
          <p>
            <Button variant="primary">Buy Tickets (${event.price})</Button>
          </p>
        </div>
      </Jumbotron>
      <div className="eventDescription">
        <p>{event.description}</p>
      </div>
      <div className="mapRsvpContainer">
        <div className="rsvp">
          <RSVP event={event.name} />
        </div>
        <div className="map">
          <Map />
        </div>
      </div>
    </>
  );
}

export default Event;
