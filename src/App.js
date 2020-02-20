import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import Results from './components/Results/Results';
import Event from './components/Event/Event';
import ManageEvents from './components//ManageEvents/ManageEvents';
import ManageUser from './components//ManageUser/ManageUser';
import BrowseAll from './components/BrowseAll/BrowseAll';
import BrowseUsers from './components/ManageUser/BrowseUsers';
import Delete from './components/ManageEvents/Delete';
import Edit from './components/ManageEvents/Edit';

import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [lastSearch, setLastSearch] = useState('');
  const [newResults, setResults] = useState([]);

  useEffect(() => {
    getEvents(searchString);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const url = 'http://ibcc.herokuapp.com/events';

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
    event.preventDefault()
    setSearchString(event.target.value);
    setResults([]);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const searchedResults = events.filter(
      result =>
        (result !== undefined &&
          result.name.toLowerCase().includes(searchString.toLowerCase())) ||
        result.location.toLowerCase().includes(searchString.toLowerCase())
    );
    setResults(searchedResults);
    getEvents(searchString);
  }

  return (
    <div className="App">
      <Header
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        searchString={searchString}
        lastSearch={lastSearch}
      />

      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <BrowseAll
                events={events}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
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
        <Route
          path="/manage-user"
          render={() => {
            return <ManageUser />;
          }}
        />
        <Route
          path="/manage-event"
          render={() => {
            return <ManageEvents events={events} />;
          }}
        />
        <Route
          exact
          path="/:id/delete"
          render={routerProps => {
            return <Delete match={routerProps.match} />;
          }}
        />
        <Route
          exact
          path="/:id/edit"
          render={routerProps => {
            return <Edit match={routerProps.match} />;
          }}
        />


        <Route exact path="/:id/browse-users"
          render={routerProps => {
            return <BrowseUsers match={routerProps.match} />}}/>;
        <Route
          exact
          path="/:id"
          render={routerProps => {
            return <Event match={routerProps.match} />;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
