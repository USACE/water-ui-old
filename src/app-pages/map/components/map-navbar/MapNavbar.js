import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import debounce from "lodash/debounce";
import LocationSearch from "../../../home/components/LocationSearch";
import LocationTree from "./LocationTree";
import LocationTypeFilter from "./LocationTypeFilter";
import "./mapNavbar.scss";
import DistrictsDropdown from "../../../home/components/DistrictsDropdown";
import BasinsDropdown from "../../../home/components/BasinsDropdown";

const MapNavbar = ({ queryObject, doSetLocationSearchCriteriaUpdated }) => {
  const debounceFetch = debounce(doSetLocationSearchCriteriaUpdated, 500);
  return (
    <div className={`map-navbar ${queryObject.display}`}>
      <div className="h-100 px-5 py-4 bg-secondary">
        <div className="row">
          <div className="col-md-2">
            <LocationSearch
              debounceFetch={debounceFetch}
            />
          </div>
          <div className="col-md-2">
            <DistrictsDropdown />
          </div>
          <div className="col-md-2">
            <BasinsDropdown />
          </div>
          <div className="col-md-2">
            <LocationTypeFilter />
          </div>
          <div className="col-md-4">
            <LocationTree />
          </div>
        </div>
      </div>
    </div>
  );
};

MapNavbar.propTypes = {
  queryObject: PropTypes.shape({
    display: PropTypes.string,
  }).isRequired,
  doSetLocationSearchCriteriaUpdated: PropTypes.func.isRequired,
};

export default connect(
  "selectQueryObject",
  "doSetLocationSearchCriteriaUpdated",
  MapNavbar,
);
