import React from 'react';
import axios from 'axios';

// component from https://medium.com/@binhchung48/create-a-contact-form-with-nodemailer-react-js-and-express-js-7757d41e2448

function RSVP() {
  function handleEmailSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    axios({
      method: 'POST',
      url: 'http://localhost:3001/send',
      data: {
        name: name,
        email: email,
        messsage: message
      }
    }).then(response => {
      if (response.data.msg === 'success') {
        alert('Message Sent.');
        resetForm();
      } else if (response.data.msg === 'fail') {
        alert('Message failed to send.');
      }
    });
  }

  function resetForm() {
    document.getElementById('contact-form').reset();
  }

  return (
    <div className="RSVPBox">
      <form id="contact-form" onSubmit={handleEmailSubmit} method="POST">
        <div className="form-group">
          <label for="name">Name</label>
          <input type="text" className="form-control" id="name" />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label for="message">Message</label>
          <textarea className="form-control" rows="5" id="message"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default RSVP;
