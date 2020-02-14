import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Results from './components/Results/Results';
import ManageEvents from './components//ManageEvents/ManageEvents';
import ManageUser from './components//ManageUser/ManageUser';
import BrowseAll from './components/BrowseAll/BrowseAll';

import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [lastSearch, setLastSearch] = useState('');
  const [newResults, setResults] = useState([]);

  useEffect(() => {
    getEvents(searchString);
  }, []);

  const url = 'http://localhost:3001/events';

  function getEvents(searchString) {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        setEvents(response);
        setLastSearch(searchString);
        setSearchString('');
      })
      .catch(console.error);
  }

  function handleChange(event) {
    setSearchString(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const searchedResults = events.filter(
      result =>
        (result !== undefined &&
          result.name.toLowerCase().includes(searchString.toLowerCase())) ||
        result.name.toLowerCase().includes(searchString.toLowerCase())
    );
    setResults(searchedResults);
    getEvents(searchString);
  }

  return (
    <div className="App">
      <Header />
      
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <Search
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                searchString={searchString}
              />
            );
          }}
        />
        <Route
          path={`/results/${lastSearch}`}
          render={() => {
            return <Results lastSearch={lastSearch} newResults={newResults} />;
          }}
        />
        {/* <Route path="/">
          <Redirect to={`/results/${lastSearch}`} />
        </Route> */}
        <Route
          exact
          path="/manage-user"
          render={() => {
            return <ManageUser />;
          }}
        />
        <Route
          exact
          path="/manage-event"
          render={() => {
            return <ManageEvents />;
          }}
        />
      </Switch>
      <BrowseAll events={events} />
    </div>
  );
}

export default App;
