import React from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";
import './searchbox.css';

const SearchBox = ({text='search',theme='light'}) => {

	const searchClass = classnames({
		'bg-white focus:outline-none focus:shadow-outline border border-gray-500 py-2 px-4 block w-full appearance-none leading-normal': theme === 'light',
		'bg-gray-700 focus:outline-none focus:shadow-outline py-2 px-4 block w-full appearance-none leading-normal': theme === 'dark'
	  });

	return (
		<div className="search-box-container" data-test='search-box-container'>
            <input className={searchClass} type="search" placeholder={text}/>
		</div>
	);
};

SearchBox.propTypes = {
	title: PropTypes.string,
};

export default SearchBox;
