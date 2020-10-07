import { createRouteBundle } from "redux-bundler";

import Home from "../app-pages/home/HomePage";
import Locations from "../app-pages/locations/LocationsPage";
import MapPage from "../app-pages/map/MapPage";
import Help from "../app-pages/help/HelpPage";
import Reports from "../app-pages/reports/ReportsPage";
import CorpOfficeReports from "../app-pages/reports/corpOffice/CorpOfficeReportsPage";
import DistrictReports from "../app-pages/reports/district/DistrictReportsPage";
import ProjectReports from "../app-pages/reports/project/ProjectReportsPage";
import WatershedReports from "../app-pages/reports/watershed/WatershedReportsPage";
import CERL from "../app-pages/reports/corpOffice/cerl/CERLContainer";
import SpecialReports from "../app-pages/reports/corpOffice/cerl/special/SpecialReportsContainer";
import AllLocations from "../app-pages/reports/corpOffice/cerl/location/AllLocationsReportsContainer";
import DataResources from "../app-pages/dataResources/DataResourcesPage";
import NotFound from "../app-pages/NotFound";

export const RoutePaths = {
  Home: `/`,
  Help: `/help`,
  Locations: `/locations`,
  Map: `/map`,
  ReportsHome: `/reports`,
  DataResources: `/data-resources`,
  CorpOfficeList: `/reports/corporate`,
  DistrictReports: `/reports/district`,
  WatershedReports: `/reports/watershed`,
  ProjectReports: `/reports/project`,
  CorpOfficeReports: `/reports/corporate/:corpOfficeId`,
  CorpOfficeSpecialReports: `/reports/corporate/:corpOfficeId/special`,
  CorpOfficeLocationReports: `/reports/corporate/:corpOfficeId/locations`,
};

export default createRouteBundle(
  {
    "": Home,
    [RoutePaths.Home]: Home,
    [RoutePaths.Help]: Help,
    [RoutePaths.Locations]: Locations,
    [RoutePaths.Map]: MapPage,
    [RoutePaths.ReportsHome]: Reports,
    [RoutePaths.CorpOfficeList]: CorpOfficeReports,
    [RoutePaths.DistrictReports]: DistrictReports,
    [RoutePaths.WatershedReports]: WatershedReports,
    [RoutePaths.ProjectReports]: ProjectReports,
    [RoutePaths.CorpOfficeReports]: CERL,
    [RoutePaths.CorpOfficeSpecialReports]: SpecialReports,
    [RoutePaths.CorpOfficeLocationReports]: AllLocations,
    [RoutePaths.DataResources]: DataResources,
    "*": NotFound,
  },
  {
    routeInfoSelector: "selectPathnameMinusHomepage",
  }
);
