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
import basin from "../../img/mountain.svg";
import district from "../../img/districts.svg";
import wq from "../../img/water.svg";
import hq from "../../img/building.svg";
import operatingBasin from "../../img/water-wave.svg";
import division from "../../img/water-drop.svg";
import location from "../../img/location.svg";

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
  DAMS: "DAMS",
  LAKES: "LAKES",
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
  basinId: "",
  districtId: "",
  lat: 38.895,
  lon: -95,
  zoom: 5,
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

const iconLibrary = (type,item) => {
  //temp imgs from https://uxwing.com/
  const iconObjects = {
    LOCATION: location,
    BASIN: basin,
    DISTRICT: district,
    WQ: wq,
    HQ: hq,
    OPERATING_BASIN: operatingBasin,
    DIVISION: division,
  };
  return iconObjects[type] || iconObjects.LOCATION;
};

/**
 * Helper function that returns the map vector layers
 * 
 * @param {array} locationSummaries array of location data to display on the map
 */
export const getMapLayers = (locationSummaries) => {
  const icons = locationSummaries.map((item, index) => {
    const icon = new Feature(new Point(fromLonLat([item.longitude, item.latitude])));
    const iconStyle = new Style({
      image: new Icon({
        src: iconLibrary(item.location_type,item),
        anchor: [0.5, 0.7],
        crossOrigin: "anonymous",
      }),
    });
    icon.setProperties({
      model: { ...item },
    });
    icon.setId(index);
    icon.setStyle(iconStyle);
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
