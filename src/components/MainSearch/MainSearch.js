import React from 'react';
import Search from '../Search/Search';

function MainSearch(props) {
  const { handleSubmit, handleChange, searchString, lastSearch } = props;
  return (
    <div className="MainSearch">
      <Search
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        searchString={searchString}
        lastSearch={lastSearch}
      />
    </div>
  );
}

export default MainSearch;
