//  component from https://blog.mailtrap.io/react-send-email/

import React from 'react';
import { Button, Form } from 'react-bootstrap';
class RSVP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: '1',
      name: 'Name',
      email: 'ibcc.tickets@gmail.com',
      to_name: ''
    };
    this.handleTicketsChange = this.handleTicketsChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  handleTicketsChange(event) {
    this.setState({ tickets: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ to_name: event.target.value });
  }

  sendEmail(event) {
    const templateId = 'template_pvU2ZiYC';

    this.sendTickets(templateId, {
      message_html: this.state.tickets,
      from_name: this.state.name,
      reply_to: this.state.email,
      to_name: this.state.to_name
    });
  }

  sendTickets(templateId, variables) {
    window.emailjs
      .send('gmail', templateId, variables)
      .then(res => {
        console.log('Email successfully sent!');
      })
      .catch(err => console.error('Error:', err));
  }
  render() {
    return (
      <>
        <Form className="test-mailing">
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="to_name"
              value={localStorage.getItem('storedEmail') || ""}
              placeholder="Enter email address"
              onChange={this.handleEmailChange}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Number of Tickets</Form.Label>
            <Form.Control
              as="select"
              name="tickets"
              onChange={this.handleTicketsChange}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>

          <Button
            type="Submit"
            className="btn btn--submit"
            onClick={this.sendEmail}
          >
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

export default RSVP;
