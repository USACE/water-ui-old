import React, { useState } from "react";
import PropTypes from "prop-types";

// CSS
import "./accordion.scss";

const Accordion = (props) => {
  const { data, formatId } = props;
  const [ activeAcc, setActiveAcc ] = useState([]);

  const toggleAccordion = (i, e) => {
    e.stopPropagation();
    // if active then close
    if ( activeAcc.includes(i) ) {
      setActiveAcc(activeAcc.filter((arr) => arr !== i));
    } else {
      setActiveAcc([...activeAcc, i]);
    }
  };

  const renderAccordion = () => {
    return (
      data &&
      data.map((ele, i) => {
        const { content, title, iconClass } = ele;
        return (
          <div key={ i }>
            <button
              className={ `accordion-btn` } 
              onClick={ (e) => toggleAccordion(i, e) }
              aria-controls={ title }
              aria-expanded={ activeAcc.includes(i) ? "true" : "false" }
              key={ `button-${i}` }
              type="button"
            >
              <div className={ `accordion-title text--bold ${iconClass}` } id={ formatId(title) }>
                { title }
              </div>
              <div
                className={
                  activeAcc.includes(i) ? "chevron right" : "chevron right open"
                }
              ></div>
            </button>
            <div
              className={
                activeAcc.includes(i)
                  ? "accordion-content active-accordion"
                  : "accordion-content"
              }
              aria-labelledby={ title }
              key={ `accordion-content-${i}` }
              id={ `accordion-control-${i}` }
              aria-hidden={ !activeAcc.includes(i) ? "true" : "false" }
            >
              <div className="content-paragraph">{ content }</div>
            </div>
          </div>
        );
      })
    );
  };

  return (
    <div className="accordion-section" data-test="accordion-section">
      { data && renderAccordion() }
    </div>
  );
};

Accordion.propTypes = {
  data: PropTypes.array.isRequired,
  formatId: PropTypes.func
};

export default Accordion;
