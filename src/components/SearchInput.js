import React, { useState } from 'react';
import { searchUsers } from '../services/api';

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    const result = await searchUsers(query);
    onSearch(result);
  };

  return (
    <div className="search-input">
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск..."
      />
      <button onClick={handleSearch}>Поиск</button>
    </div>
  );
};

export default SearchInput;
