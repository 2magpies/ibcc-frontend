import React from 'react';
import './ManageUser.css';

function User() {
  return (
    <div className="postUser">
      <form>
        <div>
          <label>Name</label>
          <input type="text" placeholder="Enter your name" required />
        </div>
        <div>
          <label>Email</label>
          <input type="text" placeholder="Enter email here" required />
        </div>
        <div>
          <label>Location</label>
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" required />
        </div>
      </form>
      <div>
        <button>Submit User</button>
      </div>
    </div>
  );
}

export default User;
