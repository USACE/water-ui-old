import { createRouteBundle } from "redux-bundler";
import pkg from "../../package.json";
import Home from "../app-pages/home/HomePage";
import Locations from "../app-pages/locations/LocationsPage";
import MapPage from "../app-pages/map/MapPage";
import Help from "../app-pages/help/HelpPage";
import Reports from "../app-pages/reports/ReportsPage";
import CorpOfficeReports from "../app-pages/reports/corp-office/CorpOfficeReportsPage";
import DistrictReports from "../app-pages/reports/district/DistrictReportsPage";
import ProjectReports from "../app-pages/reports/project/ProjectReportsPage";
import WatershedReports from "../app-pages/reports/watershed/WatershedReportsPage";
import OfficeLocationReport from "../app-pages/reports/corp-office/office-location/OfficeLocationReport";
import SpecialReports from "../app-pages/reports/corp-office/office-location/special/SpecialReportsContainer";
import AllLocations from "../app-pages/reports/corp-office/office-location/all-locations/AllLocationsReportsContainer";
import DataResources from "../app-pages/data-resources/DataResourcesPage";
import NotFound from "../app-pages/NotFound";

// get the base url for which all the routes will be nested under
const homepage = new URL(pkg.homepage);
const baseUrl = homepage.pathname;

export const RoutePaths = {
  Home: baseUrl,
  Help: `${baseUrl}/help`,
  Locations: `/locations/:locationId`,
  Map: `${baseUrl}/map`,
  ReportsHome: `${baseUrl}/reports`,
  DataResources: `${baseUrl}/data-resources`,
  CorpOfficeList: `${baseUrl}/reports/corporate`,
  CorpOfficeReports: `${baseUrl}/reports/corporate/:corpOfficeId`,
  CorpOfficeSpecialReports: `${baseUrl}/reports/corporate/:corpOfficeId/special`,
  CorpOfficeLocationReports: `${baseUrl}/reports/corporate/:corpOfficeId/locations`,
  DistrictReports: `${baseUrl}/reports/district`,
  WatershedReports: `${baseUrl}/reports/watershed`,
  ProjectReports: `${baseUrl}/reports/project`,
};

export default createRouteBundle({
  [RoutePaths.Home]: Home,
  [RoutePaths.Help]: Help,
  [RoutePaths.Locations]: Locations,
  [RoutePaths.Map]: MapPage,
  [RoutePaths.ReportsHome]: Reports,
  [RoutePaths.CorpOfficeList]: CorpOfficeReports,
  [RoutePaths.DistrictReports]: DistrictReports,
  [RoutePaths.WatershedReports]: WatershedReports,
  [RoutePaths.ProjectReports]: ProjectReports,
  [RoutePaths.CorpOfficeReports]: OfficeLocationReport,
  [RoutePaths.CorpOfficeSpecialReports]: SpecialReports,
  [RoutePaths.CorpOfficeLocationReports]: AllLocations,
  [RoutePaths.DataResources]: DataResources,
  "*": NotFound,
});
