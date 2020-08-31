import React from 'react';
import Map from '../../app-containers/Map';
import MapNavBar from './containers/MapNavBar';

export default () => (
	<main>
		<MapNavBar />
		<Map
			mapKey={'home-page-map'}
			options={{ textAlign: 'center', margin: '1rem 0', padding: 'auto 12rem', width: '100%' }}
			height={'900px'}
		/>
	</main>
);
