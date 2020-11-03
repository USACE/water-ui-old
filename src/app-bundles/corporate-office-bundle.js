import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle({
  name: "corporateOffice",
  uid: "office_id",
  prefetch: false,
  staleAfter: 10000,
  persist: true,
  routeParam: "corpOfficeId",
  getTemplate: getRestUrl( "/water/locations/offices", "/offices.json" ),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  forceFetchActions: [],
  defaultState: {
    data: [],
  },
  addons: {
    selectCorporateOfficeByRoute: createSelector(
      "selectRouteParams",
      "selectCorporateOfficeData",
      (routeParams, data) => {
        if (!routeParams.corpOfficeId || !data) {
          return {};
        }
        const index = data.findIndex(({ office_id }) => office_id === routeParams.corpOfficeId);
        return data[index];
      },
    ),
  },
});
