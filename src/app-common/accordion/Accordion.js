import React, { useState } from "react";
import PropTypes from "prop-types";
import "./accordion.scss";

const Accordion = ({ data, formatId }) => {
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
      { data && data.map((ele, i) => {
          const { content, title, iconClass } = ele;
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
                  id={ formatId(title) }
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
                  { content }
                </div>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

Accordion.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    iconClass: PropTypes.string,
  })),
  formatId: PropTypes.func.isRequired,
};

export default Accordion;
