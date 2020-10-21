import React from 'react';
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
import { fromLonLat } from "ol/proj";
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
    locationSummaries,
    doSetSelectedLocationCode,
    doLocationsMapLoaded,
    ...rest
  } = props;

  const addDataToMap = (map) => {
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

    const container = document.getElementById("map-popup");
    const contentContainer = document.getElementById("map-popup-content");
    const closer = document.getElementById("map-popup-closer");

    const overlay = new Overlay({
      element: container,
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

    closer.onclick = function () {
      overlay.setPosition(undefined);
      closer.blur();
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

        let content = `<h5>${ featureProperties.model.public_name }</h5>`;
        content += `<p>${ featureProperties.model.longitude }, ${ featureProperties.model.latitude }</p>`;
        contentContainer.innerHTML = content;
        contentContainer.style.cursor = "pointer";

        // TODO: Probably need to think about how to attach the listener, to ensure that it is removed
        //  when the overlay element is removed, to prevent memory leaks?
        contentContainer.onclick = () => doSetSelectedLocationCode( featureProperties.model.location_id );

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
      closer.blur();
      return false;
    });

    doLocationsMapLoaded();
  };

  return (
    <>
      <MapContainer
        {...rest}
        isMapsDataLoaded={locationsMapIsDataLoaded}
        isMapsLoaded={locationsMapIsLoaded}
        addDataToMap={addDataToMap}
      />
      <div id="map-popup" className="ol-popup">
        <button id="map-popup-closer" className="ol-popup-closer"/>
        <div id="map-popup-content"/>
      </div>
    </>
  );
};

LocationsMap.propTypes = {
  locationsMapIsDataLoaded: PropTypes.bool.isRequired,
  locationsMapIsLoaded: PropTypes.bool.isRequired,
  locationSummaries: PropTypes.array,
  doSetSelectedLocationCode: PropTypes.func.isRequired,
  doLocationsMapLoaded: PropTypes.func.isRequired,
};

export default connect(
  "selectLocationsMapIsDataLoaded",
  "selectLocationsMapIsLoaded",
  "selectLocationSummaries",
  "doSetSelectedLocationCode",
  "doLocationsMapLoaded",
  LocationsMap,
);