import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle({
  name: "corporateOfficeLocationReports",
  uid: "title",
  prefetch: false,
  staleAfter: 0,
  persist: false,
  routeParam: "corpOfficeId",
  getTemplate: getRestUrl(
    "/water/locations/offices/:corpOfficeId/reports",
    "/corporate-office-location-reports.json?/:corpOfficeId",
    true ),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: ["APP_INITIALIZED","URL_UPDATED"],
  forceFetchActions: [],
  addons: {
    selectCorporateOfficeLocationReports: createSelector(
      "selectCorporateOfficeLocationReportsItems",
      (reports) => {
        // TODO: Using a selector in case we need to process the list of reports further
        return reports;
      }
    ),
  },
});
