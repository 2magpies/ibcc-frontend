import React from 'react';
import './Browse.css';
import moment from 'moment';

function BrowseAll(props) {
  const { events } = props;
  return (
    <>
      <div className="eventGrid">
        {events.map(event => (
          <div key={event._id} className="event">
            <img src={event.imageUrl} alt="event" />
            <div className="eventDetails">
              <h4>{event.name}</h4>
              {/* <p>{moment(event.time).format('h:mm a')}</p> */}
              <p>{moment(event.date).format('ddd, MMM Do YYYY')}</p>
              <p>{event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default BrowseAll;
