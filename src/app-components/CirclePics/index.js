import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const CirclePics = (props) => {
	const { cardObj } = props;

	return (
		<Fragment>
			{cardObj.map((card, i) => {
				const { title, img, imgAlt, href } = card;
				return (
					<a href={href} className="flex flex-wrap flex-col" key={i}>
						<div className="img-container mx-auto">
							<img className="w-48 h-48 rounded-full" src={img} alt={imgAlt} />
						</div>
						<div className="px-6 py-4">
							<div className="font-semibold text-center text-xl mb-2">{title}</div>
						</div>
					</a>
				);
			})}
		</Fragment>
	);
};

CirclePics.propTypes = {
	cardObj: PropTypes.array.isRequired,
};

export default CirclePics;
