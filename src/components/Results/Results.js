import React from 'react';


function Results(props) {
  // destructure the images array from the props object
  const { events } = props;

  // return early if there are no images
  if (!events.length) {
    return <h2>No Events Found!</h2>;
  }

  return (
    <div className="results">
      {events.map(event => (
        <div key={event._id} className="event">
          <p>{event.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Results;
