import createRestBundle from "./create-rest-bundle";
import { isMockMode } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle({
  name: "corporateOffice",
  uid: "office_id",
  prefetch: true,
  staleAfter: 10000,
  persist: false,
  routeParam: "corpOfficeSlug",
  getTemplate: isMockMode() ? "/offices.json" : "/water/locations/offices",
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: [],
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
