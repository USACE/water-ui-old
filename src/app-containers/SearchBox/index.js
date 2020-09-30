import React from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";
import './searchbox.css';

const SearchBox = ({value,onChange,onEnterKey,text='search'}) => {


	const handleKeyDown = (event) => {
    var searchString = event.target.value;
    onChange(); //call onChange method - saves new input?
		if (event.key === 'Enter') { //if key pressed Enter, call onEnterKey
		  console.log(searchString);
      //does any submit action
      onEnterKey();
		}
  }


	const searchClass = classnames( //removed :theme
		'bg-white focus:outline-none focus:shadow-outline border border-gray-500 py-2 px-4 block w-full appearance-none leading-normal'
	);

	return (
		<div className="search-box-container" data-test='search-box-container'>
      <input style={{width:'100%'}} className={searchClass} type="search" placeholder={text} onKeyDown={handleKeyDown} defaultValue={value}/>
		</div>
	);

};

SearchBox.defaultProps = {
  text: "Enter search text",
  value: "",
  onChange: ( event ) => null,
  onEnterKey: ( event ) => null,
};

SearchBox.propTypes = {
	title: PropTypes.string,
};

export default SearchBox;
