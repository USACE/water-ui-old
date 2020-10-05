/* eslint-disable no-mixed-operators */
// import { createSelector } from "redux-bundler";
import { getRestUrl } from "./bundle-utils";
// import { isValidArrWithValues } from "../functions";
import olMap from "ol/Map.js";
import View from "ol/View";
import ScaleBar from "ol/control/ScaleLine";
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
import BasemapPicker from "../ol-controls/basemap-picker";

const actions = {
  MAPS_INITIALIZED: `MAPS_INITIALIZED`,
  MAPS_SHUTDOWN: `MAPS_SHUTDOWN`,
};

export default {
  name: "maps",

  getReducer: () => {
    const initialData = {
      url: getRestUrl( "/water/locations", "/location-list.json" ),
      data:[]
      // shouldFetch: false,
      // error: null,
      // hasLoaded: false,
      // data: null,
      // icon: null,
    };

    return (state = initialData, { type, payload }) => {
      switch (type) {
        case actions.MAPS_INITIALIZED:
        case actions.MAPS_SHUTDOWN:
          return Object.assign({}, state, payload);
        default:
          return state;
      }
    };
  },

  doMapsInitialize: (key, el, options) => async ({ dispatch, store }) => {
    // fetch url, will replace with global fetch function later
    const getClusterData = async (url) => {
      let payload = { data: [] };
      //adjust to fit actual api later
      try {
        const res = await fetch(url);
        payload.data = await res.json();
        // payload = await res.json();
        // Add Status and ok to the payload
        payload.status = res.status;
        payload.ok = res.ok;
      } catch (err) {
        console.error(err);
        return undefined;
      }
      return payload;
    };

    const fetchClusterData = async () => {
      const data = await getClusterData(store.getState().maps.url);
      // if (data && data.ok && data.response) {
      //   return data.response;
      // }
      if (data && data.ok) {
        return data.data;
      }
      console.error("Could not fetch Cluster Data", data);
      return undefined;
    };

    const data = await fetchClusterData();

    function createStyle(src, img) {
      return new Style({
        image: new Icon({
          anchor: [0.5, 0.96],
          crossOrigin: "anonymous",
          src: src,
          img: img,
          imgSize: img ? [img.width, img.height] : undefined,
        }),
      });
    }

    const iconFeatures = [];

    setIconFeatures();

    function setIconFeatures() {
      for (let key in data) {
        const jsonItem = data[key];
        const iconFeature = new Feature(
          new Point(
            fromLonLat([jsonItem.longitude, jsonItem.latitude])
          )
        );
        iconFeature.description = jsonItem.public_name;
        iconFeature.longLat = [jsonItem.longitude, jsonItem.latitude];
        iconFeature.setId(key);
        iconFeature.set(
          "style",
          createStyle(
            "https://openlayers.org/en/latest/examples/data/icon.png",
            undefined
          )
        );
        iconFeatures.push(iconFeature);
      }
    }

    const source = new VectorSource({ features: iconFeatures });

    const unclusteredLayer = new VectorLayer({
      source: source,
      style: function (feature) {
        return feature.get("style");
      },
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

    const container = document.getElementById("map-popup"),
    contentContainer = document.getElementById("map-popup-content"),
    closer = document.getElementById('map-popup-closer');

    const overlay = new Overlay({
      element: container,
      positioning: "bottom-center",
      stopEvent: false,
      autoPan: true,
      offset: [0, -10],
    });

    const map = new olMap(
      Object.assign(
        {
          controls: [new ScaleBar({ units: "us" }), new BasemapPicker()],
          target: el,
          view: new View({
            center: (options && options.center) || [-11000000, 4600000],
            zoom: (options && options.zoom) || 4,
          }),
          // overlays: [overlay],
          layers: [raster, clusters, unclusteredLayer],
        },
        options
      )
    );
    map.addOverlay(overlay);
    closer.onclick = function() {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
  };
    map.on("pointermove", function (e) {
      const feature = map.forEachFeatureAtPixel(e.pixel, function (
        feature
      ) {
        return feature;
      });
      //need to adjust to add properties at base level and popup blurs on mouse exit
      if (feature) {
        const geometry = feature.getGeometry();
        const coord = geometry.getCoordinates();
        const featureProperties = feature.getProperties();
        let displayedFeature = feature;

        // Feature can already be a specific location, or a cluster of features.
        if( Array.isArray( featureProperties.features ) ) {
          if( featureProperties.features.length > 0 ) displayedFeature = featureProperties.features[ 0 ]
          else return;
        }

        //const featureProp = featureProperties.features && featureProperties.features[0] && featureProperties.features[0].description;

        let content =  "<h5>" + displayedFeature.description + "</h5>";
        content += '<p>' + displayedFeature.longLat + '</p>';
        contentContainer.innerHTML = content;
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

    dispatch({
      type: actions.MAPS_INITIALIZED,
      payload: {
        [key]: map,
        data: data,
      },
    });
  },

  doMapsShutdown: (key) => ({ dispatch }) => {
    dispatch({
      type: actions.MAPS_SHUTDOWN,
      payload: {
        [key]: null,
      },
    });
  },
  //   reactDataChange: (state) => {
  //   if (state.maps._shouldInitialize)
  //     return { actionCreator: "doMapsInitialize" };
  // },
  // selectMapsState: (state) => {
  //   return state.maps;
  // },
  // reactMapsShouldInitialize: (state) => {
  //   if (state.maps._shouldInitialize)
  //     return { actionCreator: "doMapsInitialize" };
  // },
  // selectMapsState: (state) => {
  //   return state.maps;
  // },

  // selectMapsObject: createSelector("selectMapsState", (state) => {
  //   const items = {};
  //   Object.keys(state).forEach((key) => {
  //     if (key[0] !== "_") items[key] = state[key];
  //   });
  //   return items;
  // }),

  // selectMapsFlags: createSelector("selectMapsState", (state) => {
  //   const flags = {};
  //   Object.keys(state).forEach((key) => {
  //     if (key[0] === "_") flags[key] = state[key];
  //   });
  //   return flags;
  // }),
};
