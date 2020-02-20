import React, { useState, useEffect } from 'react';
import {

  Modal,
  Button,
  
  Jumbotron
} from 'react-bootstrap';
import './Event.css';
import moment from 'moment';
import RSVP from '../RSVP/RSVP';

function Event(props) {
  const { match } = props;
  const [modalShow, setModalShow] = useState(false);
  const [event, setEvent] = useState([]);

  useEffect(() => {
    getEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getEvent() {
    const url = `https://ibcc.herokuapp.com/events/${match.params.id}`;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        setEvent(response);
      })
      .catch(console.error);
  }

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
            Buy Tickets or RSVP for Event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RSVP event={event.name} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
   
    <div id="eventDetails">
      <Jumbotron style={{ background: `url(${event.imageUrl}) ` }}>
        <div className="eventInfo">
          <h1>{event.name}</h1>
          <h2>
            <p>{moment(event.date).format('ddd, MMM Do YYYY')}</p>
            <p>{event.location}</p>
          </h2>
          <p>
            <Button onClick={() => setModalShow(true)} variant="primary">
              Buy Tickets (${event.price})
            </Button>
          </p>
        </div>
      </Jumbotron>
      <div className="eventDescription">
        <h5>Event Details</h5>
        <p>{event.description}</p>
      </div>
      <div className="mapRsvpContainer">
        <div className="rsvp">
          <CenteredModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
        {/* <div className="map">
          <Map />
        </div> */}
      </div>
      </div>
   
  );
}

export default Event;
