import { call, all, takeLatest, put } from "redux-saga/effects";
import { clearCart } from "./cartAction";
import userActionTypes from "../user/userActionTypes";


export function* clearCartWhenSignout() {
    yield put(clearCart());
}


export function* signoutSuccess() {
    yield takeLatest(userActionTypes.SIGNOUT_SUCCESS, clearCartWhenSignout)
}

export function* cartSaga() {
    yield all([call(signoutSuccess)])
}