import React, { useState } from 'react';
import { RoutePaths } from "../app-bundles/routes-bundle";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const closeNavbar = () => {
		if (isOpen) {
			setIsOpen(false);
		}
	};

	const show = isOpen ? "show" : "";
	return (
		<header>
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
				<a className="navbar-brand" href={RoutePaths.Home}>
					<div className="text-2xl font-semibold text-capitalize">access to water</div>
					<div className="text-base text-capitalize">water management data dissemination</div>
				</a>
				<button
					type="button"
					className="navbar-toggler"
					onClick={() => setIsOpen(!isOpen)}
					aria-expanded={isOpen}
					aria-controls="main-menu-navbar"
					aria-label="Toggle navigation"
				>
					<span className="sr-only">Toggle navigation</span>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className={`collapse navbar-collapse ${show}`} id="main-menu-navbar">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<a className="nav-link" href={RoutePaths.Map} onClick={closeNavbar}>
								Map 
							</a>
						</li> 
						<li className="nav-item">
							<a className="nav-link" href={RoutePaths.DataResources} onClick={closeNavbar}>
								Data Resources
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href={RoutePaths.ReportsHome} onClick={closeNavbar}>
								Reports
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href={RoutePaths.Help} onClick={closeNavbar}>
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
		</header>
	);
};

export default Navbar;
