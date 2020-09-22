import createRestBundle from "./create-rest-bundle";
import { isMockMode } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle({
  name: "DistrictReports",
  uid: "districtId",
  prefetch: true, // Need to figure out how to set this to false and only fetch when route matches
  staleAfter: 0,
  persist: false,
  //routeParam: "",
  getTemplate: isMockMode() ? "/district-reports.json" : "/water/reports/DistrictReports",
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: [],
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
