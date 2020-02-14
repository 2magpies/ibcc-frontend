import React, { useState, useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Results from './components/Results/Results';

import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [searchString, setSearchString] = useState('');
  // const [lastSearch, setLastSearch] = useState('');

  useEffect(() => {
    getEvents(searchString);
  }, []);

  function getEvents(searchString) {
    /* Build a URL from the searchOptions object */
    const url = 'http://localhost:3001/events';

    fetch(url)
      .then(response => response.json())
      .then(response => {
        setEvents(response.data);
        // setLastSearch(searchString);
        setSearchString('');
      })
      .catch(console.error);
  }

  function handleChange(event) {
    setSearchString(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    getEvents(searchString);
  }

  return (
    <div className="App">
      <Header />
      <Search
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        searchString={searchString}
      />
      <Results events={events} />
    </div>
  );
}

export default App;
