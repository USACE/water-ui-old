import createRestBundle from "../../create-rest-bundle";
import { getRestUrl } from "../../bundle-utils";

export default createRestBundle({
  name: "cwmsLevel",
  getTemplate: getRestUrl( "/water/cwms/:location_code/levels/current", "/location-levels.json?/:location_code" ),
  urlParamSelectors: [ "selectCwmsDetailGetTemplateParam" ],
  defaultState: {
    data: [],
  },
});
