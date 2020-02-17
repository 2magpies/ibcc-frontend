import React from 'react';
import './Browse.css';

function BrowseAll(props) {
  const { events } = props;
  return (
    <>
      <div className="results">
        {events.map(event => (
          <div key={event._id} className="event">
            <img src={event.imageUrl} alt="event" />
            <div className="eventDetails">
              <span>{event.time}</span>
              <span>{event.date}</span>
              <span>{event.name}</span>
              <span>{event.location}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default BrowseAll;
