/* eslint-disable no-mixed-operators */
import { createSelector } from "redux-bundler";
import { isMockMode } from "./bundle-utils";
import { isValidArrWithValues } from "../functions";
import olMap from "ol/Map.js";
import View from "ol/View";

import ScaleBar from "ol/control/ScaleLine";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import Feature from "ol/Feature";
import Map from "ol/Map";
import Point from "ol/geom/Point";
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Text,
  Icon,
} from "ol/style";
import { Cluster, OSM, Vector as VectorSource } from "ol/source";
import { get, transform, fromLonLat } from "ol/proj";
import BasemapPicker from "../ol-controls/basemap-picker";

const actions = {
  MAPS_INITIALIZED: `MAPS_INITIALIZED`,
  MAPS_SHUTDOWN: `MAPS_SHUTDOWN`,
};

export default {
  name: "maps",

  getReducer: () => {
    const initialData = {
      url: isMockMode()
        ? "http://localhost:3000/water/mockdata/location-clusters.json"
        : "/api/location-clusters",
      shouldFetch: false,
      error: null,
      hasLoaded: false,
      data: null,
      icon: null,
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
    // fetch url
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

    var iconFeatures = [];

    setIconFeatures();

    function setIconFeatures() {
      for (var key in data) {
        var jsonItem = data[key];
        var iconFeature = new Feature(
          new Point(
            fromLonLat([jsonItem.cluster_longitude, jsonItem.cluster_latitude])
          )
        );
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

    var source = new VectorSource({ features: iconFeatures });

    var unclusteredLayer = new VectorSource({
      source: source,
      style: function (feature) {
        return feature.get("style");
      },
      maxResolution: 2000,
    });

    var clusterSource = new Cluster({
      distance: 10,
      source: source,
    });

    var styleCache = {};

    var clusters = new VectorLayer({
      source: clusterSource,
      style: function (feature) {
        var size = feature.get("features").length;
        var style = styleCache[size];
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
      minResolution: 2001,
    });

    const raster = new TileLayer({
      source: new OSM(),
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
          layers: [raster, clusters],
        },
        options
      )
    );

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
