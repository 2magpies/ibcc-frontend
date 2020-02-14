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
            <li>Search</li>
            <Link to="/manage-user">
              <li>Login</li>
            </Link>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
