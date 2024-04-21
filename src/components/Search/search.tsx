import React, { useState } from 'react';
import './search.css';
import { useMutation } from '@tanstack/react-query';
import RelicAPI from '../../../src/app/api/Relic/relic';
import { Filters } from '../Catalogue/catalogue';
import { useLocation, useNavigate } from 'react-router-dom';

const Search = ({ setSelectedFilterOptions}: any) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const performSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (pathname === '/catalogue') {
            setSelectedFilterOptions((prevOptions: Filters) => ({
                ...prevOptions,
                name: searchTerm,
            }));
            setSearchTerm('');
        } else {
            navigate(`/catalogue?name=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={performSearch} className="w-full">
                <input
                    className="search_input w-full"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Знайти"
                />
                <button type="submit" className="search_btn">
                    <img src="./icons/search.svg" />
                </button>
            </form>
        </div>
    );
};

export default Search;

