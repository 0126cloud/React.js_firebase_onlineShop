import { takeLatest, call, put, all } from "redux-saga/effects";
import { firestore, convertCollectionsSnapshotToOneObject } from "../../firebase/firebaseUtils";
import { fetchingCollectionsSuccess, fetchingCollectionsFailure } from "./shopAction";
import shopActionTypes from "./shopActionTypes"; 


export function* fetchingCollectionsAsync() {
    try {
        const collectionsRef = firestore.collection("collections");
        const snapShot = yield collectionsRef.get();
        const collectionsObject = yield call(convertCollectionsSnapshotToOneObject, snapShot);
        yield put(fetchingCollectionsSuccess(collectionsObject));
    } catch (error) {
        yield put(fetchingCollectionsFailure(error.message));
    }
}

export function* fetchingCollectionsStart() {
    yield takeLatest(shopActionTypes.FETCHING_COLLECTIONS_START, fetchingCollectionsAsync)
}

export function* shopSaga() {
    yield all([call(fetchingCollectionsStart)])
}