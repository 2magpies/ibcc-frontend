import React, { useState } from 'react';
import './BrowseAll.css';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  CardColumns,
  Card,
  Jumbotron,
  Button,
  ButtonToolbar
} from 'react-bootstrap';

function BrowseAll(props) {
  const { events } = props;

  const [browsed, setBrowsed] = useState(undefined);

  function sportsBrowse() {
    const browsedResults = events.filter(
      result => result.category === 'sports'
    );
    setBrowsed(browsedResults);
  }

  function musicBrowse() {
    const browsedResults = events.filter(result => result.category === 'music');
    setBrowsed(browsedResults);
  }
  function festivalBrowse() {
    const browsedResults = events.filter(
      result => result.category === 'festival'
    );
    setBrowsed(browsedResults);
  }
  function miscBrowse() {
    const browsedResults = events.filter(result => result.category === 'misc.');
    setBrowsed(browsedResults);
  }
  function activismBrowse() {
    const browsedResults = events.filter(
      result => result.category === 'activism'
    );
    setBrowsed(browsedResults);
  }

  function resetBrowse() {
    setBrowsed(undefined);
  }
  return (
    <>
      <Jumbotron id="browseJumbo">
        <h1>Find and attend local events</h1>
        <p>Start your search above, or browse by category below</p>
        <p>
          <Button variant="primary" href="#browse">
            Browse Events
          </Button>
        </p>
      </Jumbotron>
      <div id="browse">
        <ButtonToolbar>
          <Button
            className="browseButtons"
            variant="outline-secondary"
            onClick={resetBrowse}
          >
            Browse All Events
          </Button>
          <Button
            className="browseButtons"
            variant="outline-secondary"
            onClick={sportsBrowse}
          >
            Sports
          </Button>
          <Button
            className="browseButtons"
            variant="outline-secondary"
            onClick={musicBrowse}
          >
            Music
          </Button>
          <Button
            className="browseButtons"
            variant="outline-secondary"
            onClick={festivalBrowse}
          >
            Festivals
          </Button>
          <Button
            className="browseButtons"
            variant="outline-secondary"
            onClick={activismBrowse}
          >
            Activism
          </Button>
          <Button
            className="browseButtons"
            variant="outline-secondary"
            onClick={miscBrowse}
          >
            Other
          </Button>
        </ButtonToolbar>
      </div>
      {!browsed && (
        <div className="eventGrid">
          <CardColumns>
            {events.map(event => (
              <Card key={event._id}>
                <Link to={`/${event._id}`}>
                  <Card.Img
                    variant="top"
                    src={event.imageUrl}
                    alt={event.name}
                  />
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
      )}
      {browsed !== undefined && (
        <div className="eventGrid">
          <CardColumns>
            {browsed.map(event => (
              <Card key={event._id}>
                <Link to={`/${event._id}`}>
                  <Card.Img
                    variant="top"
                    src={event.imageUrl}
                    alt={event.name}
                  />
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
      )}
    </>
  );
}

export default BrowseAll;
