import React, { useState, useEffect, useRef } from 'react';
import { connect } from "redux-bundler-react";
import PropTypes from 'prop-types';
import TreeMenu from "../../../../app-common/tree-menu/TreeMenu";
import { defaultChildren } from "../../../../app-common/tree-menu/renderProps";

const LocationTree = ({
  locationTree,
  doLocationDetailSetCode,
  doLocationsMapSaveMapState,
  locationsMapMapState
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
      doLocationDetailSetCode( e.id );
      if ( e.longitude && e.latitude ) {
        const mapState = {
          zoom: e.zoom_depth ? Math.round( e.zoom_depth * 1.5 ) : 16,
          center: [e.longitude, e.latitude],
        };
        doLocationsMapSaveMapState( mapState );
        setTreeIsOpen(false);
      }
    }
  };
  const typeFilter =  locationsMapMapState && locationsMapMapState.typeFilter;

  return (
    <TreeMenu
      data={locationTree}
      onClickItem={handleNodeClick}
      initialOpenNodes={["1"]}
      typeFilter = { typeFilter !== "ALL" ? typeFilter: ""}
    >
      {({ items, search }) => (
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
  doLocationDetailSetCode: PropTypes.func.isRequired,
  doLocationsMapSaveMapState: PropTypes.func.isRequired,
};

export default connect(
  "selectLocationTree",
  "doLocationDetailSetCode",
  "doLocationsMapSaveMapState",
  "selectLocationsMapMapState",
  LocationTree,
);
