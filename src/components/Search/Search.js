import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

function Search(props) {
  const [redirect, setRedirect] = useState('');
  const { handleSubmit, handleChange, searchString, lastSearch } = props;

 function handleRedirect(){
    setRedirect(true);
  };

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
      <button type="submit" onClick={handleRedirect}>
        Submit
      </button>
      {redirect && <Redirect to={`/results/${lastSearch}`} />}
    </form>
  );
}

export default Search;
