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
import { createSelector } from "redux-bundler";
import { mapsBundleActions } from "./maps-bundle";

const actions = {
  LOCATIONS_MAP_DATA_LOADED: "LOCATIONS_MAP_DATA_LOADED",
  LOCATIONS_MAP_LOADED: "LOCATIONS_MAP_LOADED",
};

const name = "locationsMap";

export default {
  name,

  getReducer: () => {
    const initialData = {
      _isInitialized: false,
      _isDataLoaded: false,
      _isMapLoaded: false,
    };

    return (state = initialData, { type, payload }) => {
      switch (type) {
        case mapsBundleActions.MAPS_INITIALIZED: {
          if (payload.mapKey === name) {
            return {
              ...state,
              _isInitialized: true
            };
          }
          return state;
        }
        case mapsBundleActions.MAPS_SHUTDOWN: {
          if (payload.mapKey === name) {
            return {
              ...state,
              _isInitialized: false,
              _isDataLoaded: false,
              _isMapLoaded: false,
            };
          }
          return state;
        }
        case actions.LOCATIONS_MAP_DATA_LOADED:
        case actions.LOCATIONS_MAP_LOADED:
          return Object.assign({}, state, payload);
        default:
          return state;
      }
    };
  },

  selectLocationsMap: state => state.locationsMap,

  doLocationsMapDataLoaded: () => ({
    type: actions.LOCATIONS_MAP_DATA_LOADED,
    payload: {
      _isDataLoaded: true,
    },
  }),

  doLocationsMapLoaded: () => ({
    type: actions.LOCATIONS_MAP_LOADED,
    payload: {
      _isMapLoaded: true,
    },
  }),

  reactLocationsMapShouldAddData: createSelector(
    "selectLocationsMap",
    "selectLocationSummariesItems",
    ({ _isInitialized, _isDataLoaded }, locationSummariesItems) => {
      console.log('reactLocationsMapShouldAddData()');
      if (_isInitialized && !_isDataLoaded && locationSummariesItems.length > 0) {
        return { actionCreator: "doLocationsMapDataLoaded" };
      }
    },
  ),

  doLocationsMapAddData: (map) => async ({ store }) => {
    const data = store.selectLocationSummaries();

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
          new Point(fromLonLat([jsonItem.longitude, jsonItem.latitude]))
        );
        iconFeature.setProperties( { model: { ...jsonItem } } );
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
      closer = document.getElementById("map-popup-closer");

    const overlay = new Overlay({
      element: container,
      positioning: "bottom-center",
      stopEvent: false,
      autoPan: true,
      offset: [0, -10],
    });

    // get map obj from state
    // const map = store.selectOlMap();

    //add data points to map obj
    map.addOverlay(overlay);
    map.addLayer(raster);
    map.addLayer(clusters);
    map.addLayer(unclusteredLayer);

    if(closer){
      closer.onclick = function () {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
      };
    }
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
        else console.log( "map has store?", store, store.doSetSelectedLocationCode );

        let content = `<h5>${ featureProperties.model.public_name }</h5>`;
        content += `<p>${ featureProperties.model.longitude }, ${ featureProperties.model.latitude }</p>`;
        contentContainer.innerHTML = content;
        contentContainer.style.cursor = "pointer";

        // TODO: Probably need to think about how to attach the listener, to ensure that it is removed
        //  when the overlay element is removed, to prevent memory leaks?
        contentContainer.onclick = () => store.doSetSelectedLocationCode( featureProperties.model.location_code );

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

    store.doLocationsMapLoaded(true);
  },
};
