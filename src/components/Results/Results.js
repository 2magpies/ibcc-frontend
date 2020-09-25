import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { CardColumns, Card } from 'react-bootstrap';
import './Results.css';

function Results(props) {
  const { newResults, lastSearch } = props;

  return (
    <div id="resultsBox">
      <div id="resultsHeader">
        <h6>
          Found {newResults.length} results for '{lastSearch || 'all'}'
        </h6>
      </div>
      <div id="resultsGrid">
        <CardColumns>
          {newResults.map(event => (
            <Card key={event._id}>
              <Link to={`/${event._id}`}>
                <Card.Img variant="top" src={event.imageUrl} alt={event.name} />
                <Card.Body>
                  <Card.Title>{event.name}</Card.Title>
                  <Card.Text>
                    {dayjs(event.date).format('ddd, MMM DD YYYY')}
                  </Card.Text>
                  <Card.Text>{event.location}</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          ))}
        </CardColumns>
      </div>
    </div>
  );
}

export default Results;
