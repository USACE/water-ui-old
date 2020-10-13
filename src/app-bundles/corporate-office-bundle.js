import createRestBundle from "./create-rest-bundle";
import { prodUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";
import { RoutePaths } from "./routes-bundle";

export default createRestBundle({
  name: "corporateOffice",
  uid: "office_id",
  prefetch: false,
  staleAfter: 10000,
  persist: true,
  routeParam: "corpOfficeId",
  getTemplate: `${ prodUrl }/water/locations/offices`,
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  activeRoutes: [ RoutePaths.CorpOfficeList ],
  fetchActions: ["APP_INITIALIZED","URL_UPDATED"],
  forceFetchActions: [],
  addons: {
    selectCorporateOffices: createSelector(
      "selectCorporateOfficeItems",
      (offices) => {
        // TODO: Using a selector in case we need to process the list of offices further
        return offices;
      }
    ),
    selectCorporateOfficeIdByRoute: createSelector(
      "selectCorporateOfficeByRoute",
      (office) => {
        if (!office) return {};
        return {
          officeId: office.office_id,
        };
      }
    ),
  },
});
