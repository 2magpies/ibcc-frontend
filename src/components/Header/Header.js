import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Search from "../Search/Search"

function Header(props) {
  const { handleSubmit, handleChange, searchString, lastSearch } = props;
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
