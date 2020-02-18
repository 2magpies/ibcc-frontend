import React from 'react';
import { Link } from 'react-router-dom';

function Results(props) {
  const { newResults } = props;

  if (!newResults.length) {
    return <h2>No last search Found!</h2>;
  }

  return (
    <div className="results">
      {newResults.map(event => (
        <div key={event._id} className="event">
          <Link to={`/${event._id}`}>
            <p>{event.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Results;
