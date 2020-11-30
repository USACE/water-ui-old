import React, { cloneElement, isValidElement, useState } from "react";
import PropTypes from "prop-types";
import "./accordion.scss";

const Accordion = ({ data }) => {
  const [ activeAcc, setActiveAcc ] = useState({});

  const toggleAccordion = (e, i) => {
    e.stopPropagation();
    setActiveAcc({
      ...activeAcc,
      [i]: !activeAcc[i],
    });
  };

  return (
    <div className="accordion-section">
      { data && data.map((config, i) => {
        const { id, title, content, iconClass, lazy } = config;

        return (
          <div key={ title }>
            <button
              className="accordion-btn"
              onClick={ e => toggleAccordion(e, i) }
              aria-controls={ `accordion-control-${i}` }
              aria-expanded={ !!activeAcc[i] }
              type="button"
            >
              <div
                id={ id }
                className={ `accordion-title text--bold ${iconClass}` }
              >
                { title }
              </div>
              <div
                className={ activeAcc[i] ? "chevron up" : "chevron down" }
              />
            </button>
            <div
              id={ `accordion-control-${i}` }
              className={ activeAcc[i] ? "accordion-content" : "accordion-content d-none" }
              aria-labelledby={ title }
              aria-hidden={ !activeAcc[i] }
            >
              <div className="content-paragraph">
                { isValidElement( content ) // content is a React element
                  ? lazy !== true
                    ? cloneElement( content, { visible: !!activeAcc[ i ] } )
                    : activeAcc[ i ] && cloneElement( content, { visible: !!activeAcc[ i ] } )
                  : content // content is a string
                }
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Accordion.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
    iconClass: PropTypes.string,
    lazy: PropTypes.bool,
  })),
};

export default Accordion;
