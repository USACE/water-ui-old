import createRestBundle from "../create-rest-bundle";
import { getRestUrl } from "../bundle-utils";
import { RoutePaths } from "../route-paths";

export default createRestBundle({
  name: "districtReports",
  uid: "districtId",
  prefetch: false,
  staleAfter: 0,
  persist: false,
  getTemplate: getRestUrl(
    "/water/reports/DistrictReports",
    "/district-reports.json",
    true ),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  activeRoutes: [ RoutePaths.DistrictReports ],
  forceFetchActions: [],
  defaultState: {
    data: [],
  },
});
