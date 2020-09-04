import React, { useState } from 'react';
import './mapDetails.css';
// import PropTypes from 'prop-types';

const MapDetails = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleDrawer = () => setIsOpen(!isOpen);

	return (
		<div className={`map-details-wrapper ${isOpen ? 'is-expanded' : ''}`} onClick={toggleDrawer}>
			<div className={`drawer-icon-container ${isOpen ? 'is-expanded-icon-container' : ''}`}>
				<div className="icons mdi-chart-arc"></div>
				<div className="icons mdi-chart-arc"></div>
				<div className="icons mdi-chart-arc"></div>
				<div className="icons mdi-chart-arc"></div>
				<div className="icons mdi-chart-arc"></div>
				<div className="icons mdi-chart-arc"></div>
			</div>
			<div className="drawer-content">
				{/* {children} */}
				Map Details page
			</div>
		</div>
	);
};

// MapDetails.propTypes = {
//   // bla: PropTypes.string,
// };

export default MapDetails;
