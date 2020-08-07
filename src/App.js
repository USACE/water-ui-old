import React from 'react';
import './css/tailwind.generated.css';
import Navbar from '../src/app-components/Navbar';
import Footer from '../src/app-components/Footer';
import { connect } from 'redux-bundler-react';

export default connect('selectRoute', ({ route: Route }) => {
	return (
		<div>
			<Navbar />
			<Route />
			<Footer />
		</div>
	);
});
