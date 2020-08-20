import React from 'react';
import PropTypes from 'prop-types';

// made default parmeters for TextSection Component
const TextSection = ({title, body, containerStyle='text-center', titleStyle='title-text', bodyStyle='body-text'}) => {
	return (
		<div className={`text-section-container ${containerStyle}`}>
			<div className={`${titleStyle}`}>{title}</div>
			<div className={`my-4 ${bodyStyle}`}>{body}</div>
		</div>
	);
};

TextSection.propTypes = {
	title: PropTypes.string,
	body: PropTypes.string,
	containerStyle: PropTypes.string,
	titleStyle: PropTypes.string,
	bodyStyle: PropTypes.string
};

export default TextSection;
