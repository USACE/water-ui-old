import { createRouteBundle } from "redux-bundler";

import HomePage from "../app-pages/home/home";
import HelpPage from "../app-pages/help/help";
import DataResourcesPage from "../app-pages/data-resources/data-resources";
import Locations from "../app-pages/locations/locations";
import MapPage from "../app-pages/map/map-page";
import Reports from "../app-pages/reports";
import CorpOfficeReports from "../app-pages/reports/corp-office-reports/corp-office-list";
import DistrictReports from "../app-pages/reports/district-reports/district-reports";
import ProjectReports from "../app-pages/reports/project-reports/project-reports";
import WatershedReports from "../app-pages/reports/watershed-reports/watershed-reports";
import OfficeLocationReportsPage from "../app-pages/reports/corp-office-reports/office-location-reports/office-location-reports";
import SpecialReports from "../app-pages/reports/corp-office-reports/office-location-reports/special-reports/special-reports";
import AllLocations from "../app-pages/reports/corp-office-reports/office-location-reports/all-locations/all-locations-reports";
import fourOhFour from "../app-pages/fourOhFour";


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
    "": HomePage,
    [RoutePaths.Home]: HomePage,
    [RoutePaths.Help]: HelpPage,
    [RoutePaths.Locations]: Locations,
    [RoutePaths.Map]: MapPage,
    [RoutePaths.ReportsHome]: Reports,
    [RoutePaths.CorpOfficeList]: CorpOfficeReports,
    [RoutePaths.DistrictReports]: DistrictReports,
    [RoutePaths.WatershedReports]: WatershedReports,
    [RoutePaths.ProjectReports]: ProjectReports,
    [RoutePaths.CorpOfficeReports]: OfficeLocationReportsPage,
    [RoutePaths.CorpOfficeSpecialReports]: SpecialReports,
    [RoutePaths.CorpOfficeLocationReports]: AllLocations,
    [RoutePaths.DataResources]: DataResourcesPage,
    "*": fourOhFour,
  },
  {
    routeInfoSelector: "selectPathnameMinusHomepage",
  }
);
