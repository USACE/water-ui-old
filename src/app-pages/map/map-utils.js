import Map from "ol/Map.js";
import View from "ol/View";
import ScaleLine from "ol/control/ScaleLine";
import { Vector as VectorLayer } from "ol/layer";
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
import { Cluster, Vector as VectorSource } from "ol/source";
import { fromLonLat } from "ol/proj";
import BasemapPicker from "../../ol-controls/basemap-picker";
import { RoutePaths } from "../../app-bundles/route-paths";

export const locationTypes = {
  ALL: "ALL",
  LOCATION: "LOCATION",
  STREAM_LOCATION: "STREAM_LOCATION",
  STREAM: "STREAM",
  PROJECT: "PROJECT",
  TURBINE: "TURBINE",
  OUTLET: "OUTLET",
  LOCK: "LOCK",
  EMBANKMENT: "EMBANKMENT",
  WQ: "WQ",
  BASIN: "BASIN",
  OPERATING_BASIN: "OPERATING_BASIN",
};

export const displayTypes = {
  closed: "closed",
  opened: "opened",
  fs: "fs",
};

/**
 * JSON representation of the default map query parameters
 */
export const defaultMapParams = {
  locationId: "",
  lat: 38.895,
  lon: -95,
  zoom: 5,
  locationZoom: 12,
  locationType: locationTypes.ALL,
  display: displayTypes.opened,
};

export const mapUrlOptions = {
  maintainScrollPosition: true,
};

/**
 * Converts object containing the map query parameters into a string of the map url
 *  
 * @param {Object} mapParams JSON representation of the map query parameters
 */
export const getMapUrl = (mapParams) => {
  const params = Object.keys(mapParams).map(param => `${param}=${mapParams[param]}`).join('&')
  const url = `${RoutePaths.Map}?${params}`;
  return url;
};

/**
 * Helper function that returns the initial ol map object
 *
 * @param {React.RefObject} mapRef dom node for the map
 * @param {number} lat latitude
 * @param {number} lon longitude
 * @param {number} zoom zoom level
 */
export const getInitialMap = (mapRef, lat, lon, zoom) => new Map({
  target: mapRef.current,
  controls: [
    new ScaleLine({ units: "us" }),
    new BasemapPicker(),
  ],
  view: new View({
    center: fromLonLat([lon, lat]),
    zoom,
  }),
  layers: [],
});

/**
 * Helper function that returns the map overlayy
 *
 * @param {string} id overlay id
 * @param {React.RefObject} popupContainer dom node for the popup container
 */
export const getMapOverlay = (id, popupContainer) => new Overlay({
  id,
  element: popupContainer.current,
  positioning: "bottom-center",
  stopEvent: false,
  autoPan: true,
  offset: [0, -10],
});

const createStyle = (src, img) => new Style({
  image: new Icon({
    anchor: [0.5, 0.96],
    crossOrigin: "anonymous",
    src: src,
    img,
    imgSize: img && [img.width, img.height],
  }),
});

/**
 * Helper function that returns the map vector layers
 * 
 * @param {array} locationSummaries array of location data to display on the map
 */
export const getMapLayers = (locationSummaries) => {
  const icons = locationSummaries.map((item, index) => {
    const icon = new Feature( new Point(fromLonLat([item.longitude, item.latitude])) );
    icon.setProperties({
      model: { ...item },
    });
    icon.setId(index);
    icon.set(
      "style",
      createStyle("https://openlayers.org/en/latest/examples/data/icon.png", undefined),
    );
    return icon;
  });

  const source = new VectorSource({ features: icons });

  const unclusteredLayer = new VectorLayer({
    name: "unclusteredLayer",
    source: source,
    style: feature => feature.get("style"),
    maxResolution: 200,
  });

  const styleCache = {};
  const clusters = new VectorLayer({
    name: "clusters",
    source: new Cluster({
      distance: 50,
      source: source,
    }),
    style: (feature) => {
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

  return { unclusteredLayer, clusters };
};
