import React from 'react';
import PropTypes from 'prop-types';
import { isValidArrWithValues } from '../functions';

const imgStyle = {
	width: '100%',
	height: '8rem',
};

const cardStyle = {
	overflow: 'hidden',
	width: '95%',
	boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
};

const textContainerStyle = {
	paddingLeft: '1.5rem',
	paddingRight: '1.5rem',
	textDecoration: 'none',
};

const Cards = (props) => {
	const { cardObj } = props;

	return (
		<div className="row my-5">
			{cardObj &&
				isValidArrWithValues(cardObj) &&
				cardObj.map((card, i) => {
					const { title, text, img, imgAlt, href } = card;
					return (
						<a href={href} key={i} style={{ textDecoration: 'none' }} className="col-lg-4 col-sm-12 d-flex flex-wrap flex-column mb-4">
							<div style={cardStyle}>
								<img style={imgStyle} src={img} alt={imgAlt} />
								<div style={textContainerStyle} className="p-3">
									<div className="font-weight-bold mb-2">{title}</div>
									<p className="text-base">{text}</p>
								</div>
							</div>
						</a>
					);
				})}
		</div>
	);
};

Cards.propTypes = {
	cardObj: PropTypes.array.isRequired,
};

export default Cards;
