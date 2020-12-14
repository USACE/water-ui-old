import { createRouteBundle } from "redux-bundler";
import Home from "../app-pages/home/HomePage";
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
import { RoutePaths } from "./route-paths";

export default createRouteBundle({
  "/": Home,
  [RoutePaths.Home]: Home,
  [RoutePaths.Help]: Help,
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
