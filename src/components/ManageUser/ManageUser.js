import React from 'react';
import './ManageUser.css';

function ManageUser() {
  const postNewUser = userData => {
    const userUrl = 'http://localhost:3001/users';

    fetch(userUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(userData => {
        console.log('Success:', userData);
      })
      .catch(error => {
        console.error('Error', error);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    let userData = {};
    userData.name = event.target['name'].value;
    userData.email = event.target['email'].value;
    // userData.city = event.target['city'].value;
    // userData.state = event.target['state'].value;

    postNewUser(userData);
  };
  return (
    <div className="postUser">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter email here"
            name="email"
            required
          />
        </div>
        {/* <div>
          <label>Location</label>
          <input type="text" placeholder="City" name="city" />
          <input type="text" placeholder="State" name="state" />
        </div> */}
        <div>
          <button type="submit">Submit User</button>
        </div>
      </form>
    </div>
  );
}

export default ManageUser;
