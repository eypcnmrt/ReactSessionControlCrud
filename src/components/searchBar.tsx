import React, { useState, useEffect } from 'react';
import { useSearch } from '../context/useSearch';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const [inputValue, setInputValue] = useState(searchTerm);

  console.log('Mevcut searchTerm:', searchTerm);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchTerm(value);
  };

  return (
    <div className="relative w-full search-bar">
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-title"
      />
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Yemek ara..."
        className="search-input p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-title focus:placeholder-transparent w-full"
      />
    </div>
  );
};

export default SearchBar;
