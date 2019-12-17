import shopActionTypes from "./shopActionTypes";

const INITIAL_STATE = {
    collections: null,
    collectionsIsFetching: false,
    errorMessage: ""
}


const shopReducer = (state = INITIAL_STATE, action ) => {
    switch (action.type) {
      case shopActionTypes.FETCHING_COLLECTIONS_START:
          return {
              ...state,
              collectionsIsFetching: true
          }
      case shopActionTypes.FETCHING_COLLECTIONS_SUCCESS:
          return {
              ...state,
              collections: action.payload,
              collectionsIsFetching: false
          }
      case shopActionTypes.FETCHING_COLLECTIONS_FAILURE:
          return {
              ...state,
              errorMessage: action.payload
          }
        default:
            return state;
    }
}

export default shopReducer;