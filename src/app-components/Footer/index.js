import React from 'react';
import TextSection from '../TextSection';

const Footer = (props) => {
	return (
		<div data-test="component-footer-container" className="footer-container">
			<div className="bg-gray-700 h-auto border-t-8 border-gray-600 md:flex">
				<div className="misson-statement py-5 pl-40 pr-20 mb-3 md:w-1/2">
					<TextSection title={'our mission'} titleStyle={'text-gray-500 text-md text-left capitalize'} bodyStyle={'text-left text-gray-400 text-sm mt-2'} body={'The mission of the U.S. Army Corps of Engineers is to deliver vital public and military engineering services; partnering in peace and war to strengthen our nation\'s security. energize the economy and reduce risks from disasters.'}/>
					<TextSection title={'about the access to water website'} titleStyle={'text-gray-500 text-md text-left capitalize'} bodyStyle={'text-left text-gray-400 text-sm mt-2'} body={'The CWMS Data Dissemination website is a public accessible map based repository of water resources data that includes elevation, precipation, storage, and flow status of USACE reservoir and lock & dam projects.'}/>
				</div>
				<div className="links p-5 py-5 pr-40 pl-20 pb-3 md:w-1/2">
        <div className="icon-container"></div>
        <div className="flex flex-row">
          <div className="link-col w-1/3 h-full text-white">contact us</div>
          <div className="link-col w-1/3 h-full text-white">contact us</div>
          <div className="link-col w-1/3 h-full text-white">contact us</div>
          </div>
        </div>
			</div>
			<div className="bg-gray-800 h-24"></div>
		</div>
	);
};



export default Footer;
