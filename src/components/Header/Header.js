import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Search from '../Search/Search';

function Header(props) {
  const { handleSubmit, handleChange, searchString, lastSearch } = props;
  const [loginClass, setLoginClass] = useState('loginHide');

  const loginToggle = () => {
    if (loginClass === 'loginHide') {
      setLoginClass('loginShow');
    } else {
      setLoginClass('loginHide');
    }
  };

  const postNewUser = data => {
    const url = 'http://localhost:3001/users';

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

  const registerUser = event => {
    event.preventDefault();
    let data = {};
    data.name = event.target['name'].value;
    data.email = event.target['email'].value;
    postNewUser(data);
  };

  return (
    <>
      <header>
        <div>
          <Link to="/">
            <h1>IBCC</h1>
          </Link>
        </div>
        <Search
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          searchString={searchString}
          lastSearch={lastSearch}
        />
        <nav>
          <ul>
            <Link to="/manage-event">
              <li>Manage Events</li>
            </Link>
            <Link to="/manage-user">
              <li>Manage Users</li>
            </Link>
            <li onClick={loginToggle}>Register</li>
          </ul>
        </nav>
      </header>
      <div id="loginWindow" className={loginClass}>
        <div>
          <form onSubmit={registerUser}>
            <div>
              <label>Name</label>
              <input type="text" placeholder="Enter your name" name="name" />
            </div>
            <div>
              <label>Email</label>
              <input type="text" placeholder="Enter your email" name="email" />
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Header;
