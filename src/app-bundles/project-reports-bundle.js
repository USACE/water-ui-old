import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle({
  name: "ProjectReports",
  uid: "title",
  prefetch: true, // Need to figure out how to set this to false and only fetch when route matches
  staleAfter: 0,
  persist: false,
  //routeParam: "",
  getTemplate: getRestUrl(
    "/water/reports/ProjectReports",
    "/project-reports.json",
    true ),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: [],
  forceFetchActions: [],
  addons: {
    selectProjectReports: createSelector(
      "selectProjectReportsItems",
      (reports) => {
        // TODO: Using a selector in case we need to process the list of reports further
        return reports;
      }
    ),
  },
});
