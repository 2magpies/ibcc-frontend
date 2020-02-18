import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

function Search(props) {
  const [redirect, setRedirect] = useState('');
  const { handleSubmit, handleChange, searchString, lastSearch } = props;

  function handleRedirect() {
    setRedirect(true);
  }

  return (
    <Form inline onSubmit={handleSubmit}>
      <FormControl
        className="form-horizontal"
        placeholder="Search events"
        type="text"
        name="searchString"
        onChange={handleChange}
        value={searchString}
      />
      <Button type="submit" onClick={handleRedirect} variant="outline-success">
        Search
      </Button>
      {redirect && <Redirect to={`/results/${lastSearch}`} />}
    </Form>
  );
}

export default Search;

{
  /* <form onSubmit={handleSubmit} className="form-horizontal">
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
    </form> */
}
