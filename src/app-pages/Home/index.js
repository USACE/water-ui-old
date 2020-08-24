import React from 'react';
import Card from '../../app-components/Cards';
import TextSection from '../../app-components/TextSection';
import CirclePics from '../../app-components/CirclePics';
import Map from '../../app-containers/Map';
import SearchBox from '../../app-containers/SearchBox';
import { circlePicObj, cardObj } from './data.js';

const containerTextSection = {
	textAlign: 'center',
	margin:'1rem 0',
	padding: 'auto 12rem',
	width: '100%'
}

const headerContainerStyle = {
	backgroundColor: '#cbd5e0'
}
const HomePage = () => {
	const options = { center: [-77.0364, 38.895], zoom: 4 };
	return (
		<main>
			<div className="header-section p-5" style={headerContainerStyle}>
				<TextSection
					containerStyle={containerTextSection}
					title={'find water resources data across the U.S.'}
					body={
						'Access water resources data such as elevation, precipitation, storage, and flow status of more than 700 USACE reservoir and lock & dam projects.'
					}
				/>
				<div
					className="search-box-container py-4 px-4 mx-auto container"
					style={{ 'top': '35px', 'zIndex': '1' }}
				>
					<SearchBox text={'Search by City, State, ZIP, or Project Names'} />
				</div>
			</div>

			<Map mapKey={'home-page-map'} options={options} height={'600px'} />
			<div className="container mx-auto px-5">
					{cardObj && <Card cardObj={cardObj}/>}
				<div className="container mx-auto mt-5">
					<TextSection
						title={'The Mission of Access to Water'}
						body={
							'The United States Army Corps of Engineers (USACE) is responsible for operating and maintaining more than 700 lock and dam projects nationwide. The Access to Water Resources Data - Corps Water Management System (CWMS) Data Dissemination tool supports the USACE water control management mission by utilizing visualizations and reports to provide continuous assessment, awareness, and effective decision support of lock and dam projects, which in turn reduces risks to people, property, and the environment.'
						}
					/>
					<div className="container my-5 mx-auto">
					{circlePicObj && <CirclePics cardObj={circlePicObj}/>}
					</div>
				</div>
			</div>
		</main>
	);
};

export default HomePage;
