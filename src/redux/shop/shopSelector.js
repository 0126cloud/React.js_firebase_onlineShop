import { createSelector } from "reselect";




const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectCollectionsReturnArray = createSelector(
    [selectShopCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

export const selectEachCollection = urlParam => createSelector(
    [selectShopCollections],
    collections => collections ? collections[urlParam] : null
)

export const selectCollectionsIsFetching = createSelector(
    [selectShop],
    shop => shop.collectionsIsFetching
)

export const selectCollectionsIsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
)