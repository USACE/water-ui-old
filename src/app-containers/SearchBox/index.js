import React from 'react';
import PropTypes from 'prop-types';
import './searchbox.css';

const SearchBox = (props) => {
	return (
		<div className='search-box-container'>
            <input className="bg-white focus:outline-none focus:shadow-outline border border-gray-500 py-2 px-4 block w-full appearance-none leading-normal" type="search" placeholder="Search by City, State, ZIP, or Project Names"/>
		</div>
	);
};

SearchBox.propTypes = {
	title: PropTypes.string,
};

export default SearchBox;
