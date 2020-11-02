import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

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
  fetchActions: [ "LOCATION_CODE_SELECTED" ],
  forceFetchActions: [],
  urlParamSelectors: [ "selectLocationTimeSeriesAsGetTemplateParams" ],
  addons: {
    selectLocationTimeSeries: createSelector(
      "selectLocationTimeSeriesData",
      ( timeSeriesItems ) => {
        if( timeSeriesItems && Array.isArray( timeSeriesItems ) && timeSeriesItems.length > 0 ) {
          return timeSeriesItems[ 0 ][ "time-series" ];
        }
      }
    ),
    selectLocationTimeSeriesAsGetTemplateParams: createSelector(
      "selectLocationDetailCode",
      "selectLocationSummariesData",
      ( locationDetailCode, summaryMap ) => {
        if( !locationDetailCode ) return {};

        /** @type a2w.models.LocationSummary */
        const summary = summaryMap[ locationDetailCode ];

        if( !summary || summary.office_id === "" || summary.location_id === "" ) return {};

        return {
          location_id: summary.location_id,
          office_id: summary.office_id
        };
      }
    ),

  }
} )
