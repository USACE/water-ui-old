import React from 'react';
import PropTypes from 'prop-types';

const TextSection = (props) => {
	const { title, body } = props;
	return (
		<div className="text-section-container">
			<h3>{title}</h3>
			<p>{body}</p>
		</div>
	);
};

TextSection.propTypes = {
	title: PropTypes.string,
	body: PropTypes.string,
};

export default TextSection;
