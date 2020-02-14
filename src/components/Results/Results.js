import React from 'react';

function Results(props) {
  const { newResults } = props;

  if (!newResults.length) {
    return <h2>No last search Found!</h2>;
  }

  return (
    <div className="results">
      {newResults.map(event => (
        <div key={event._id} className="event">
          <p>{event.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Results;
