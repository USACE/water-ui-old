import React from 'react';
import MapNavBar from './components/MapNavBar';
import MapDetails from './components/map-details/MapDetails';
import Map from '../../app-common/map/Map';

const MapPage = (props) => {
  const opts = { center: [-95, 38.895], zoom: 5 };

	return (
		<main>
			<MapNavBar />
			<div className=" map-and-details-container " style={{display:"flex",flexDirection:"row"}}>
				<div className="map-details" style={{padding:"0",flexGrow: 1}}>
					<MapDetails/>
				</div>
				<div className="map-container" style={{padding:"0",flexGrow: 35}} >
					<Map height={'900px'} options={opts} mapKey={"maps"}/>
				</div>
			</div>
		</main>
	);
};

export default MapPage;
