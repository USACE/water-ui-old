import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle({
  name: "corporateOfficeReports",
  uid: "title",
  prefetch: true, // Need to figure out how to set this to false and only fetch when route matches
  staleAfter: 10000,
  persist: false,
  routeParam: "corpOfficeSlug",
  getTemplate: getRestUrl(
    "/water/locations/offices/:corpOfficeSlug/reports",
    "/corporate-office-reports.json?:corpOfficeSlug",
    true ),
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
