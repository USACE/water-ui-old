import React, { useState } from "react";
import PropTypes from "prop-types";

// CSS
import "./accordion.scss";

const Accordion = (props) => {
  const { data } = props;
  const [activeAcc, setActiveAcc] = useState(-1);

  const toggleAccordion = (i, e) => {
    e.stopPropagation();

    // if active then close
    if (activeAcc === i) {
      setActiveAcc(-1);
    } else {
      // else set that as active element
      setActiveAcc(i);
    }
  };

  const renderAccordion = () => {
    return data.map((ele, i) => {
      const {content,title,iconClass} = ele;
      return (
        <div key={i}>
          <button
            className={`accordion-btn`}
            id={i}
            onClick={(e) => toggleAccordion(i, e)}
            aria-controls={ele.title}
            aria-expanded={i === activeAcc ? "true" : "false"}
            key={`button-${i}`}
            type="button"
          >
            <p className={`accordion-title text--bold ${iconClass}`}>
              {ele.title}
            </p>
            <div
              className={
                i === activeAcc ? "chevron right" : "chevron right open"
              }
            ></div>
          </button>
          <div
            className={
              i === activeAcc
                ? "accordion-content active-accordion"
                : "accordion-content"
            }
            aria-labelledby={title}
            key={`accordion-content-${i}`}
            id={`accordion-content-${i}`}
          >
            <p className="content-paragraph">{content}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="accordion-section" data-test="accordion-section">
      {data && renderAccordion()}
    </div>
  );
};

Accordion.propTypes = {
  data: PropTypes.array,
};

export default Accordion;
