import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import './Search.css';

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
        id="searchbar"
        placeholder="Search events"
        type="text"
        name="searchString"
        onChange={handleChange}
        value={searchString}
      />
      <Button
        id="searchButton"
        type="submit"
        onClick={handleRedirect}
        variant="outline-success"
      >
        Search
      </Button>
      {redirect && <Redirect to={`/results/${lastSearch}`} />}
    </Form>
  );
}

export default Search;
