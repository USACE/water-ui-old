import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";
import { LOCATIONDETAIL_SET_CODE } from "./location-detail-bundle";

export default createRestBundle( {
  name: "locationTimeSeries",
  uid: null,
  staleAfter: 0,
  persist: false,
  getTemplate: getRestUrl(
    "https://cwms-data.usace.army.mil/cwms-data/timeseries?office=:office_id&name=:location_id.*&format=json",
    "/radar-time-series.json?office=:office_id&name=:location_id.*&format=json" ),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: [ LOCATIONDETAIL_SET_CODE ],
  forceFetchActions: [],
  urlParamSelectors: [ "selectLocationTimeSeriesAsGetTemplateParams" ],
  addons: {
    selectLocationTimeSeries: createSelector(
      "selectLocationTimeSeriesData",
      locationTimeSeriesData => locationTimeSeriesData && locationTimeSeriesData["time-series"] && locationTimeSeriesData["time-series"]["time-series"],
    ),
    selectLocationTimeSeriesAsGetTemplateParams: createSelector(
      "selectLocationDetailCode",
      "selectLocationSummariesData",
      ( locationDetailCode, locationSummariesData ) => {
        if( !locationDetailCode ) return {};

        /** @type a2w.models.LocationSummary */
        const summary = locationSummariesData[ locationDetailCode ];

        if( !summary || summary.office_id === "" || summary.location_id === "" ) return {};

        return {
          location_id: summary.location_id,
          office_id: summary.office_id
        };
      }
    ),

  }
} )
