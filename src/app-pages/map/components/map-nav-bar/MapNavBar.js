import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import debounce from "lodash/debounce";
import LocationSearch from "../../../home/components/LocationSearch";
import Dropdown from "../../../../app-common/inputs/Dropdown";
import LocationTree from "./LocationTree";
import LocationTypeFilter from "./LocationTypeFilter";
import "./mapNavBar.scss";

const MapNavbar = ({ doSetLocationSearchCriteriaUpdated }) => {
  const debounceFetch = debounce(doSetLocationSearchCriteriaUpdated, 500);
  return (
    <div className="map-navbar">
      <div className="h-100 px-5 py-4 bg-secondary">
        <div className="row map-nav-row">
          <div className="col-md-4">
            <LocationSearch
              debounceFetch={debounceFetch}
            />
          </div>
          <div className="col-md-1">
            <Dropdown
              label="Districts Dropdown"
              id="districts-dropdown"
              placeholder="Select District..."
              options={[
                { id: "1", value: "1" },
                { id: "2", value: "2" },
                { id: "3", value: "3" },
              ]}
            />
          </div>
          <div className="col-md-1">
            <Dropdown
              id="basins-dropdown"
              label="Basin Dropdown"
              placeholder="Select Basin..."
              options={[
                { id: "1", value: "1" },
                { id: "2", value: "2" },
                { id: "3", value: "3" },
              ]}
            />
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
  doSetLocationSearchCriteriaUpdated: PropTypes.func.isRequired,
};

export default connect("doSetLocationSearchCriteriaUpdated", MapNavbar);
