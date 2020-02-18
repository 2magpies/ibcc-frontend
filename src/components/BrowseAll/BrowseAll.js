import React from 'react';
import './Browse.css';
import moment from 'moment';
import { Link } from 'react-router-dom';

function BrowseAll(props) {
  const { events } = props;
  return (
    <>
      <div className="eventGrid">
        {events.map(event => (
          <div key={event._id} className="event">
            <Link to={`/${event._id}`}>
              <img src={event.imageUrl} alt="event" />
              <div className="eventDetails">
                <h4>{event.name}</h4>
                {/* <p>{moment(event.time).format('h:mm a')}</p> */}
                <p>{moment(event.date).format('ddd, MMM Do YYYY')}</p>
                <p>{event.location}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default BrowseAll;
