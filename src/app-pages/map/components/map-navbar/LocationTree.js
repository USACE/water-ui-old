import React, { useState, useEffect, useRef } from 'react';
import { connect } from "redux-bundler-react";
import PropTypes from "prop-types";
import TreeMenu from "../../../../app-common/tree-menu/TreeMenu";
import { defaultChildren } from "../../../../app-common/tree-menu/renderProps";
import { locationTypes, mapUrlOptions, displayTypes, defaultMapParams } from "../../map-utils";

const LocationTree = ({
  locationTree,
  queryObject,
  doUpdateQuery,
}) => {
  const node = useRef( null );
  const [treeIsOpen, setTreeIsOpen] = useState(false);

  // open the location tree if it is not already open
  const handleInput = () => {
    if (!treeIsOpen) {
      setTreeIsOpen(true);
    }
  };

  const handleClickOutside = (e) => {
    if (!node.current.contains(e.target)) {
      setTreeIsOpen(false);
    }
  };

  // close the location tree if the user clicks outside the component
  useEffect(() => {
    if (treeIsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [treeIsOpen]);

  const handleNodeClick = (e) => {
    //if node is a leaf then toggle the drawer and zoom to lonlat
    if (!e.hasNodes) {
      const newQuery = {
        ...queryObject,
        locationId: e.id,
        lat: e.latitude,
        lon: e.longitude,
        zoom: e.zoom_depth ? Math.round( e.zoom_depth * 1.5 ) : defaultMapParams.locationZoom,
        display: displayTypes.opened,
      };
      doUpdateQuery(newQuery, mapUrlOptions);
    }
  };

  const locationType = queryObject.locationType || "";
  return (
    <TreeMenu
      data={locationTree}
      onClickItem={handleNodeClick}
      initialOpenNodes={["1"]}
      typeFilter={locationType === locationTypes.ALL ? "" : locationType}
    >
      {({ items, search, typeFilter }) => (
        <div ref={node}>
          <input
            type="text"
            className="form-control"
            onChange={e => search(e.target.value)}
            onClick={handleInput}
            onKeyDown={handleInput}
            placeholder="Organizational Structure Tree (Type to Filter)"
          />
          { treeIsOpen && defaultChildren({ items, typeFilter }) }
        </div>
      )}
    </TreeMenu>
  );
};

LocationTree.propTypes = {
  locationTree: PropTypes.array,
  queryObject: PropTypes.shape({
    locationType: PropTypes.string,
  }).isRequired,
  doUpdateQuery: PropTypes.func.isRequired,
};

export default connect(
  "selectLocationTree",
  "selectQueryObject",
  "doUpdateQuery",
  LocationTree,
);
