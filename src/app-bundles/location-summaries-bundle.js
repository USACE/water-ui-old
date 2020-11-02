import createRestBundle from "./create-rest-bundle";
import { getRestUrl, isMockMode } from "./bundle-utils";

export default createRestBundle( {
  name: "locationSummaries",
  uid: "id",
  prefetch: true,
  staleAfter: 10000,
  persist: false,
  getTemplate: getRestUrl( "/water/locations", "/location-list.json" ),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: [],
  forceFetchActions: [],
  delayMs: isMockMode() ? 2000 : 0,
} );
