import React from "react";
import PropTypes from 'prop-types';

const CirclePics = (props) => {
const { title, img, imgAlt, href } = props;

  return (
  <a href={href}>
      <div className="img-container">
      <img className="w-48 h-48 rounded-full" src={img} alt={imgAlt} />
      </div>
      <div className="px-6 py-4">
        <div className="font-semibold text-center text-xl mb-2">{title}</div>
      </div>
 
  </a>
)};

CirclePics.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  imgAlt: PropTypes.string,
  href: PropTypes.string
};

export default CirclePics;