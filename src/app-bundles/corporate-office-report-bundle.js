import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle({
  name: "corporateOfficeReports",
  uid: "title",
  prefetch: false,
  staleAfter: 0,
  persist: false,
  routeParam: "corpOfficeId",
  getTemplate: getRestUrl(
    "/water/locations/offices/:corpOfficeId/reports",
    "/corporate-office-reports.json?/:corpOfficeId",
    true ),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: ["APP_INITIALIZED","URL_UPDATED"],
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
