import React, { useState } from "react";
import { connect } from "redux-bundler-react";
import classnames from "classnames";
import SearchBox from "../../app-containers/SearchBox";

const NavItem = connect(
  "selectPathnameMinusHomepage",
  ({ pathnameMinusHomepage, href, handler, html, children }) => {
    const handleClick = (e) => {
      if (handler && typeof handler === "function") handler(e);
    };

    const cls = classnames({
      "text-gray-400 font-bold bg-gray-800": pathnameMinusHomepage === href,
      "mt-1 block px-2 py-1 text-white rounded hover:text-gray-300 sm:mt-0 sm:ml-2": true,
    });

    if (href) {
      return (
        <a className={cls} href={href}>
          {children}
        </a>
      );
    }
    if (handler) {
      return (
        <div className={cls} onClick={handleClick}>
          {children}
        </div>
      );
    }
    if (html) {
      return (
        <div className={cls}>
          {children}
        </div>
      );
    }
  }
);

export default connect(
  "selectPathnameMinusHomepage",
  ({ pathnameMinusHomepage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = () => {
      setIsOpen(!isOpen);
    };

    const dropdownClass = classnames({
      hidden: !isOpen,
      block: isOpen,
      "pb-4 pt-2 px-2 sm:flex sm:p-0 items-center": true,
    });

    return (
      <header className="h-18 bg-gray-800 sm:flex sm:justify-between sm:items-center sm:px-4 py-1">
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <h3 className="text-white text-2xl">
              <a className="hover:text-green-400" href="/">
                <div className="text-2xl font-semibold capitalize">access to water</div>
                <div className="text-base capitalize">water management data dissemination</div>
              </a>
              {/* {pathnameMinusHomepage === "" ||
              pathnameMinusHomepage === "/" ? null : (
                <span className="px-2 font-light">|</span>
              )}
              <span className="font-light text-lg">
                {pathnameMinusHomepage.split("/")[1]}
              </span> */}
            </h3>
          </div>
          <div className="sm:hidden">
            <button
              type="button"
              className="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
              onClick={toggleIsOpen}
            >
              <svg className="h-6 w-6 fill-current">
                {isOpen ? (
                  <path
                    className="heroicon-ui"
                    d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"
                  />
                ) : (
                  <path
                    className="heroicon-ui"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        <nav className={dropdownClass}>
          <NavItem href="/map">Map</NavItem>
          <NavItem href="/locations">Locations</NavItem>
          <NavItem href="/data-resources">Data Resources</NavItem>
          <NavItem href="/reports">Reports</NavItem>
          <NavItem href="/help">Help</NavItem>
          <NavItem html><SearchBox text={"Search Access to Water"} theme={'dark'}/></NavItem>
        </nav>
      </header>
    );
  }
);

export { NavItem };
