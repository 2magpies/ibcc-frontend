import React from 'react';
import { Link } from 'react-router-dom';
import './ManageEvents.css';
import { Form, Col, InputGroup, Button, Row, Card } from 'react-bootstrap';

function ManageEvents(props) {
  const { events } = props;
  const handleSubmit = event => {
    event.preventDefault();

    let data = {};
    data.name = event.target['name'].value;
    data.date = event.target['date'].value;
    data.time = event.target['time'].value;
    data.timezone = event.target['timezone'].value;
    data.location = event.target['location'].value;
    data.description = event.target['description'].value;
    data.price = event.target['price'].value;
    data.imageUrl = event.target['imageUrl'].value;
    data.category = event.target['category'].value;

    postNewEvent(data);
  };

  const postNewEvent = data => {
    const url = 'https://ibcc.herokuapp.com/events';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        response.json();
      })
      .then(data => {
        console.log('Success:', data);
        window.location.href = 'https://gatherupapp.herokuapp.com/';
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <div className="postEvent">
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Col>
              <Form.Group controlId="forName">
                <Form.Label>Name</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Enter name of event"
                  name="name"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control as="select" name="category">
                  <option value="" disabled defaultValue>
                    Choose One
                  </option>
                  <option value="sports">Sports</option>
                  <option value="music">Music</option>
                  <option value="festival">Festival</option>
                  <option value="miscellaneous">Misc.</option>
                  <option value="activism">Activism</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter a date"
                  name="date"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Time</Form.Label>
                <Form.Control type="time" name="time" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Time Zone</Form.Label>
                <Form.Control as="select" name="timezone">
                  <option value="pst">PST</option>
                  <option value="cst">CST</option>
                  <option value="est">EST</option>
                  <option value="mst">MST</option>
                  <option value="hst">HST</option>
                  <option value="akst">AKST</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter location of the event"
              name="location"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description of event"
              name="description"
            />
          </Form.Group>
          <Form.Group>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name="price"
                aria-label="Amount (to the nearest dollar)"
              />
              <InputGroup.Append>
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>Image Url</Form.Label>
            <Form.Control type="text" name="imageUrl" />
          </Form.Group>
          <Button variant="outline-success" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <h3 id="postedEventsHeader">Posted Events</h3>
      <div className="eventGrid">
        {events.map(event => (
          <Card style={{ width: '20rem', marginBottom: '1rem '}} key={event._id}>
            <Col className="event">
              <Card.Img variant="top" src={event.imageUrl} alt="event" />
              <div className="eventDetails">
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title>{event.name}</Card.Title>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Card.Text>{event.description}</Card.Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button variant="outline-info">
                        <Link to={`/${event._id}/edit`}> Edit</Link>
                      </Button>
                    </Col>
                    
                  </Row>
                </Card.Body>
              </div>
            </Col>
          </Card>
        ))}
      </div>
    </>
  );
}

export default ManageEvents;
