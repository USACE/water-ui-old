import React, { useState, useEffect } from "react";
import { connect } from "redux-bundler-react";
import PropTypes from "prop-types";
import { RoutePaths } from "../../../../../../app-bundles/route-paths";
import "./locationStreamControls.scss";

const LocationStreamControls = (props) => {

  const {
    fullScreen,
    /** @type a2w.models.LocationDetail */
    locationDetailData,
    /** @type a2w.models.StreamLocation[] */
    streamLocationsData,
    doLocationsMapSaveMapState,
    doStreamLocationsFetch,
    doUpdateUrl
  } = props;


  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // fetch new stream locations data and reset the current index whenever the locationsDetailData changes
    if( locationDetailData && locationDetailData.stream_location_code ) doStreamLocationsFetch();
    setCurrentIndex(0);
  }, [locationDetailData, doStreamLocationsFetch, setCurrentIndex])

  useEffect(() => {
    // Set the current stream location index to match the current location
    if( locationDetailData && streamLocationsData ) setCurrentIndex(
      streamLocationsData.findIndex( item => item.location_code === locationDetailData.location_code )
    );
  }, [locationDetailData, streamLocationsData, setCurrentIndex])

  const changeStation = ( e, newIndex ) => {
    e.preventDefault();
    e.stopPropagation();

    let nextLocation = streamLocationsData[ newIndex ];

    if( nextLocation ) {
      const newLocation = `${ RoutePaths.Locations.replace(":locationId", nextLocation.location_code) }`;
      setCurrentIndex( newIndex );
      doUpdateUrl( newLocation );
    }
  };

  const jumpStation = (e) => {
    changeStation( e, e.currentTarget.value );
  };

  const saveMapState = () => {
    const mapState = {
      zoom: locationDetailData.zoom_depth ? Math.round( locationDetailData.zoom_depth * 1.5 ) : 16,
      center: [locationDetailData.longitude, locationDetailData.latitude],
    };
    if( locationDetailData.longitude && locationDetailData.latitude ) doLocationsMapSaveMapState( mapState );
  }

  const fullScreenContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <div className="location-stream-control-container" style={!fullScreen ? fullScreenContainerStyle : null}>
      {!fullScreen && (
        <div className="back-to-map-link">
          <a href={RoutePaths.Map} onClick={saveMapState}>Back to Map</a>
        </div>
      )}
      { streamLocationsData && streamLocationsData.length > 0 && (
        <div className="location-stream-controls-wrapper">

          { currentIndex > 0 && (
            <button className="link downstream-station"
                    onClick={ ( e ) => changeStation( e, currentIndex - 1 ) }>
              upstream station
            </button>
          )}

          <select
            className="jump-station"
            aria-labelledby="jump to station dropdown"
            onChange={jumpStation}
            onClick={e => e.stopPropagation()}
            value={currentIndex}
          >
            { streamLocationsData.map((item, i) => (
                <option
                  key={item.location_code}
                  value={i}
                >
                  {item.public_name}
                </option>
              ))
            }
          </select>

          { currentIndex + 1 < streamLocationsData.length && (
            <button className="link upstream-station"
                    onClick={ ( e ) => changeStation( e, currentIndex + 1 ) }>
              downstream station
            </button>
          )}

        </div>
      )}
    </div>
  );
};

LocationStreamControls.propTypes = {
  locationDetailData: PropTypes.object,
  fullScreen: PropTypes.func,
};

export default connect(
  "selectLocationDetailData",
  "selectStreamLocationsData",
  "doLocationsMapSaveMapState",
  "doStreamLocationsFetch",
  "doUpdateUrl",
  LocationStreamControls
);
