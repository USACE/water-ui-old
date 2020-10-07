import React from 'react';
// import PropTypes from 'prop-types';
import SearchBox from '../../../app-components/SearchBox';
import DropDown from '../../../app-components/Dropdown';

const MapNavBar = (props) => (
  <div className="MapNavBarWrapper">
   	<div className="h-100 px-5 py-4 bg-secondary">
			<div className="row">
				<div className="col-md-4">
					<SearchBox />
				</div>
				<div className="col-md-1">
					<DropDown
						label={'Districts Dropdown'}
						id={'districts-dropdown'}
						options={['Select District', '1', '2', '3']}
					/>
				</div>
				<div className="col-md-1">
					<DropDown
						label={'Basin Dropdown'}
						id={'basins-dropdown'}
						options={['Select Basin', '1', '2', '3']}
					/>
				</div>
				<div className="col-md-2">
					<DropDown
						label={'Location Type'}
						id={'location-type-dropdown'}
						options={['Location Type', 'Divisions', 'Districts', 'Projects','Stream Gages','Sites','WQ']}
					/>
				</div>
				<div className="col-md-4">
					<DropDown
						label={'Organizational Structure'}
						id={'organizational-structure'}
						options={['Organizational Structure', '1', '2', '3']}
					/>
				</div>
			</div>
		</div>
  </div>
);

// MapNavBar.propTypes = {
//   // bla: PropTypes.string,
// };



export default MapNavBar;
