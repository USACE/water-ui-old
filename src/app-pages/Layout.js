import React from "react";
import { connect } from 'redux-bundler-react';
import Navbar from '../app-common/Navbar';
import Footer from '../app-common/Footer';

export default connect('selectRoute', ({ route: Route }) => {
	return (
		<div>
			<Navbar />
			<Route />
			<Footer />
		</div>
	);
});
