import React from 'react';
import { Link } from 'react-router-dom';

function Search(props) {
  const { handleSubmit, handleChange, searchString } = props;
  return (
    <form onSubmit={handleSubmit} className="form-horizontal">
      <input
        placeholder="Search events"
        type="text"
        name="searchString"
        required
        onChange={handleChange}
        value={searchString}
      />
      <button type="submit">Submit</button>
      <Link to="/results">
        <button> test</button>
      </Link>
    </form>
  );
}

export default Search;
