import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import Map from "ol/Map.js";
import View from "ol/View";
import ScaleBar from "ol/control/ScaleLine";
import BasemapPicker from "../../ol-controls/basemap-picker";
import { fromLonLat } from "ol/proj";
import Loader, { loaderTypes } from "../loader/Loader";
import "./map.scss";

// renders ol map
const MapContainer = (props) => {
  const {
    mapKey,
    height,
    options,
    doMapsInitialize,
    doMapsShutdown,
    isMapsDataLoaded,
    isMapsLoaded,
    addDataToMap,
    saveMapState,
    updateMap,
  } = props;

  const [map, setMap] = useState();

  const mapRef = useRef();
  const initialRender = useRef(true); // this ref is used to ensure the componentDidMount useEffect only fires once

  // componentDidMount
  useEffect(() => {
    if (initialRender.current) {
      const { center, zoom, ...mapOptions } = options;
      const initialMap = new Map({
        target: mapRef.current,
        controls: [
          new ScaleBar({ units: "us" }),
          new BasemapPicker(),
        ],
        view: new View({
          center: center ? fromLonLat(center) : [-11000000, 4600000],
          zoom: zoom || 4,
        }),
        layers: [],
        ...mapOptions
      });

      setMap(initialMap);
      doMapsInitialize(mapKey);
      initialRender.current = false;
    }
  }, [mapKey, options, doMapsInitialize]);

  // componentWillUnmount
  useEffect(() => () => {
      doMapsShutdown(mapKey);
    }, [mapKey, doMapsShutdown])

  useEffect(() => {
    // add data and attach event listeners to the map
    if (isMapsDataLoaded && !isMapsLoaded && addDataToMap) {
      addDataToMap(map, mapKey);
    }

    // save map data and remove any attached event listeners
    return () => {
      if (map && isMapsDataLoaded && isMapsLoaded && saveMapState) {
        saveMapState(map);
      }
    };
  }, [map, mapKey, isMapsDataLoaded, isMapsLoaded, addDataToMap, saveMapState]);

  // update the map object if the mapState changes
  useEffect(() => {
    if (map && isMapsDataLoaded && isMapsLoaded && updateMap) {
      updateMap(map);
    }
  }, [updateMap, map, isMapsDataLoaded, isMapsLoaded]);

  return (
    <div
      ref={mapRef}
      style={{ height, position: "relative" }}
    >
      {!isMapsLoaded && <Loader type={loaderTypes.SPINNER} />}
    </div>
  );
};

MapContainer.propTypes = {
  mapKey: PropTypes.string.isRequired,
  height: PropTypes.string,
  options: PropTypes.object,
  doMapsInitialize: PropTypes.func.isRequired,
  doMapsShutdown: PropTypes.func.isRequired,
  isMapsDataLoaded: PropTypes.bool.isRequired,
  isMapsLoaded: PropTypes.bool.isRequired,
  addDataToMap: PropTypes.func,
  saveMapState: PropTypes.func,
  updateMap: PropTypes.func,
};

MapContainer.defaultProps = {
  options: {},
};

export default connect(
  "doMapsInitialize",
  "doMapsShutdown",
  MapContainer
);
