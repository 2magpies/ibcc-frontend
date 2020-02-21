import React, { useEffect, useState } from 'react';
import { Form, Col, InputGroup, Button } from 'react-bootstrap';
import moment from 'moment';
function Edit(props) {
  const { match } = props;
  const [event, setEvent] = useState([]);
  useEffect(() => {
    getEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const url = `https://ibcc.herokuapp.com/events/${match.params.id}`;
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
    for (var propName in data) {
      if (
        data[propName] === null ||
        data[propName] === '' ||
        data[propName] === undefined
      ) {
        delete data[propName];
      }
    }
    updateEvent(data);
  };
  const updateEvent = data => {
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        response.json();
      })
      .then(data => {
        window.location.href = 'https://gatherupapp.herokuapp.com/manage-event';
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  function getEvent() {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        setEvent(response);
      })
      .catch(console.error);
  }
  const deleteEvent = event => {
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        window.location.href = 'https://gatherupapp.herokuapp.com/manage-event';
      })
      .catch(console.error);
  };
  return (
    <>
      <div className="postEvent">
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Col>
              <Form.Group controlId="forName">
                <Form.Label>Name: </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={event.name}
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
                <Form.Label>
                  Date: {moment(event.date).format('ddd, MMM Do YYYY')}
                </Form.Label>
                <Form.Control type="date" name="date" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Time: {event.time}</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  placeholder={event.time}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Time Zone:{event.timezone}</Form.Label>
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
              placeholder={event.location}
              name="location"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder={event.description}
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
                placeholder={event.price}
                aria-label="Amount (to the nearest dollar)"
              />
              <InputGroup.Append>
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>Image Url</Form.Label>
            <Form.Control
              type="text"
              name="imageUrl"
              placeholder={event.imageUrl}
            />
          </Form.Group>
          <Button variant="outline-success" type="submit">
            Submit
          </Button>
          <Button id="deleteEventButton" onClick={deleteEvent}>
            Delete Event
          </Button>
        </Form>
      </div>
    </>
  );
}
export default Edit;
