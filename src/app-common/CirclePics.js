import React from 'react';
import PropTypes from 'prop-types';
import { isValidArrWithValues } from '../utils';

const imgStyle = {
	height: '12rem',
	width: '12rem',
	borderRadius: '9999px'
};

const CirclePics = (props) => {
	const { cardObj } = props;

	return (
		<div className="row my-5 mx-auto">
			{cardObj &&
				isValidArrWithValues(cardObj) &&
				cardObj.map((card, i) => {
					const { title, img, imgAlt, href } = card;
					return (
						<a href={href} style={{ textDecoration: 'none' }} key={i} className="col-lg-4 col-sm-12 d-flex flex-wrap flex-column mb-4">
							<div className="img-container mx-auto">
								<img style={imgStyle} src={img} alt={imgAlt} />
							</div>
							<div className="p-2">
								<div className="text-center font-weight-bold">{title}</div>
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
