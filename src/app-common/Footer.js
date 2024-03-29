import React from 'react';
import TextSection from './TextSection';

const footerTextSectionContainer = {
	borderTop: '8px solid #718096',
	display: 'flex',
	backgroundColor: '#4a5568',
};

const textSectionBodyStyle = {
	textAlign: 'left',
	color: '#cbd5e0',
	fontSize: '.875rem',
	marginTop: '0.5rem',
};

const textSectionTitleStyle = {
	textTransform: 'capitalize',
	textAlign: 'left',
	fontSize: '1rem',
	color: '#a0aec0',
};


const Footer = (props) => {
	return (
		<footer className="footer-container">
			<div style={footerTextSectionContainer} className="h-auto d-flex flex-lg-row row mw-100 mx-0">
				<div style={{ paddingLeft: '10rem'}} className="misson-statement col-lg-6 col-sm-12 mb-1 pr-5 py-4 mx-sm-auto">
					<TextSection
						title={'our mission'}
						titleStyle={textSectionTitleStyle}
						bodyStyle={textSectionBodyStyle}
						body={
							"The mission of the U.S. Army Corps of Engineers is to deliver vital public and military engineering services; partnering in peace and war to strengthen our nation's security. energize the economy and reduce risks from disasters."
						}
					/>
					<TextSection
						title={'about the access to water website'}
						titleStyle={textSectionTitleStyle}
						bodyStyle={textSectionBodyStyle}
						body={
							'The CWMS Data Dissemination website is a public accessible map based repository of water resources data that includes elevation, precipation, storage, and flow status of USACE reservoir and lock & dam projects.'
						}
					/>
				</div>
				<div style={{paddingRight: '10rem', paddingLeft: '5rem'}} className="col-lg-6 col-sm-12 mb-1 py-4 px-5 row mw-100 mx-sm-auto">
					<div className="icon-container"></div>
					<div className="d-flex flex-row">
						<div className="link-col h-100 col-4 text-white">
							contact us
						</div>
						<div className="link-col h-100 col-4 text-white">
							contact us
						</div>
						<div className="link-col h-100 col-4 text-white">
							contact us
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
