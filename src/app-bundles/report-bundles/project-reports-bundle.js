import createRestBundle from "../create-rest-bundle";
import { getRestUrl } from "../bundle-utils";
import { RoutePaths } from "../route-paths";

export default createRestBundle({
  name: "projectReports",
  uid: "title",
  prefetch: false,
  staleAfter: 0,
  persist: false,
  getTemplate: getRestUrl(
    "/water/reports/ProjectReports",
    "/project-reports.json",
    true ),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  activeRoutes: [ RoutePaths.ProjectReports ],
  forceFetchActions: [],
  defaultState: {
    data: [],
  },
});
