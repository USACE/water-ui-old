import createRestBundle from "../create-rest-bundle";
import { getRestUrl } from "../bundle-utils";

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
  forceFetchActions: [],
  urlParamSelectors: [],
  defaultState: {
    data: [],
  },
});
