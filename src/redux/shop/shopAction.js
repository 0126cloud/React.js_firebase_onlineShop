import shopActionTypes from "./shopActionTypes";


export const fetchingCollectionsStart = () => ({
    type: shopActionTypes.FETCHING_COLLECTIONS_START
})

export const fetchingCollectionsSuccess = collectionsObject => ({
    type: shopActionTypes.FETCHING_COLLECTIONS_SUCCESS,
    payload: collectionsObject
})

export const fetchingCollectionsFailure = errorMessage => ({
    type: shopActionTypes.FETCHING_COLLECTIONS_FAILURE,
    payload: errorMessage
})

