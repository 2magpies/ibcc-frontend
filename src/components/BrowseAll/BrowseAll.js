import React from 'react';

function BrowseAll(props) {
  const { events } = props;
  return (
    <>
    
      <div className="results">
        {events.map(event => (
          <div key={event._id} className="event">
            <img src={event.imageUrl} alt="event"/>
            <p>{event.time}</p>
            <p>{event.date}</p>
            <p>{event.name}</p>
            <p>{event.location}</p>
            
          </div>
        ))}
      </div>
    </>
  );
}

export default BrowseAll;
