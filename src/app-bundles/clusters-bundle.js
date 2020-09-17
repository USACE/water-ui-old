import createRestBundle from "./create-rest-bundle";
import { isMockMode } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle({
  name: "clusters",
  uid: "cluster_name",
  prefetch: true,
  staleAfter: 10000,
  persist: false,
  //routeParam: "clustersSlug",
  getTemplate: isMockMode() ? "/location-clusters.json" : "/api/location-clusters",
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: [],
  forceFetchActions: [],
  reduceFurther: (state, { type, payload }) => {
    if (type === "SET_SELECTED_CLUSTER_ID") {
      return Object.assign({}, state, payload);
    }
    else return state;
  },
  addons: {
    selectCluster: createSelector(
      "selectClustersItems",
      (clusters) => {
        console.log( "in cluster:", clusters );
        const matchedClusterIds = {};
        const result = clusters.filter(entry => {
            if (matchedClusterIds[entry.cluster_name]) return false;
            matchedClusterIds[entry.cluster_name] = true;
            return true;
          });
        return result;
      }
    ),
    doSetSelectedCluster: (id) => ({ dispatch }) => {
      dispatch({
        type: "SET_SELECTED_CLUSTER_ID",
        payload: {
          _clusterName: id,
        },
      });
    },
    selectSelectedCluster: (state) => {
      return state.districtsAndBasins._clusterName;
    },
  },
});
