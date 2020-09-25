import createRestBundle from "./create-rest-bundle";
import { isMockMode } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle({
  name: "corporateOfficeReports",
  uid: "title",
  prefetch: true, // Need to figure out how to set this to false and only fetch when route matches
  staleAfter: 10000,
  persist: false,
  routeParam: "corpOfficeSlug",
  getTemplate: isMockMode() ? "/corporate-office-reports.json?:corpOfficeSlug" : "/water/locations/offices/:corpOfficeSlug/reports",
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: ["URL_UPDATED", "AUTH_LOGGED_IN"],
  forceFetchActions: [],
  urlParamSelectors: [],
  addons: {
    selectCorporateOfficeReports: createSelector(
      "selectCorporateOfficeReportsItems",
      (reports) => {
        // TODO: Using a selector in case we need to process the list of reports further
        return reports;
      }
    ),
  },
});
