import createRestBundle from "./create-rest-bundle";
import { isMockMode } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle({
  name: "corporateOfficeLocationReports",
  uid: "title",
  prefetch: true, // Need to figure out how to set this to false and only fetch when route matches
  staleAfter: 0,
  persist: false,
  routeParam: "corpOfficeSlug",
  getTemplate: isMockMode() ? "/corporate-office-location-reports.json?:corpOfficeSlug" : "/water/locations/offices/:corpOfficeSlug/reports",
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: [],
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
