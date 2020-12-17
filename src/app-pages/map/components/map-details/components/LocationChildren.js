import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";

const LocationChildren = ({ locationChildrenData }) => {
  return (
    <ul>
      { locationChildrenData.map((childData) => {
          const key = childData.location_code;
          const locationType = childData.location_type;
          const label = childData.label;
          // add the location type in paranthesis if the location type is not already in the label
          const display = locationType && !label.includes(locationType) ? `${label} (${locationType})` : label;
          return <li key={key}>{display}</li>;
        })
      }
    </ul>
  );
};

LocationChildren.propTypes = {
  locationChildrenData: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    location_code: PropTypes.string,
    location_id: PropTypes.string,
    location_kind_id: PropTypes.string,
    location_type: PropTypes.string,
  })),
};

export default connect(
  "selectLocationChildrenData",
  LocationChildren
);