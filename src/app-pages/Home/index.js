import React from 'react';
import Card from '../../app-components/Cards';
import TextSection from '../../app-components/TextSection';
import CirclePics from '../../app-components/CirclePics';
import Map from '../../app-containers/Map';
import SearchBox from '../../app-containers/SearchBox';
import waterImage from '../../img/water.jpg';

const HomePage = () => {
	const cardObj = [
		{ title: 'Locations', text: 'Card 1 Text', img: waterImage, imgAlt: 'Card 1 Image', href: '/#link1' },
		{ title: 'Data Resources', text: 'Card 2 Text', img: waterImage, imgAlt: 'Card 2 Image', href: '/#link2' },
		{ title: 'Reports', text: 'Card 3 Text', img: waterImage, imgAlt: 'Card 3 Image', href: '/#link3' },
	];
	const circlePicObj = [
		{ title: 'Water Quality Assessment', img: waterImage, imgAlt: 'Card 1 Image', href: '/#link1' },
		{ title: 'Water Quality Awareness', img: waterImage, imgAlt: 'Card 2 Image', href: '/#link2' },
		{ title: 'Water Quality Support', img: waterImage, imgAlt: 'Card 3 Image', href: '/#link3' },
	];
	return (
		<main>
      <div className="header-section">
      <TextSection
				containerStyle={'text-center bg-gray-400 bg-opacity-50 px-8 lg:px-48 py-8'}
				title={'find water resources data across the U.S.'}
				titleStyle={'capitalize text-grey-900 text-2xl'}
				body={
					'Access water resources data such as elevation, precipitation, storage, and flow status of more than 700 USACE reservoir and lock & dam projects.'
				}
			/>
      <div className="search-box-container py-4 px-6 mx-8 lg:mx-56 relative bg-white" style={{"top":"-30px"}}>
        <SearchBox/>
      </div>
      </div>

			<Map />
			<div className="container mx-auto px-20">
				<div className="container mt-24 mx-auto lg:flex space-x-6">
					{cardObj.map((card, i) => {
						const { title, text, img, imgAlt, href } = card;
						return <Card key={i} title={title} text={text} img={img} imgAlt={imgAlt} href={href} />;
					})}
				</div>
				<div className="container mx-auto mt-24">
					<TextSection
						title={'The Mission of Access to Water'}
						body={
							'The United States Army Corps of Engineers (USACE) is responsible for operating and maintaining more than 700 lock and dam projects nationwide. The Access to Water Resources Data - Corps Water Management System (CWMS) Data Dissemination tool supports the USACE water control management mission by utilizing visualizations and reports to provide continuous assessment, awareness, and effective decision support of lock and dam projects, which in turn reduces risks to people, property, and the environment.'
						}
					/>
					<div className="container mt-24 mx-auto lg:flex space-x-32">
						{circlePicObj.map((card, i) => {
							const { title, img, imgAlt, href } = card;
							return <CirclePics key={i} title={title} img={img} imgAlt={imgAlt} href={href} />;
						})}
					</div>
				</div>
			</div>
		</main>
	);
};

export default HomePage;
