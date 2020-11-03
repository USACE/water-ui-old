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
      ( timeSeriesItems ) => {
        if( timeSeriesItems && Array.isArray( timeSeriesItems ) && timeSeriesItems.length > 0 ) {
          return timeSeriesItems[ 0 ][ "time-series" ];
        }
      }
    ),
    selectLocationTimeSeriesAsGetTemplateParams: createSelector(
      "selectLocationDetailCode",
      "selectLocationSummariesData",
      "selectLocationDetailData",
      ( locationDetailCode, locationSummariesData, locationDetailData ) => {
        if( !locationDetailCode ) return {};

        /** @type a2w.models.LocationSummary */
        let summary;
        let office_id;
        let location_id;

        /** @type { a2w.models.LocationDetail } */
        let detailData = locationDetailData;

        if( Array.isArray( locationSummariesData ) ) {
          summary = locationSummariesData.find( item => item.id === locationDetailCode );
        }

        // Try to pull office ID and location ID from summary
        if( summary ) {
          office_id = summary.office_id;
          location_id = summary.location_id;
        }
        // Otherwise, try to pull them from the location detail
        else if( detailData ) {
          office_id = detailData.office_id
          location_id = detailData.location_id;
        }

        if( !office_id || !location_id ) return {};

        return {
          location_id: location_id,
          office_id: office_id
        };
      }
    ),

  }
} )
