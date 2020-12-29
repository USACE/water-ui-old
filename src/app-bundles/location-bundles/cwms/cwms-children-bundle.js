import createRestBundle from "../../create-rest-bundle";
import { getRestUrl } from "../../bundle-utils";

export default createRestBundle({
  name: "cwmsChildren",
  getTemplate: getRestUrl( "/water/cwms/:location_code/children", "/location-children.json?/:location_code" ),
  urlParamSelectors: [ "selectCwmsDetailGetTemplateParam" ],
  defaultState: {
    data: [],
  },
});
