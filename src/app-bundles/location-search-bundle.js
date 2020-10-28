import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

const LocationSearchActions = {
  SET_LOCATION_SEARCH_TEXT: `SET_LOCATION_SEARCH_TEXT`,
  SET_LOCATION_SEARCH_TYPE: `SET_LOCATION_SEARCH_TYPE`,
  SET_LOCATION_SEARCH_LIMIT: `SET_LOCATION_SEARCH_LIMIT`,
  LOCATION_SEARCH_CRITERIA_UPDATED: `LOCATION_SEARCH_CRITERIA_UPDATED`,
};

export default createRestBundle( {
  name: "locationSearch",
  uid: "location_id",
  staleAfter: 0,
  persist: false,
  getTemplate: getRestUrl(
    "/water/locations/search?q=:search_text&type=:search_type&limit=:search_limit",
    "/location-search.json?q=:search_text&type=:search_type&limit=:search_limit"
  ),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: [ LocationSearchActions.LOCATION_SEARCH_CRITERIA_UPDATED ],
  forceFetchActions: [],
  urlParamSelectors: [ "selectLocationSearchGetTemplateParams" ],
  defaultState: {
    _search_text: null,
    _search_type: "ALL",
    _search_limit: 10
  },
  reduceFurther: ( state, { type, payload } ) => {
    switch( type ) {
      case LocationSearchActions.SET_LOCATION_SEARCH_TEXT:
      case LocationSearchActions.SET_LOCATION_SEARCH_TYPE:
      case LocationSearchActions.SET_LOCATION_SEARCH_LIMIT:
        return Object.assign( {}, state, payload );
      default:
        return state;
    }
  },
  addons: {
    doSetLocationSearchCriteriaUpdated: () => ( { dispatch } ) => {
      dispatch( {
        type: LocationSearchActions.LOCATION_SEARCH_CRITERIA_UPDATED,
        payload: {}
      } );
    },
    doSetLocationSearchText: ( searchText ) => ( { dispatch, store } ) => {
      dispatch( {
        type: LocationSearchActions.SET_LOCATION_SEARCH_TEXT,
        payload: {
          _search_text: searchText,
        },
      } );
      store.doSetLocationSearchCriteriaUpdated();
    },
    doSetLocationSearchType: ( searchType ) => ( { dispatch, store } ) => {
      dispatch( {
        type: LocationSearchActions.SET_LOCATION_SEARCH_TYPE,
        payload: {
          _search_type: searchType,
        },
      } );
      store.doSetLocationSearchCriteriaUpdated();
    },
    doSetLocationSearchLimit: ( searchLimit ) => ( { dispatch, store } ) => {
      dispatch( {
        type: LocationSearchActions.SET_LOCATION_SEARCH_LIMIT,
        payload: {
          _search_limit: searchLimit,
        },
      } );
      store.doSetLocationSearchCriteriaUpdated();
    },
    selectLocationSearchText: ( state ) => {
      return state.locationSearch._search_text;
    },
    selectLocationSearchType: ( state ) => {
      return state.locationSearch._search_type;
    },
    selectLocationSearchLimit: ( state ) => {
      return state.locationSearch._search_limit;
    },
    selectLocationSearchGetTemplateParams: createSelector(
      "selectLocationSearchText",
      "selectLocationSearchType",
      "selectLocationSearchLimit",
      ( searchText, searchType, searchLimit ) => {
        if( !( typeof searchText === "string" ) || searchText.length === 0 ) return {};
        return {
          search_text: searchText,
          search_type: searchType,
          search_limit: searchLimit
        };
      }
    ),

  }
} )
