import {
  composeBundles,
  createCacheBundle,
  createUrlBundle,
} from "redux-bundler";
import createAuthBundle from "@corpsmap/create-auth-bundle";
import createJwtApiBundle from "@corpsmap/create-jwt-api-bundle";
import routeBundle from "./routes-bundle";
import mapsBundle from './maps-bundle';
import districtsAndBasinsBundle from "./districts-and-basins-bundle";
import locationSummariesBundle from "./location-summaries-bundle";
import locationDetailBundle from "./location-detail-bundle";
import locationLevelBundle from "./location-level-bundle";
import locationChildrenBundle from "./location-children-bundle";
import locationTreeBundle from "./location-tree-bundle";
import locationSearchBundle from "./location-search-bundle";
import locationsMapBundle from "./locations-map-bundle";
import streamLocationsBundle from "./stream-location-bundle";
import radarTimeSeriesBundle from "./radar-time-series-bundle";
import radarTimeSeriesParamsBundle from "./radar-time-series-params-bundle";
import corporateOfficeBundle from "./corporate-office-bundle";
import corporateOfficeReportBundle from "./corporate-office-report-bundle";
import corporateOfficeSpecialReportBundle from "./corporate-office-special-report-bundle";
import corporateOfficeLocationReportBundle from "./corporate-office-location-report-bundle";
import projectReportBundle from "./project-reports-bundle";
import watershedReportBundle from "./watershed-reports-bundle";
import districtReportBundle from "./district-reports-bundle";
import cache from "./../cache.js";

export default composeBundles(
  createCacheBundle({
    cacheFn: cache.set,
  }),
  createUrlBundle(),
  createAuthBundle({
    appId: "ff3437e4-f2fc-432f-8175-7dd70f9bda44",
    redirectOnLogout: "/",
  }),
  createJwtApiBundle({
    // `root` will force the use of the URL root across all bundles. Our bundles use the getRestUrl() utility method
    // to build the REST URLs on a per-bundle basis. This way individual bundles can use either mock or live URLs.
    root: "",
    unless: {
      method: "GET",
    },
  }),
  routeBundle,
  mapsBundle,
  districtsAndBasinsBundle,
  locationSummariesBundle,
  locationDetailBundle,
  locationLevelBundle,
  locationChildrenBundle,
  locationTreeBundle,
  locationSearchBundle,
  locationsMapBundle,
  streamLocationsBundle,
  radarTimeSeriesBundle,
  radarTimeSeriesParamsBundle,
  corporateOfficeBundle,
  corporateOfficeReportBundle,
  corporateOfficeSpecialReportBundle,
  corporateOfficeLocationReportBundle,
  projectReportBundle,
  watershedReportBundle,
  districtReportBundle,
);
