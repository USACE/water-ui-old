import React from "react";
import PropTypes from 'prop-types';

const Cards = (props) => {
const { title, text, img, imgAlt, href } = props;

  return (
  <a href={href}>
    <div className="overflow-hidden shadow-lg hover:shadow-2xl">
      <img className="w-full h-32" src={img} alt={imgAlt} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{text}</p>
      </div>
    </div>
  </a>
)};

Cards.propTypes = {
	title: PropTypes.string,
  text: PropTypes.string,
  img: PropTypes.string,
  imgAlt: PropTypes.string,
  href: PropTypes.string
};

export default Cards;
