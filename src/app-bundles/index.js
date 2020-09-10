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
import districtsAndBasinsBundle from "./districts-and-basins-bundle";
import districtsAndBasinsValuesBundle from "./districts-and-basins-values-bundle";
import cache from "./../cache.js";
import { isMockMode } from "./bundle-utils";

export default composeBundles(
  createAuthBundle({
    appId: "ff3437e4-f2fc-432f-8175-7dd70f9bda44",
    redirectOnLogout: "/",
  }),
  createJwtApiBundle({
    root:
      process.env.NODE_ENV === "development"
        ? isMockMode() ? `${ process.env.PUBLIC_URL }/mockdata` : `https://api.rsgis.dev/development`
        : isMockMode() ? `${ process.env.PUBLIC_URL }/mockdata` : `https://api.rsgis.dev/development`,
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
  districtsAndBasinsBundle,
  districtsAndBasinsValuesBundle
);
