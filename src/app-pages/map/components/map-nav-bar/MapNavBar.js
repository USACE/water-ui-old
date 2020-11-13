import React from "react";
import SearchBox from "../../../../app-common/SearchBox";
import Dropdown from "../../../../app-common/Dropdown";
import LocationTree from "./LocationTree";
import LocationTypeFilter from "../LocationTypeFilter";
import "./mapNavBar.scss";

const MapNavBar = () => (
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
          <LocationTypeFilter/>
        </div>
        <div className="col-md-4">
          <LocationTree />
        </div>
      </div>
    </div>
  </div>
);

export default MapNavBar;
