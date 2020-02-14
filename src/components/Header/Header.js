import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <>
      <header>
        <div>
          <Link to="/">
            <h1>IBCC</h1>
          </Link>
        </div>

        <nav>
          <ul>
            <Link to="/manage-event">
              <li>Manage Events</li>
            </Link>
            <Link to="/manage-user">
              <li>Manage Users</li>
            </Link>
            <li>Search</li>
            <li>Login</li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
