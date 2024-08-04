import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSearch} className="mb-4">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Anime"
                className="p-2 rounded-l-lg border border-gray-400"
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-lg border border-blue-500">
                Search
            </button>
        </form>
    );
};

export default SearchBar;
