import React from 'react';
import PropTypes from 'prop-types';

const TextSection = ({
	title,
	body,
	containerStyle,
	titleStyle,
	bodyStyle,
}) => (
	<div style={containerStyle} className="text-section-container">
		<div style={titleStyle}>{title}</div>
		<div style={bodyStyle}>{body}</div>
	</div>
);

TextSection.propTypes = {
	title: PropTypes.string,
	body: PropTypes.string,
	containerStyle: PropTypes.object,
	titleStyle: PropTypes.object,
	bodyStyle: PropTypes.object,
};

TextSection.defaultProps = {
	containerStyle: {
		textAlign: 'center',
		margin: '1rem 0',
	},
	titleStyle: {
		textTransform: 'capitalize',
		fontSize: '1.5rem',
	},
	bodyStyle: {
		marginTop: '1rem',
		marginBottom: '1rem',
		fontSize: '1rem',
		fontWeight: '300',
		opacity: '1',
		color: '#1a202c',
	}
}

export default TextSection;
