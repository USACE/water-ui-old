import React from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";

const SearchBox = ({value,onChange,onEnterKey,text}) => {

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') onEnterKey( event );
  }

  const onChangeHandler = (event) => {
    onChange( event );
  }

	const searchClass = classnames( //removed :theme
		'bg-white focus:outline-none focus:shadow-outline border border-gray-500 py-2 px-4 block w-full appearance-none leading-normal'
	);

	return (
		<div key="searchbox" className="search-box-container" data-test='search-box-container'>
      <input style={{width:'100%'}} role="searchbox" className={searchClass} type="search" placeholder={text} onKeyDown={handleKeyDown} onChange={onChangeHandler} value={value}/>
		</div>
	);

};

SearchBox.defaultProps = {
  text: "Enter search text",
  value: undefined,
  onChange: ( event ) => null,
  onEnterKey: ( event ) => null,
};

SearchBox.propTypes = {
	text: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onEnterKey: PropTypes.func
};

export default SearchBox;
