import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";

export default createRestBundle({
  name: "locationLevel",
  getTemplate: getRestUrl( "/water/locations/details/:location_code/levels/current", "/location-levels.json?/:location_code" ),
  urlParamSelectors: [ "selectLocationDetailGetTemplateParam" ],
  defaultState: {
    data: [],
  },
});
