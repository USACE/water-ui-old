import React from "react";
import { connect } from 'redux-bundler-react';
import Navbar from '../../app-components/Navbar';
import Footer from '../../app-components/Footer';



export default connect('selectRoute', ({ route: Route }) => {
	return (
		<div>
			<Navbar />
			<Route />
			<Footer />
		</div>
	);
});
