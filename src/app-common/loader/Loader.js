import React from "react";
import PropTypes from "prop-types";
import "./loader.scss";

export const loaderTypes = {
  DISSOLVE_CUBE: "DISSOLVE_CUBE",
  SPIN_CUBES: "SPIN_CUBES",
  MARCHING_BARS: "MARCHING_BARS",
  FOLDING_CUBE: "FOLDING_CUBE",
  SPINNER: "SPINNER",
};

// renders a custom loader
const Loader = ({ type, style }) => {
  let animation;
  switch(type) {
    case loaderTypes.DISSOLVE_CUBE:
      animation = (
        <div className="dissolve-cube-grid">
          <div className="dissolve-cube dissolve-cube1" style={style}></div>
          <div className="dissolve-cube dissolve-cube2" style={style}></div>
          <div className="dissolve-cube dissolve-cube3" style={style}></div>
          <div className="dissolve-cube dissolve-cube4" style={style}></div>
          <div className="dissolve-cube dissolve-cube5" style={style}></div>
          <div className="dissolve-cube dissolve-cube6" style={style}></div>
          <div className="dissolve-cube dissolve-cube7" style={style}></div>
          <div className="dissolve-cube dissolve-cube8" style={style}></div>
          <div className="dissolve-cube dissolve-cube9" style={style}></div>
        </div>
      );
      break;
    case loaderTypes.SPIN_CUBES:
      animation = (
        <div className="spin-cubes">
          <div className="cube1" style={style}></div>
          <div className="cube2" style={style}></div>
        </div>
      );
      break;
    case loaderTypes.MARCHING_BARS:
      animation = (
        <div className="marching-bars">
          <div className="rect1" style={style}></div>
          <div className="rect2" style={style}></div>
          <div className="rect3" style={style}></div>
          <div className="rect4" style={style}></div>
          <div className="rect5" style={style}></div>
        </div>
      );
      break;
    case loaderTypes.FOLDING_CUBE:
      animation = (
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube" style={style}></div>
          <div className="sk-cube2 sk-cube" style={style}></div>
          <div className="sk-cube4 sk-cube" style={style}></div>
          <div className="sk-cube3 sk-cube" style={style}></div>
        </div>
      );
      break;
    case loaderTypes.SPINNER:
    default:
      animation = <div className="spinner-border" />;
  }
  return (
    <div className="loader-overlay" role="status">
      {animation}
      <span className="sr-only">Loading...</span>
    </div>
  )
};

Loader.defaultProps = {
  style: {},
};

Loader.propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
};

export default Loader;
