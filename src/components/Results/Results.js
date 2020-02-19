import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {CardColumns, Card} from 'react-bootstrap'

function Results(props) {
  const { newResults } = props;

  if (!newResults.length) {
    return <h2>No last search Found!</h2>;
  }

  return (
    <div className="resultsGrid">
      <CardColumns>
        {newResults.map(event => (
          <Card key={event._id}>
            <Link to={`/${event._id}`}>
              <Card.Img variant="top" src={event.imageUrl} alt={event.name} />
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>
                  <p>{moment(event.date).format('ddd, MMM Do YYYY')}</p>
                  <p>{event.location}</p>
                </Card.Text>
              </Card.Body>
            </Link>
          </Card>
        ))}
      </CardColumns>
    </div>
  );
}

export default Results;

