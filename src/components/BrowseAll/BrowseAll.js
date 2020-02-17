import React from 'react';
import './Browse.css';
import moment from 'moment'

function BrowseAll(props) {
  const { events } = props;
  return (
    <>
      <div className="results">
        {events.map(event => (
          <div key={event._id} className="event">
            <img src={event.imageUrl} alt="event" />
            <div className="eventDetails">
              <p>{moment(event[event.time]).format('h:mm a')}</p>
              <p>{moment(event[event.date]).format('ddd, MMM Do YYYY')}</p>
              <p>{event.name}</p>
              <p>{event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default BrowseAll;
