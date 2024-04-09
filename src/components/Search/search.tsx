import React, { useState } from 'react';
import './search.css';
import { useMutation } from '@tanstack/react-query';
import RelicAPI from '../../../src/app/api/Relic/relic';

const Search = ({ setSearchData, page, size }: any) => {
    const [searchTerm, setSearchTerm] = useState('');

    const relicsSearch = useMutation({
        mutationFn: () => RelicAPI.searchRelics(searchTerm, page, 20),
        onMutate: () => {
            console.log('onMutate', searchTerm);
        },
        onSuccess: (data) => {
            console.log('onSuccess', data);
        },
    });

    const performSearch = (e: React.FormEvent) => {
        e.preventDefault();
        relicsSearch.mutate();
        setSearchTerm('');
        // setSearchData(relicsSearch.data); // Call the setSearchData function with the data
    };

    return (
        <div className="search-container">
            <form onSubmit={performSearch}>
                <input
                    className="search_input"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Знайти"
                />
                <button
                    type="submit"
                    className="search_btn"
                >
                    <img src="./icons/search.svg" />
                </button>
            </form>
        </div>
    );
};

export default Search;
