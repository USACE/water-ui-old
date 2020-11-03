import React from 'react';
import { RoutePaths } from "../app-bundles/routes-bundle";

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<a className="navbar-brand" href="/">
				<div className="text-2xl font-semibold text-capitalize">access to water</div>
				<div className="text-base text-capitalize">water management data dissemination</div>
			</a>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarColor02"
				aria-controls="navbarColor02"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarColor02">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<a className="nav-link" href={RoutePaths.Map}>
							Map 
						</a>
					</li> 
					<li className="nav-item">
						<a className="nav-link" href={RoutePaths.DataResources}>
							Data Resources
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href={RoutePaths.ReportsHome}>
							Reports
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href={RoutePaths.Help}>
							Help
						</a>
					</li>
				</ul>
				<form className="form-inline my-2 my-lg-0">
					<input className="form-control mr-sm-2" type="text" placeholder="Search" />
					<button className="btn btn-secondary my-2 my-sm-0" type="submit">
						Search
					</button>
				</form>
			</div>
		</nav>
	);
};

export default Navbar;
