import { createSelector } from "redux-bundler";
import { RoutePaths } from "./route-paths";

const LocationTreeActions = {
  LOCATION_TREE_CREATE_REQUESTED: `LOCATION_TREE_CREATE_REQUESTED`,
  LOCATION_TREE_CREATED: `LOCATION_TREE_CREATED`
};

export default {
  name: "locationTree",

  getReducer: () => {
    const initialData = {
      treeData: null
    };

    return ( state = initialData, { type, payload } ) => {
      switch( type ) {
        case "LOCATIONSUMMARIES_FETCH_STARTED":
          return Object.assign( {}, state, { treeData: null } )
        case LocationTreeActions.LOCATION_TREE_CREATED:
          return Object.assign( {}, state, payload );
        default:
          return state;
      }
    };
  },

  selectLocationTree: ( { locationTree } ) => {
    return locationTree.treeData;
  },

  doCreateLocationTree: ( locationSummaries ) => ( { dispatch } ) => {
    let treeData = listToTree( locationSummaries );
    dispatch( { type: LocationTreeActions.LOCATION_TREE_CREATED, payload: { treeData: treeData } } )
  },

  reactShouldCreateLocationTree: createSelector(
    "selectLocationTree",
    "selectLocationSummaries",
    "selectPathname",
    ( locationTree, locationSummaries, pathname ) => {
      if( locationTree === null && locationSummaries && locationSummaries.length > 0 && pathname.includes(RoutePaths.Map)) {
        return { actionCreator: "doCreateLocationTree", args: [ locationSummaries ] };
      }
    }
  ),

};

// Not sure if this is a good way to keep things clean when a bundle needs to run more complex logic? I'm just leery of
// stuffing all this logic directly inside doCreateLocationTree() or the reducer switch/case.
function listToTree( sourceList ) {
  let locationIdToListIndex = {}, currentNode, tree = [], i;

  // Clone the list so we don't modify the original?
  // If modifying the original array is OK we can take this out.
  let list = sourceList.map( item => ( { ...item } ) );

  for( i = 0; i < list.length; i += 1 ) {
    locationIdToListIndex[ list[ i ].id ] = i; // add to lookup map
    list[ i ].nodes = []; // initialize the child node array
    list[ i ].key = list[ i ].id; // add key prop
    list[ i ].label = list[ i ].public_name; // add label prop
  }

  let buildTreePath = ( node, path, recurseDepth ) => {
    if( !recurseDepth ) recurseDepth = 1;
    recurseDepth++;
    if( recurseDepth > 10 ) {
      console.warn( "Recursion limit when building tree path for node:", path, node );
      return "";
    }

    if( !path ) path = node.id;
    else path = `${ node.id }/${ path }`;
    if( node.parent_id === "-1" ) return path;
    else {
      return `${ buildTreePath( list[ locationIdToListIndex[ node.parent_id ] ], path, recurseDepth ) }`;
    }
  }

  for( i = 0; i < list.length; i += 1 ) {
    currentNode = list[ i ];
    if( currentNode.parent_id !== "-1" ) {

      // TODO: Temp fix for an issue where one location has a recursive parent/child relationship
      //   Will remove once I figure out how to deal with this problem.
      if( currentNode.id === "40" ) currentNode.parent_id = "7"

      list[ locationIdToListIndex[ currentNode.parent_id ] ].nodes.push( currentNode );

      // Add a tree path prop to the original list for easy lookup for locations to tree position
      const treePath = buildTreePath( currentNode );
      currentNode.path = treePath.split( "/" ); // Add path array to node to easily look up whether it is a child of a specific ID.
      sourceList[ i ].tree_path = treePath;
    }
    else {
      currentNode.path = [ `${ currentNode.id }` ];
      sourceList[ i ].tree_path = `${ currentNode.id }`;
      tree.push( currentNode );
    }
  }

  return tree;
}
