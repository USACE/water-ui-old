import React, { useRef, useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import { toLonLat, fromLonLat } from "ol/proj";
import { unByKey } from "ol/Observable";
import Loader from "../../../../app-common/loader/Loader";
import {
  defaultMapParams,
  mapUrlOptions,
  getInitialMap,
  getMapOverlay,
  getMapLayers,
  locationTypes,
  displayTypes,
} from "../../map-utils";
import "ol/ol.css";
import "./map.scss";

const mapKey = "locationsMap";
const overlayId = "map-overlay";

const Map = ( props ) => {
  const {
    queryObject,
    /** @type a2w.models.LocationSummary[] */
    locationSummaries,
    locationsMapIsDataLoaded,
    locationsMapIsLoaded,
    doUpdateQuery,
    doMapsInitialize,
    doMapsShutdown,
    doLocationsMapLoaded,
  } = props;

  const [map, setMap] = useState(null);

  // dom refs
  const mapRef = useRef( null );
  const popupContainer = useRef( null );
  const popupContent = useRef( null );
  const popupCloser = useRef( null );

  // these refs store the unique key for its respective map listener
  const pointermoveKey = useRef();
  const clickKey = useRef();
  const moveendKey = useRef();

  const lat = parseFloat(queryObject.lat) || defaultMapParams.lat;
  const lon = parseFloat(queryObject.lon) || defaultMapParams.lon;
  const zoom = parseFloat(queryObject.zoom) || defaultMapParams.zoom;
  const locationType = queryObject.locationType || defaultMapParams.locationType;
  const display = queryObject.display || defaultMapParams.display;

  // componentDidMount
  useEffect(() => {
    if (!map) {
      const initialMap = getInitialMap(mapRef, lat, lon, zoom);
      setMap(initialMap);
      doMapsInitialize(mapKey);
    }
  }, [lat, lon, zoom, map, doMapsInitialize, setMap]);

  // componentWillUnmount()
  useEffect(() => () => doMapsShutdown(mapKey), [doMapsShutdown]);

  // add map overlay
  useEffect(() => {
    if (locationsMapIsDataLoaded && !locationsMapIsLoaded) {
      const overlay = getMapOverlay(overlayId, popupContainer);
      map.addOverlay(overlay);

      popupCloser.current.onclick = () => {
        overlay.setPosition(undefined);
        popupCloser.current.blur();
        return false;
      };
      doLocationsMapLoaded();
    }
  }, [map, locationsMapIsDataLoaded, locationsMapIsLoaded, locationSummaries, doLocationsMapLoaded]);

  // update the map listeners
  useEffect(() => {
    if (locationsMapIsLoaded) {
      // remove the previous map listeners
      unByKey(pointermoveKey.current);
      unByKey(moveendKey.current);
      unByKey(clickKey.current);

      const overlay = map.getOverlayById(overlayId);

      // display popup if user moves on top of one of the locations
      pointermoveKey.current = map.on("pointermove", (e) => {
        const feature = map.forEachFeatureAtPixel(e.pixel, feature => feature);

        // need to adjust to add properties at base level and popup blurs on mouse exit
        if (feature) {
          const geometry = feature.getGeometry();
          const coord = geometry.getCoordinates();
          let properties = feature.getProperties();
  
          // feature can already be a specific location, or a cluster of features.
          if (Array.isArray(properties.features) && properties.features.length > 0) {
            properties = properties.features[0].getProperties();
          }
  
          popupContent.current.innerHTML = `<div class="name">${ properties.model.public_name }</div>`;
          popupContent.current.onclick = () => {
            const newQuery = {
              ...queryObject,
              locationId: properties.model.id,
              lon: properties.model.longitude,
              lat: properties.model.latitude,
              zoom: properties.model.zoom_depth,
              display: displayTypes.opened,
            };
            doUpdateQuery(newQuery, mapUrlOptions);
          };
  
          overlay.setPosition(coord);
        }
        if (e.dragging) return;
        const pixel = map.getEventPixel(e.originalEvent);
        const hit = map.hasFeatureAtPixel(pixel);
  
        map.getTarget().style.cursor = hit ? "pointer" : "";
      });

      // update the lat, lon, and zoom when user moves to a new location within map
      moveendKey.current = map.on("moveend", (e) => {
        const mapView = e.map.getView();
        const [newLon, newLat] = toLonLat(mapView.getCenter());
        const newZoom = mapView.getZoom();
        const newQuery = {
          ...queryObject,
          lon: newLon,
          lat: newLat,
          zoom: newZoom,
        };
        doUpdateQuery(newQuery, mapUrlOptions);
      });
  
      // close the popup on click
      clickKey.current = map.on("click", () => {
        overlay.setPosition(undefined);
        popupCloser.current.blur();
        return false;
      });
    }

    // remove the popup event listeners
    const popup = popupContent.current;
    return () => {
      if (map && locationsMapIsLoaded) {
        popup.onclick = null;
      }
    };
  }, [locationsMapIsLoaded, map, queryObject, doUpdateQuery]);

  // update map center and zoom if the query params change
  useEffect(() => {
    if (map) {
      const view = map.getView();
      const [mapLon, mapLat] = toLonLat( view.getCenter() );
      const mapZoom = view.getZoom();

      if (mapLat !== lat || mapLon !== lon || mapZoom !== zoom) {
        view.animate({
          zoom,
          center: fromLonLat([lon, lat]),
          duration: 1000,
        });
      }
    }
  }, [map, lat, lon, zoom]);

  // there's a bug with OpenLayers where if you attach a map to a div with "display: none", then the map
  // will not display even if you remove the "display: none". This bug occurs when the user initially loads
  // the map details in full screen mode, then collapses the map details to display the map (in which case the map
  // will just be blank). To fix this, we just need to call map.updateSize whenever the map details display changes.
  useEffect(() => {
    if (map) {
      map.updateSize();
    }
  }, [map, display])

  // add the map layers depending on the location type
  useEffect(() => {
    if (locationsMapIsLoaded && locationType) {
      // remove the previous map layers
      map.getLayers().getArray()
        .filter((layer) => layer.get("name"))
        .forEach((layer) => map.removeLayer(layer));

      let filteredLocations;
      switch (locationType) {
        case locationTypes.ALL:
          filteredLocations = locationSummaries;
          break;
        case locationTypes.STREAM_LOCATION:
          filteredLocations = locationSummaries.filter(location => location.sub_location_type === locationType);
          break;
        default:
          filteredLocations = locationSummaries.filter(location => location.location_type === locationType);
      }

      // add new map layers
      const { unclusteredLayer, clusters } = getMapLayers(filteredLocations);
      map.addLayer(clusters);
      map.addLayer(unclusteredLayer);
    }
  }, [locationsMapIsLoaded, map, locationType, locationSummaries]);

  const popup = (
    <div ref={popupContainer} className="ol-popup">
      <button ref={popupCloser} className="ol-popup-closer" />
      <div ref={popupContent} className="ol-popup-content" />
    </div>
  );
  return (
    <div
      ref={mapRef}
      className={`map-container ${display}`}
    >
      { locationsMapIsDataLoaded ? popup : <Loader /> }
    </div>
  );
};

Map.propTypes = {
  queryObject: PropTypes.shape({
    locationId: PropTypes.string,
    lat: PropTypes.string,
    lon: PropTypes.string,
    zoom: PropTypes.string,
    display: PropTypes.string,
  }).isRequired,
  locationSummaries: PropTypes.array,
  locationsMapIsDataLoaded: PropTypes.bool.isRequired,
  locationsMapIsLoaded: PropTypes.bool.isRequired,
  doUpdateQuery: PropTypes.func.isRequired,
  doLocationsMapLoaded: PropTypes.func.isRequired,
  doMapsInitialize: PropTypes.func.isRequired,
  doMapsShutdown: PropTypes.func.isRequired,
};

export default connect(
  "selectQueryObject",
  "selectLocationSummaries",
  "selectLocationsMapIsDataLoaded",
  "selectLocationsMapIsLoaded",
  "doUpdateQuery",
  "doLocationsMapLoaded",
  "doMapsInitialize",
  "doMapsShutdown",
  Map,
);
