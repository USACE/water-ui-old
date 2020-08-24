import React from 'react';
import TextSection from '../TextSection';

const footerTextSectionContainer = {
	height: 'auto',
	borderTop: '8px solid #718096',
	display: 'flex',
	backgroundColor: '#4a5568',
};

const footerTextSectionOne = {
width: '50%',
marginBottom: '0.75rem',
padding: '1.25rem 5rem 1.25rem 10rem'
};

const footerTextSectionTwo = {
	width: '50%',
marginBottom: '0.75rem',
padding: '1.25rem 10rem 1.25rem 5rem'
}

const footerSectionTwo = {
	height: '6rem',
	backgroundColor: '#2d3748'

}

const textSectionBodyStyle = {
	textAlign:'left', color: '#cbd5e0', fontSize: '.875rem', marginTop: '0.5rem'
}

const textSectionTitleStyle = {
	textTransform: 'capitalize',
	textAlign:'left',
	fontSize: '1rem',
	color: '#a0aec0'
}

const linkColStyle = {
	height: '100%',
	width: '33%',
	color: 'white'
}
const Footer = (props) => {
	return (
		<div data-test="component-footer-container" className="footer-container">
			<div style={footerTextSectionContainer}>
				<div style={footerTextSectionOne} className="misson-statement">
					<TextSection
						title={'our mission'}
						titleStyle={textSectionTitleStyle}
						bodyStyle={textSectionBodyStyle }
						body={
							"The mission of the U.S. Army Corps of Engineers is to deliver vital public and military engineering services; partnering in peace and war to strengthen our nation's security. energize the economy and reduce risks from disasters."
						}
					/>
					<TextSection
						title={'about the access to water website'}
						titleStyle={textSectionTitleStyle}
						bodyStyle={textSectionBodyStyle }
						body={
							'The CWMS Data Dissemination website is a public accessible map based repository of water resources data that includes elevation, precipation, storage, and flow status of USACE reservoir and lock & dam projects.'
						}
					/>
				</div>
				<div style={footerTextSectionTwo}>
					<div className="icon-container"></div>
					<div className="flex flex-row">
						<div style={linkColStyle} className="link-col">contact us</div>
						<div style={linkColStyle} className="link-col">contact us</div>
						<div style={linkColStyle} className="link-col">contact us</div>
					</div>
				</div>
			</div>
			<div style={footerSectionTwo}></div>
		</div>
	);
};

export default Footer;
