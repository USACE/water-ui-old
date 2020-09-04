import React from 'react';
import MapNavBar from './containers/MapNavBar';
import MapDetails from './containers/MapDetails';
import Map from '../../app-containers/Map';

const MapPage = (props) => {
	const opts = { center: [-95, 38.895], zoom: 5 };
	return (
		<main>
			<MapNavBar />
			<div className="row map-and-details-container ">
				<div className="map-details" style={{width:"3%"}}>
					<MapDetails/>
				</div>
				<div className="map-container" style={{width:"97%"}}>
					<Map height={'900px'} options={opts} mapKey={"mapPageMap"}/>
				</div>
			</div>
		</main>
	);
};

export default MapPage;
