import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { isValidArrWithValues } from '../../functions';

const Cards = (props) => {
	const { cardObj } = props;

	return (
		<Fragment>
			{cardObj &&
				isValidArrWithValues(cardObj) &&
				cardObj.map((card, i) => {
					const { title, text, img, imgAlt, href } = card;
					return (
						<a href={href} key={i}>
							<div className="overflow-hidden shadow-lg hover:shadow-2xl">
								<img className="w-full h-32" src={img} alt={imgAlt} />
								<div className="px-6 py-4">
									<div className="font-bold text-xl mb-2">{title}</div>
									<p className="text-gray-700 text-base">{text}</p>
								</div>
							</div>
						</a>
					);
				})}
		</Fragment>
	);
};

Cards.propTypes = {
	cardObj: PropTypes.array.isRequired,
};

export default Cards;
