// get the base url for which all the routes will be nested under
import pkg from "../../package.json";

const homepage = new URL( pkg.homepage );
const baseUrl = homepage.pathname;

export const RoutePaths = {
  Home: baseUrl,
  Help: `${ baseUrl }/help`,
  Map: `${ baseUrl }/map`,
  ReportsHome: `${ baseUrl }/reports`,
  DataResources: `${ baseUrl }/data-resources`,
  CorpOfficeList: `${ baseUrl }/reports/corporate`,
  CorpOfficeReports: `${ baseUrl }/reports/corporate/:corpOfficeId`,
  CorpOfficeSpecialReports: `${ baseUrl }/reports/corporate/:corpOfficeId/special`,
  CorpOfficeLocationReports: `${ baseUrl }/reports/corporate/:corpOfficeId/locations`,
  DistrictReports: `${ baseUrl }/reports/district`,
  WatershedReports: `${ baseUrl }/reports/watershed`,
  ProjectReports: `${ baseUrl }/reports/project`,
};
