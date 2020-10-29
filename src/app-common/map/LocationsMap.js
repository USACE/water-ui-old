import React, { useRef, useCallback } from 'react';
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Overlay from "ol/Overlay";
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Text,
  Icon,
} from "ol/style";
import { Cluster, OSM, Vector as VectorSource } from "ol/source";
import { fromLonLat, toLonLat } from "ol/proj";
import MapContainer from "./MapContainer";

const createStyle = (src, img) => (
  new Style({
    image: new Icon({
      anchor: [0.5, 0.96],
      crossOrigin: "anonymous",
      src: src,
      img,
      imgSize: img && [img.width, img.height],
    }),
  })
);

// HOC that renders ol map with locations data
const LocationsMap = (props) => {
  const {
    locationsMapIsDataLoaded,
    locationsMapIsLoaded,
    locationsMapMapState,
    locationSummaries,
    doSetSelectedLocationCode,
    doLocationsMapLoaded,
    doLocationsMapSaveMapState,
    options,
    ...rest
  } = props;

  const popupContainer = useRef( null );
  const popupContent = useRef( null );
  const popupCloser = useRef( null );

  const addDataToMap = useCallback((map) => {
    const iconFeatures = locationSummaries.map((item, index) => {
      const iconFeature = new Feature(
        new Point(fromLonLat([item.longitude, item.latitude]))
      );
      iconFeature.setProperties({
        model: { ...item },
      });
      iconFeature.setId(index);
      iconFeature.set(
        "style",
        createStyle(
          "https://openlayers.org/en/latest/examples/data/icon.png",
          undefined
        )
      );
      return iconFeature;
    });

    const source = new VectorSource({ features: iconFeatures });

    const unclusteredLayer = new VectorLayer({
      source: source,
      style: feature => feature.get("style"),
      maxResolution: 200,
    });

    const clusterSource = new Cluster({
      distance: 50,
      source: source,
    });

    const styleCache = {};

    const clusters = new VectorLayer({
      source: clusterSource,
      style: function (feature) {
        const size = feature.get("features").length;
        let style = styleCache[size];
        if (!style) {
          style = new Style({
            image: new CircleStyle({
              radius: 10,
              stroke: new Stroke({
                color: "#fff",
              }),
              fill: new Fill({
                color: "#3399CC",
              }),
            }),
            text: new Text({
              text: size.toString(),
              fill: new Fill({
                color: "#fff",
              }),
            }),
          });
          styleCache[size] = style;
        }
        return style;
      },
      minResolution: 201,
    });

    const raster = new TileLayer({
      source: new OSM(),
    });

    const overlay = new Overlay({
      element: popupContainer.current,
      positioning: "bottom-center",
      stopEvent: false,
      autoPan: true,
      offset: [0, -10],
    });

    //add data points to map obj
    map.addOverlay(overlay);
    map.addLayer(raster);
    map.addLayer(clusters);
    map.addLayer(unclusteredLayer);

    popupCloser.current.onclick = () => {
      overlay.setPosition(undefined);
      popupCloser.current.blur();
      return false;
    };

    map.on("pointermove", function (e) {
      const feature = map.forEachFeatureAtPixel(e.pixel, function (feature) {
        return feature;
      });
      //need to adjust to add properties at base level and popup blurs on mouse exit
      if (feature) {
        const geometry = feature.getGeometry();
        const coord = geometry.getCoordinates();
        let featureProperties = feature.getProperties();
        let displayedFeature = feature;

        // Feature can already be a specific location, or a cluster of features.
        if (Array.isArray(featureProperties.features)) {
          if (featureProperties.features.length > 0) {
            displayedFeature = featureProperties.features[ 0 ];
            featureProperties = displayedFeature.getProperties();
          }
          else return;
        }

        const innerHTML = `<div class="name">${ featureProperties.model.public_name }</div>`;
        popupContent.current.innerHTML = innerHTML;
        popupContent.current.style.cursor = "pointer";

        popupContent.current.onclick = () => doSetSelectedLocationCode( featureProperties.model.id );

        overlay.setPosition(coord);
      }
      if (e.dragging) return;
      const pixel = map.getEventPixel(e.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);

      map.getTarget().style.cursor = hit ? "pointer" : "";
    });

    // closes pop up on click
    map.on("click", function (e) {
      overlay.setPosition(undefined);
      popupCloser.current.blur();
      return false;
    });

    doLocationsMapLoaded();
  }, [locationSummaries, doLocationsMapLoaded, doSetSelectedLocationCode]);

  const saveMapState = useCallback((map) => {
    // reset attached listeners
    popupContent.current.onclick = null;

    // save the map state
    const view = map.getView();
    const mapState = {
      zoom: view.getZoom(),
      center: toLonLat( view.getCenter() ),
    };
    doLocationsMapSaveMapState(mapState);
  }, [doLocationsMapSaveMapState]);
  
  const newOptions = {
    zoom: locationsMapMapState.zoom || options.zoom,
    center: locationsMapMapState.center || options.center,
  };

  return (
    <>
      <MapContainer
        {...rest}
        isMapsDataLoaded={locationsMapIsDataLoaded}
        isMapsLoaded={locationsMapIsLoaded}
        addDataToMap={addDataToMap}
        saveMapState={saveMapState}
        options={newOptions}
      />
      <div ref={popupContainer} className="ol-popup">
        <button ref={popupCloser} className="ol-popup-closer" />
        <div ref={popupContent} className="ol-popup-content" />
      </div>
    </>
  );
};

LocationsMap.propTypes = {
  locationsMapIsDataLoaded: PropTypes.bool.isRequired,
  locationsMapIsLoaded: PropTypes.bool.isRequired,
  locationsMapMapState: PropTypes.object,
  locationSummaries: PropTypes.array,
  doSetSelectedLocationCode: PropTypes.func.isRequired,
  doLocationsMapLoaded: PropTypes.func.isRequired,
  doLocationsMapSaveMapState: PropTypes.func.isRequired,
};

export default connect(
  "selectLocationsMapIsDataLoaded",
  "selectLocationsMapIsLoaded",
  "selectLocationsMapMapState",
  "selectLocationSummaries",
  "doSetSelectedLocationCode",
  "doLocationsMapLoaded",
  "doLocationsMapSaveMapState",
  LocationsMap,
);