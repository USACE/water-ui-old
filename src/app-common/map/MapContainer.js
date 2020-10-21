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

const MapContainer = (props) => {
  const {
    mapKey,
    height,
    options,
    doMapsInitialize,
    doMapsShutdown,
    doMapsAddData,
    isMapsDataLoaded,
    isMapsLoaded,
  } = props;

  const [map, setMap] = useState()

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
    if (isMapsDataLoaded && !isMapsLoaded) {
      doMapsAddData(mapKey, map);
    }
  }, [mapKey, map, isMapsDataLoaded, isMapsLoaded, doMapsAddData]);

  return (
    <>
      <div
        ref={mapRef}
        style={{ height, position: "relative" }}
      >
        {!isMapsLoaded && <Loader type={loaderTypes.SPINNER} />}
      </div>
      <div id="map-popup" className="ol-popup">
        <button id="map-popup-closer" className="ol-popup-closer"/>
        <div id="map-popup-content"/>
      </div>
    </>
  );
};

MapContainer.propTypes = {
  mapKey: PropTypes.string.isRequired,
  height: PropTypes.string,
  options: PropTypes.object,
  doMapsInitialize: PropTypes.func.isRequired,
  doMapsShutdown: PropTypes.func.isRequired,
  doMapsAddData: PropTypes.func.isRequired,
  isMapsDataLoaded: PropTypes.bool.isRequired,
  isMapsLoaded: PropTypes.bool.isRequired,
};

MapContainer.defaultProps = {
  options: {},
};

export default connect(
  "doMapsInitialize",
  "doMapsShutdown",
  "doMapsAddData",
  "selectIsMapsDataLoaded",
  "selectIsMapsLoaded",
  MapContainer
);
