import React, { useState } from "react";
// import PropTypes from 'prop-types';
import SearchBox from "../../../app-common/SearchBox";
import DropDown from "../../../app-common/Dropdown";
import MenuTree from "../../../app-common/tree-menu/TreeMenu";
import { connect } from "redux-bundler-react";

const organizationalDiv = {
  backgroundColor: "white",
  padding: "10px",
};

const MapNavBar = ({
  locationTree,
  doCreateLocationTree,
  doSetSelectedLocationCode,
}) => {
  const [orgDivToggleState, setOrgDivToggleState] = useState(false);

  const filtered =
    locationTree &&
    locationTree.map((val) => {
      return {
        label: val.label,
        location_id: val.location_id,
        is_leaf: val.is_leaf,
        nodes: val.nodes,
      };
    });

  const handleNodeClick = (e) => {
    //if node is a leaf then toggle the drawer
    if (e.is_leaf) {
      doSetSelectedLocationCode(e.location_id);
    }
  };

  const handleOrgDivClick = () => {
    setOrgDivToggleState(!orgDivToggleState);
  };

  return (
    <div className="map-nav-bar-wrapper">
      <div className="h-100 px-5 py-4 bg-secondary">
        <div className="row">
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
            <div
              className="organizational-structure-div"
              style={organizationalDiv}
              onClick={handleOrgDivClick}
            >
              Organizational Structure
            </div>
            {orgDivToggleState && (
              <MenuTree
                data={filtered}
                onClickItem={(e) => handleNodeClick(e)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// MapNavBar.propTypes = {
//   // bla: PropTypes.string,
// };

export default connect(
  "selectLocationTree",
  "doCreateLocationTree",
  "doSetSelectedLocationCode",
  MapNavBar
);
