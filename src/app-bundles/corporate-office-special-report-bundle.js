import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle({
  name: "corporateOfficeSpecialReports",
  uid: "title",
  prefetch: true, // Need to figure out how to set this to false and only fetch when route matches
  staleAfter: 0,
  persist: false,
  routeParam: "corpOfficeSlug",
  getTemplate: getRestUrl(
    "/water/locations/offices/:corpOfficeSlug/reports",
    "/corporate-office-special-reports.json?:corpOfficeSlug",
    true ),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: [],
  forceFetchActions: [],
  addons: {
    selectCorporateOfficeSpecialReports: createSelector(
      "selectCorporateOfficeSpecialReportsItems",
      (reports) => {
        // TODO: Using a selector in case we need to process the list of reports further
        return reports;
      }
    ),
  },
});
