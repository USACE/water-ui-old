import React from 'react';
import PropTypes from 'prop-types';
import { isValidArrWithValues } from '../../functions';

const rowContainer = {
	display: 'flex',
	flexWrap: 'wrap',
	flexDirection: 'row',
	justifyContent: 'space-between',
	margin: '2rem auto'
}

const circleContainerStyle ={
	display: 'flex',
	flexWrap: 'wrap',
	flexDirection: 'column',
	textDecoration: 'none'
}

const imgStyle = {
	height: '12rem',
	width: '12rem',
	borderRadius: '9999px'
}

const textStyle ={
	textAlign:'center',
	fontWeight: 'semibold'
}
const CirclePics = (props) => {
	const { cardObj } = props;

	return (
		<div style={rowContainer}>
			{cardObj &&
				isValidArrWithValues(cardObj) &&
				cardObj.map((card, i) => {
					const { title, img, imgAlt, href } = card;
					return (
						<a href={href} style={circleContainerStyle} key={i}>
							<div style={{margin:'auto'}} className="img-container mx-auto">
								<img style={imgStyle} src={img} alt={imgAlt} />
							</div>
							<div style={{padding:'1rem'}}>
								<div style={textStyle}>{title}</div>
							</div>
						</a>
					);
				})}
		</div>
	);
};

CirclePics.propTypes = {
	cardObj: PropTypes.array.isRequired,
};

export default CirclePics;
