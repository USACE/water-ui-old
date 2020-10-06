import { createSelector } from "redux-bundler";

const AppDataActions = {
  APP_INITIALIZED: `APP_INITIALIZED`,
};

export default {
  name: 'appData',

  getReducer: () => {
    const initialData = {
      initialized: false,
    };

    return ( state = initialData, { type, payload } ) => {
      switch( type ) {
        case AppDataActions.APP_INITIALIZED:
          return Object.assign( {}, state, payload );
        default:
          return state;
      }
    };
  },

  selectAppInitialized: state => {
    return state.appData.initialized;
  },

  doSetAppInitialized: () => ( { dispatch, store } ) => {
    dispatch( { type: AppDataActions.APP_INITIALIZED, payload: { initialized: true } } )
  },

  reactAppInitialized: createSelector(
    'selectAppInitialized',
    ( appInitialized ) => {
      if( !appInitialized ) return { actionCreator: 'doSetAppInitialized' };
    }
  ),
}
