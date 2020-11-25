import React, { useRef, useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import { toLonLat, fromLonLat } from "ol/proj";
import { unByKey } from "ol/Observable";
import Loader from "../../../app-common/loader/Loader";
import { defaultMapParams, getMapUrl, getInitialMap, getMapOverlay, getMapLayers, LOCATION_TYPES } from "../utils";

const mapKey = "locationsMap";
const overlayId = "map-overlay";
const height = "75vh";

const Map = ({
  queryObject,
  doUpdateUrl,
  /** @type a2w.models.LocationSummary[] */
  locationSummaries,
  locationsMapIsDataLoaded,
  locationsMapIsLoaded,
  doMapsInitialize,
  doMapsShutdown,
  doLocationsMapLoaded,
}) => {
  console.log("Map()");
  const [map, setMap] = useState();

  // dom refs
  const mapRef = useRef();
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

  // componentDidMount
  const initialRender = useRef(true); // this ref is used to ensure the componentDidMount useEffect only fires once
  useEffect(() => {
    if (initialRender.current) {
      const initialMap = getInitialMap(mapRef, lat, lon, zoom);
      setMap(initialMap);
      doMapsInitialize(mapKey);
      initialRender.current = false;
    }
  }, [lat, lon, zoom, doMapsInitialize, setMap]);

  // componentWillUnmount()
  useEffect(() => () => doMapsShutdown(mapKey), [doMapsShutdown]);

  // add map overlay
  useEffect(() => {
    if (locationsMapIsDataLoaded && !locationsMapIsLoaded) {
      console.log("add overlay")
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
      console.log("add listeners");
      // remove the previous map listeners
      unByKey(pointermoveKey.current);
      unByKey(moveendKey.current);
      unByKey(clickKey.current);

      const overlay = map.getOverlayById(overlayId);

      const updateMapUrl = (e, locationId) => {
        console.log("updateMapUrl()");
        const mapView = e.map.getView();
        const [newLon, newLat] = toLonLat(mapView.getCenter());
        const newZoom = mapView.getZoom();
        const mapParams = {
          ...queryObject,
          locationId,
          lat: newLat,
          lon: newLon,
          zoom: newZoom,
        };
        const mapUrl = getMapUrl(mapParams);
        doUpdateUrl(mapUrl);
      };

      // display popup if user moves on top of one of the locations
      pointermoveKey.current = map.on("pointermove", (e) => {
        const feature = map.forEachFeatureAtPixel(e.pixel, feature => feature);

        // need to adjust to add properties at base level and popup blurs on mouse exit
        if (feature) {
          const geometry = feature.getGeometry();
          const coord = geometry.getCoordinates();
          let featureProperties = feature.getProperties();
          let displayedFeature = feature;
  
          // feature can already be a specific location, or a cluster of features.
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
          popupContent.current.onclick = () => updateMapUrl(e, featureProperties.model.id);
  
          overlay.setPosition(coord);
        }
        if (e.dragging) return;
        const pixel = map.getEventPixel(e.originalEvent);
        const hit = map.hasFeatureAtPixel(pixel);
  
        map.getTarget().style.cursor = hit ? "pointer" : "";
      });

      // update the lat, lon, and zoom when user moves to a new location within map
      const locationId = queryObject.locationId || defaultMapParams.locationId;
      moveendKey.current = map.on("moveend", e => updateMapUrl(e, locationId));
  
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
  }, [locationsMapIsLoaded, map, queryObject, doUpdateUrl]);

  // update map center and zoom if the query params change
  useEffect(() => {
    if (map) {
      const view = map.getView();
      const [mapLon, mapLat] = toLonLat( view.getCenter() );
      const mapZoom = view.getZoom();

      if (mapLat !== lat || mapLon !== lon || mapZoom !== zoom) {
        view.animate(
          { zoom },
          { center: fromLonLat([lon, lat]) },
          { duration: 1000 }
        );
      }
    }
  }, [map, lat, lon, zoom]);

  // add the map layers based on the location type
  useEffect(() => {
    if (locationsMapIsLoaded && locationType) {
      console.log('add layers hook');
      // remove the previous map layers
      map.getLayers().getArray()
        .filter((layer) => layer.get("name"))
        .forEach((layer) => map.removeLayer(layer));

      let filteredLocations;
      switch (locationType) {
        case LOCATION_TYPES.ALL:
          filteredLocations = locationSummaries;
          break;
        case LOCATION_TYPES.STREAM_LOCATION:
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

  return (
    <div className="map-container">
      <div
        ref={mapRef}
        style={{ height, position: "relative" }}
      >
        {!locationsMapIsDataLoaded && <Loader />}
      </div>
      { locationsMapIsDataLoaded && (
        <div ref={popupContainer} className="ol-popup">
          <button ref={popupCloser} className="ol-popup-closer" />
          <div ref={popupContent} className="ol-popup-content" />
        </div>
      )}
    </div>
  );
};

Map.propTypes = {
  queryObject: PropTypes.shape({
    locationId: PropTypes.string,
    lat: PropTypes.string,
    lon: PropTypes.string,
    zoom: PropTypes.string,
  }).isRequired,
  doUpdateUrl: PropTypes.func.isRequired, // received from parent component
  locationSummaries: PropTypes.array,
  locationsMapIsDataLoaded: PropTypes.bool.isRequired,
  locationsMapIsLoaded: PropTypes.bool.isRequired,
  doLocationsMapLoaded: PropTypes.func.isRequired,
  doMapsInitialize: PropTypes.func.isRequired,
  doMapsShutdown: PropTypes.func.isRequired,
};

export default connect(
  "selectLocationSummaries",
  "selectLocationsMapIsDataLoaded",
  "selectLocationsMapIsLoaded",
  "doLocationsMapLoaded",
  "doMapsInitialize",
  "doMapsShutdown",
  Map,
);
