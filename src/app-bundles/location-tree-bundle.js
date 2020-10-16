import { createSelector } from "redux-bundler";

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
          return Object.assign( {}, state, { data: null } )
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
    ( locationTree, locationSummaries ) => {
      if( locationTree === null && locationSummaries ) return { actionCreator: "doCreateLocationTree", args: [ locationSummaries ] }
    }
  ),

};

// Not sure if this is a good way to keep things clean when a bundle needs to run more complex logic? I'm just leery of
// stuffing it in doCreateLocationTree() or the reducer switch/case.
function listToTree( sourceList ) {
  let locationIdToListIndex = {}, currentNode, tree = [], i;

  // Clone the list so we don't modify the original?
  // If modifying the original array is OK we can take this out.
  let list = sourceList.map( item => ( { ...item } ) );

  for( i = 0; i < list.length; i += 1 ) {
    locationIdToListIndex[ list[ i ].location_id ] = i; // add to lookup map
    list[ i ].nodes = []; // initialize the child node array
    list[ i ].key = list[ i ].location_id; // add key prop
    list[ i ].label = list[ i ].public_name; // add label prop
  }

  let buildTreePath = ( node, path, recurseDepth ) => {
    if( !recurseDepth ) recurseDepth = 1;
    recurseDepth++;
    if( recurseDepth > 10 ) {
      console.warn( "Recursion limit when building tree path for node:", path, node );
      return "";
    }

    if( !path ) path = node.location_id;
    else path = `${ node.location_id }/${ path }`;
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
      if( currentNode.location_id === "40" ) currentNode.parent_id = "7"

      list[ locationIdToListIndex[ currentNode.parent_id ] ].nodes.push( currentNode );

      // Add a tree path prop to the original list for easy lookup for locations to tree position
      sourceList[ i ].tree_path = buildTreePath( currentNode );
    }
    else {
      tree.push( currentNode );
    }
  }

  return tree;
}