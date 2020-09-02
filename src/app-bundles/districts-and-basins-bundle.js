import createRestBundle from "./create-rest-bundle";
import { isMockMode } from "./bundle-utils";

export default createRestBundle({
  name: "districtsAndBasins",
  uid: "BasinLocationCode",
  prefetch: true,
  staleAfter: 10000,
  persist: false,
  //routeParam: "districtsAndBasinsSlug",
  getTemplate: isMockMode() ? "/districts-and-basins.json" : "/api/districts-and-basins",
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: [],
  forceFetchActions: [],
});
