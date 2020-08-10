import React from "react";
import PropTypes from "prop-types";



const Footer = props => {

  return (
    <div
      data-test="component-footer-container"
      className="footer-container">
      <div className="bg-gray-700 h-64 border-t-8 border-gray-600">
        <div className="misson-statement"></div>
        <div className="links"></div>
      </div>
      <div className="bg-gray-800 h-24"></div>
    </div>
  );
};

Footer.propTypes = {
  
};

export default (Footer);