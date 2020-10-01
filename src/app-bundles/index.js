import {
  composeBundles,
  createCacheBundle,
  createUrlBundle,
} from "redux-bundler";

import {
  createOlBasemapBundle,
  createOlMapBundle,
  createNestedUrlBundle,
} from "@corpsmap/corpsmap-bundles";
import createAuthBundle from "@corpsmap/create-auth-bundle";
import createJwtApiBundle from "@corpsmap/create-jwt-api-bundle";
import pkg from "../../package.json";

import routeBundle from "./routes-bundle";
import mapsBundle from "./maps-bundle";
import mapsPageBundle from "./map-page-bundle";
import districtsAndBasinsBundle from "./districts-and-basins-bundle";
import corporateOfficeBundle from "./corporate-office-bundle";
import corporateOfficeReportBundle from "./corporate-office-report-bundle";
import corporateOfficeSpecialReportBundle from "./corporate-office-special-report-bundle";
import corporateOfficeLocationReportBundle from "./corporate-office-location-report-bundle";
import projectReportBundle from "./project-reports-bundle";
import watershedReportBundle from "./watershed-reports-bundle";
import districtReportBundle from "./district-reports-bundle";
import cache from "./../cache.js";


export default composeBundles(
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
  createCacheBundle({
    cacheFn: cache.set,
  }),
  createUrlBundle(),
  createNestedUrlBundle({
    pkg: pkg,
  }),
  createOlBasemapBundle(),
  createOlMapBundle({
    name: "map",
    center: [-80.79, 26.94],
    zoom: 5,
  }),
  mapsBundle,
  routeBundle,
  mapsPageBundle,
  districtsAndBasinsBundle,
  corporateOfficeBundle,
  corporateOfficeReportBundle,
  corporateOfficeSpecialReportBundle,
  corporateOfficeLocationReportBundle,
  projectReportBundle,
  watershedReportBundle,
  districtReportBundle
);
