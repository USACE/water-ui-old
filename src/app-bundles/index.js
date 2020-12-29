import {
  composeBundles,
  createCacheBundle,
  createUrlBundle,
} from "redux-bundler";
import createAuthBundle from "@corpsmap/create-auth-bundle";
import createJwtApiBundle from "@corpsmap/create-jwt-api-bundle";
import routesBundle from "./routes-bundle";
import mapsBundle from './maps-bundle';
import districtsAndBasinsBundle from "./location-bundles/districts-and-basins-bundle";
import locationSearchBundle from "./location-bundles/location-search-bundle";
import locationSummariesBundle from "./location-bundles/location-summaries-bundle";
import locationTreeBundle from "./location-bundles/location-tree-bundle";
import locationsMapBundle from "./location-bundles/locations-map-bundle";
import mapDetailsBundle from "./location-bundles/map-details-bundle";
import radarTimeSeriesBundle from "./location-bundles/radar-time-series-bundle";
import radarTimeSeriesParamsBundle from "./location-bundles/radar-time-series-params-bundle";
import cwmsDetailBundle from "./location-bundles/cwms/cwms-detail-bundle";
import cwmsStreamsBundle from "./location-bundles/cwms/cwms-streams-bundle";
import cwmsLevelBundle from "./location-bundles/cwms/cwms-level-bundle";
import cwmsChildrenBundle from "./location-bundles/cwms/cwms-children-bundle";
import corporateOfficeBundle from "./report-bundles/corporate-office-bundle";
import corporateOfficeReportBundle from "./report-bundles/corporate-office-report-bundle";
import corporateOfficeSpecialReportBundle from "./report-bundles/corporate-office-special-report-bundle";
import corporateOfficeLocationReportBundle from "./report-bundles/corporate-office-location-report-bundle";
import projectReportBundle from "./report-bundles/project-reports-bundle";
import watershedReportBundle from "./report-bundles/watershed-reports-bundle";
import districtReportBundle from "./report-bundles/district-reports-bundle";
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
  routesBundle,
  mapsBundle,
  districtsAndBasinsBundle,
  locationSearchBundle,
  locationSummariesBundle,
  locationsMapBundle,
  locationTreeBundle,
  mapDetailsBundle,
  radarTimeSeriesBundle,
  radarTimeSeriesParamsBundle,
  cwmsDetailBundle,
  cwmsStreamsBundle,
  cwmsLevelBundle,
  cwmsChildrenBundle,
  corporateOfficeBundle,
  corporateOfficeReportBundle,
  corporateOfficeSpecialReportBundle,
  corporateOfficeLocationReportBundle,
  projectReportBundle,
  watershedReportBundle,
  districtReportBundle,
);
