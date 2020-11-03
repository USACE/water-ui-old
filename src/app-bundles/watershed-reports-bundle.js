import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { RoutePaths } from "./routes-bundle";

export default createRestBundle({
  name: "watershedReports",
  uid: "title",
  prefetch: false,
  staleAfter: 0,
  persist: false,
  getTemplate: getRestUrl(
    "/water/reports/WatershedReports",
    "/watershed-reports.json",
    true ),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  activeRoutes: [ RoutePaths.WatershedReports ],
  forceFetchActions: [],
  defaultState: {
    data: [],
  },
});
