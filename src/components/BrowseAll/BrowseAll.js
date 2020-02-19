import React from 'react';
import './Browse.css';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { CardColumns, Card, Jumbotron, Button } from 'react-bootstrap';

function BrowseAll(props) {
  const { events } = props;
  return (
    <>

      <Jumbotron>
        <h1>Hello, world!</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>
      <div className="eventGrid">
        <CardColumns>
          {events.map(event => (
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
    </>
  );
}

export default BrowseAll;
