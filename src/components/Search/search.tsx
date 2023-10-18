import React, { useState } from 'react';
import './search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const performSearch = () => {
    // placeholder for real logic
    setSearchTerm('');    
  };

  return (
    <div className="search-container">
      <input className="search_input"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Знайти експонат"
      />
      <button onClick={performSearch} className="search_btn"><img src="./icons/search.svg"/></button>
    </div>
  );
};

export default Search;