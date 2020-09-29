import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";
import { RoutePaths } from "./routes-bundle";

export default createRestBundle({
  name: "DistrictReports",
  uid: "districtId",
  prefetch: false,
  staleAfter: 0,
  persist: false,
  //routeParam: "",
  getTemplate: getRestUrl(
    "/water/reports/DistrictReports",
    "/district-reports.json",
    true ),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  activeRoutes: [ RoutePaths.DistrictReports ],
  fetchActions: ["APP_INITIALIZED","URL_UPDATED"],
  forceFetchActions: [],
  addons: {
    selectDistrictReports: createSelector(
      "selectDistrictReportsItems",
      (reports) => {
        // TODO: Using a selector in case we need to process the list of reports further
        return reports;
      }
    ),
  },
});
