import React from 'react';
import './ManageEvents.css';
import { Form, Dropdown, Col, InputGroup, Button } from 'react-bootstrap';

function ManageEvents() {
  const postNewEvent = data => {
    const url = 'http://ibcc.herokuapp.com/events';

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
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleSubmit = event => {
    console.log(event);
    event.preventDefault();
    let data = {};
    data.name = event.target['name'].value;
    data.date = event.target['date'].value;
    data.time = event.target['time'].value;
    data.timezone = event.target['timezone'].value;
    data.description = event.target['description'].value;
    data.price = event.target['price'].value;
    data.imageURL = event.target['imageURL'].value;
    data.category = event.target['category'].value;

    postNewEvent(data);
    window.location.href = 'http://localhost:3000';
  };

  return (
    <div className="postEvent">
      <form onSubmit={handleSubmit}>
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
              <label id="category" name="category">
                Category
              </label>
              <select id="category">
                <option value="" disabled defaultValue>
                  Choose One
                </option>
                <option value="sports">Sports</option>
                <option value="music">Music</option>
                <option value="festival">Festival</option>
                <option value="miscellaneous">Misc.</option>
                <option value="activism">Activism</option>
              </select>
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
              <label name="timezone">Timezone</label>
              <select id="timezone">
                <option value="pst">PST</option>
                <option value="cst">CST</option>
                <option value="est">EST</option>
                <option value="mst">MST</option>
                <option value="hst">HST</option>
                <option value="akst">AKST</option>
              </select>
            </Form.Group>
          </Col>
        </Form.Row>

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
          <Form.Control type="text" name="imageURL" />
        </Form.Group>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ManageEvents;
