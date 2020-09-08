import { createRouteBundle } from "redux-bundler";

import Home from "../app-pages/Home";
import Locations from "../app-pages/Locations";
import MapPage from "../app-pages/Map";
import Help from "../app-pages/Help";
import Reports from "../app-pages/Reports";
import CorpOfficeReports from "../app-pages/Reports/CorpOfficeReports";
import DistrictReports from "../app-pages/Reports/DistrictReports";
import ProjectReports from "../app-pages/Reports/ProjectReports";
import WatershedReports from "../app-pages/Reports/WatershedReports";
import SpecialReports from "../app-pages/Reports/CorpOfficeReports/SpecialReports";
import DataResources from "../app-pages/DataResources";
import fourOhFour from "../app-pages/fourOhFour";

export default createRouteBundle(
  {
    "": Home,
    "/": Home,
    "/help": Help,
    "/locations": Locations,
    "/map": MapPage,
    "/reports": Reports,
    "/reports/CorpOfficeReports": CorpOfficeReports,
    "/reports/DistrictReports": DistrictReports,
    "/reports/WatershedReports": WatershedReports,
    "/reports/ProjectReports": ProjectReports,
    "/reports/CorpOfficeReports/SpecialReports": SpecialReports,
    "/data-resources": DataResources,
    "*": fourOhFour,
  },
  {
    routeInfoSelector: "selectPathnameMinusHomepage",
  }
);
