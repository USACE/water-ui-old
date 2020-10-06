import React from "react";
import { connect } from 'redux-bundler-react';
import Navbar from '../../app-components/navbar/navbar';
import Footer from '../../app-components/footer/footer';



export default connect('selectRoute', ({ route: Route }) => {
	return (
		<div>
			<Navbar />
			<Route />
			<Footer />
		</div>
	);
});
