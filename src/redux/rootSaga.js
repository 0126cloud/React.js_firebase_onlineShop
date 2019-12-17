import { all, call } from "redux-saga/effects";
import { shopSaga } from "./shop/shopSaga";
import { userSaga } from "./user/userSaga";
import { cartSaga } from "./cart/cartSaga";

export default function* rootSaga() {
    yield all([call(shopSaga), call(userSaga), call(cartSaga)]);
}