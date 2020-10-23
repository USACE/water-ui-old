import React, { useState } from "react";
import PropTypes from "prop-types";
import SearchBox from "../../../../app-common/SearchBox";
import DropDown from "../../../../app-common/Dropdown";
import MenuTree from "../../../../app-common/tree-menu/TreeMenu";
import "./mapNavBar.scss";
import { connect } from "redux-bundler-react";
import { returnKeyCodeName } from "../../../../functions";

const MapNavBar = ({ locationTree, doSetSelectedLocationCode }) => {
  const [orgDivToggleState, setOrgDivToggleState] = useState(false);

  const handleNodeClick = (e) => {
    //if node is a leaf then toggle the drawer
    if (!e.hasNodes) {
      doSetSelectedLocationCode(e.location_id);
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
          <div className="col-md-4">
            <SearchBox />
          </div>
          <div className="col-md-1">
            <DropDown
              label={"Districts Dropdown"}
              id={"districts-dropdown"}
              options={["Select District", "1", "2", "3"]}
            />
          </div>
          <div className="col-md-1">
            <DropDown
              label={"Basin Dropdown"}
              id={"basins-dropdown"}
              options={["Select Basin", "1", "2", "3"]}
            />
          </div>
          <div className="col-md-2">
            <DropDown
              label={"Location Type"}
              id={"location-type-dropdown"}
              options={[
                "Location Type",
                "Divisions",
                "Districts",
                "Projects",
                "Stream Gages",
                "Sites",
                "WQ",
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
};

export default connect(
  "selectLocationTree",
  "doSetSelectedLocationCode",
  MapNavBar
);
