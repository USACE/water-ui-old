import React from 'react';

import Layout from './app-pages/Layout';

// style sheets
import "./style/bootstrap/css/bootswatch.min.css";
//import "./style/bootstrap/css/bootstrap-sketchy.min.css"
import "./style/mdi/css/materialdesignicons.min.css";
import "./style/sass/main.scss";

export default () => {
	return (
		<div>
			<Layout/>
		</div>
	);
};
