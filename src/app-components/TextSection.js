import React from 'react';
import PropTypes from 'prop-types';

const defaultBodyStyle = {
	marginTop: '1rem',
	marginBottom: '1rem',
	fontSize: '1rem',
	fontWeight: '300',
	opacity: '1',
	color: '#1a202c',
};
const defaultTitleStyle = {
	textTransform: 'capitalize',
	fontSize: '1.5rem',
};

const defaultContainerStyle = {
	textAlign: 'center',
	margin: '1rem 0',
};
// made default parmeters for TextSection Component
const TextSection = ({ title, body, containerStyle, titleStyle, bodyStyle }) => {
	const titleStyleObj = titleStyle ? titleStyle : defaultTitleStyle;
	const bodyStyleObj = bodyStyle ? bodyStyle : defaultBodyStyle;
	const containerStyleObj = containerStyle ? containerStyle : defaultContainerStyle;
	return (
		<div style={containerStyleObj} className="text-section-container">
			<div style={titleStyleObj}>{title}</div>
			<div style={bodyStyleObj}>{body}</div>
		</div>
	);
};

TextSection.propTypes = {
	title: PropTypes.string,
	body: PropTypes.string,
	containerStyle: PropTypes.object,
	titleStyle: PropTypes.object,
	bodyStyle: PropTypes.object,
};

export default TextSection;
