import React, { useState } from "react";
import PropTypes from "prop-types";
import SearchBox from "../../../../app-common/SearchBox";
import Dropdown from "../../../../app-common/Dropdown";
import MenuTree from "../../../../app-common/tree-menu/TreeMenu";
import "./mapNavBar.scss";
import { connect } from "redux-bundler-react";
import { returnKeyCodeName } from "../../../../functions";


const MapNavBar = ({ locationTree, doLocationDetailSetCode, doLocationsMapSaveMapState }) => {
  const [orgDivToggleState, setOrgDivToggleState] = useState(false);

  const handleNodeClick = (e) => {
    //if node is a leaf then toggle the drawer and zoom to lonlat
    if (!e.hasNodes) {
      doLocationDetailSetCode( e.id );
      const mapState = {
        zoom: e.zoom_depth || 8,
        center: [e.longitude, e.latitude],
      };
      if( e.longitude && e.latitude ) doLocationsMapSaveMapState( mapState );
    }
  };

  const handleOrgDivClick = () => {
    setOrgDivToggleState(!orgDivToggleState);
  };

  const handleKeyDown = (e) => {
    const firstNode = document.getElementById("rstm-tree-item-1");
    if (returnKeyCodeName(e) === "downArrow" && firstNode) {
      e.preventDefault();
      firstNode.tabIndex = 0;
      firstNode.focus();
      firstNode.setAttribute("aria-pressed", "true");
      //need click to pass in props to tree li
      firstNode.click();
    }
  };

  return (
    <div className="map-nav-bar-wrapper">
      <div className="h-100 px-5 py-4 bg-secondary">
        <div className="row map-nav-row">
          <div className="col-md-4 mb-3">
            <SearchBox />
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
            <Dropdown
              id="location-type-dropdown"
              label="Location Type"
              placeholder="Select Location Type..."
              options={[
                { id: "Divisions", value: "Divisions" },
                { id: "Districts", value: "Districts" },
                { id: "Projects", value: "Projects" },
                { id: "Stream Gages", value: "Stream Gages" },
                { id: "Sites", value: "Sites" },
                { id: "WQ", value: "WQ" },
              ]}
            />
          </div>
          <div className="col-md-4">
            <button
              className="organizational-structure-div"
              onClick={handleOrgDivClick}
              onKeyDown={handleKeyDown}
            >
              Organizational Structure
            </button>
            {orgDivToggleState && locationTree && (
              <MenuTree
                data={locationTree}
                onClickItem={(e) => handleNodeClick(e)}
                initialOpenNodes={["1"]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

MapNavBar.propTypes = {
  locationTree: PropTypes.array,
  doLocationDetailSetCode: PropTypes.func.isRequired,
};

export default connect(
  "selectLocationTree",
  "doLocationDetailSetCode",
  "doLocationsMapSaveMapState",
  MapNavBar
);
