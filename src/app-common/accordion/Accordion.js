import React, { cloneElement, isValidElement, useState } from "react";
import PropTypes from "prop-types";
import "./accordion.scss";

const Accordion = ({ data }) => {
  const [ activeAcc, setActiveAcc ] = useState({});

  const toggleAccordion = (e) => {
    e.stopPropagation();
    const id = e.currentTarget.id;
    setActiveAcc({
      ...activeAcc,
      [id]: !activeAcc[id],
    });
  };

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="accordion-section">
      { data.map( ({ id, title, content, iconClass, lazy }) => (
          <div key={ title }>
            <button
              id={ id }
              className="accordion-btn"
              onClick={toggleAccordion}
              aria-controls={ `accordion-control-${id}` }
              aria-expanded={ !!activeAcc[id] }
              type="button"
            >
              <div
                className={ `accordion-title text--bold ${iconClass}` }
              >
                { title }
              </div>
              <div
                className={ activeAcc[id] ? "chevron up" : "chevron down" }
              />
            </button>
            <div
              id={ `accordion-control-${id}` }
              className={ activeAcc[id] ? "accordion-content" : "accordion-content d-none" }
              aria-labelledby={ title }
              aria-hidden={ !activeAcc[id] }
            >
              <div className="content-paragraph">
                { isValidElement( content ) // content is a React element
                  ? lazy !== true
                    ? cloneElement( content, { visible: !!activeAcc[ id ] } )
                    : activeAcc[ id ] && cloneElement( content, { visible: !!activeAcc[ id ] } )
                  : content // content is a string
                }
              </div>
            </div>
          </div>
        ))
      }
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
