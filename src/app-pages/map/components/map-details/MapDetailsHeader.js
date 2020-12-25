import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import LocationStreamControls from "./components/location-stream-controls/LocationStreamControls";
import {
  sourceTypes,
  defaultMapParams,
  displayTypes,
  mapUrlOptions,
} from "../../map-utils";

/** @type any */
const MapDetailsHeader = forwardRef((props, ref) => {
  const {
    queryObject,
    cwmsDetailData,
    locationSummariesData,
    doUpdateQuery,
    locationSummariesHasLoaded,
  } = /** @type {any} */ ( props );

  const weatherUrl = `https://forecast.weather.gov/MapClick.php?CityName=${cwmsDetailData.nearest_city}&state=${cwmsDetailData.state}`;
  const id = queryObject.id;
  const source = queryObject.source;
  const display = displayTypes[queryObject.display] ? queryObject.display : defaultMapParams.display;

  const closeBtnOnClick = () => {
    const newQuery = { ...queryObject };
    if (display === displayTypes.fs) {
      newQuery.display = displayTypes.opened;
    } else {
      newQuery.display = displayTypes.closed;
    }
    doUpdateQuery(newQuery, mapUrlOptions)
  };

  const expandBtnOnClick = () => {
    const newQuery = { ...queryObject };
    if (display === displayTypes.closed) {
      newQuery.display = displayTypes.opened;
    } else {
      newQuery.display = displayTypes.fs;
    }
    doUpdateQuery(newQuery, mapUrlOptions)
  };

  return (
    <div
      ref={ref}
      className={`map-details-header ${display}`}
    >
      <button
        type="button"
        className="map-details-toggle-btn toggle-close"
        title="Collapse Location Details"
        onClick={closeBtnOnClick}
      />
      <button
        type="button"
        className="map-details-toggle-btn toggle-expand"
        title="Expand Location Details"
        onClick={expandBtnOnClick}
      />
      { locationSummariesHasLoaded && locationSummariesData[id] &&
        <h4>{ locationSummariesData[id].public_name }</h4>
      }
      { source === sourceTypes.CWMS && cwmsDetailData && Object.keys(cwmsDetailData).length > 0 && 
        <div>
          {cwmsDetailData.office_name}
          <span className="pipe" />
          <a
            href={weatherUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Local Forecast
          </a>
        </div>
      }
      { source === sourceTypes.CWMS && locationSummariesHasLoaded &&
        <LocationStreamControls
          queryObject={queryObject}
          cwmsDetailData={cwmsDetailData}
          locationSummariesData={locationSummariesData}
          doUpdateQuery={doUpdateQuery}
        />
      }
    </div>
  );
});

MapDetailsHeader.propTypes = /** @type {any} */ ({
  queryObject: PropTypes.shape({
    id: PropTypes.string.isRequired,
    lon: PropTypes.string,
    lat: PropTypes.string,
    zoom: PropTypes.string,
    display: PropTypes.string,
  }).isRequired,
  cwmsDetailData: PropTypes.object,
  locationSummariesData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  doUpdateQuery: PropTypes.func.isRequired,
  locationSummariesHasLoaded: PropTypes.bool,
});

export default MapDetailsHeader;
