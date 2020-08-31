import React from 'react';
import PropTypes from 'prop-types';

const DropDown = (props) => {
	const { label, id, onChange, options } = props;
	return (
		<div className="dropdown-container form-group">
			<select className="form-control" id={id} aria-labelledby={label}>
				{options.map((item,i) => (
					<option key={i} onChange={()=>onChange()}>{item}</option>
				))}
			</select>
		</div>
	);
};

DropDown.propTypes = {
	title: PropTypes.string,
};

export default DropDown;
