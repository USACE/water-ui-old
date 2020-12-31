import createRestBundle from "../../create-rest-bundle";
import { getRestUrl } from "../../bundle-utils";

export default createRestBundle({
  name: "cwmsNid",
  getTemplate: getRestUrl( "/water/cwms/:location_code/nid", "/location-nid.json?/:location_code" ),
  urlParamSelectors: [ "selectCwmsDetailGetTemplateParam" ],
});
