import { all, call, takeLatest, put, select } from "redux-saga/effects";
import { getUserCartRef } from "../../firebase/firebaseUtils";
import userActionTypes from "../user/userActionTypes";
import { selectCurrentUser } from "../user/userSelector";
import { clearCart, setCartFromFirebase } from "./cartAction";
import { selectCartItems } from "./cartSelector";
import cartActionTypes from "./cartActionTypes";

export function* clearCartWhenSignout() {
  yield put(clearCart());
}

export function* updateCartInFirebase() {
  const currentUser = yield select(selectCurrentUser);

  if (currentUser) {
    try {
      const cartRef = yield getUserCartRef(currentUser.id);
      const cartItems = yield select(selectCartItems);
      yield cartRef.update({ cartItems });
    } catch (error) {
      console.log(error);
    }
  }
}

export function* checkCartFromFirebase({ payload: user }) {
  const cartRef = yield getUserCartRef(user.id);
  const cartSnapshot = yield cartRef.get();
  yield put(setCartFromFirebase(cartSnapshot.data().cartItems));
}

export function* signoutSuccess() {
  yield takeLatest(userActionTypes.SIGNOUT_SUCCESS, clearCartWhenSignout);
}

export function* onUserSignIn() {
  yield takeLatest(userActionTypes.SIGNIN_SUCCESS, checkCartFromFirebase);
}

export function* onCartChange() {
  yield takeLatest(
    [
      cartActionTypes.ADD_ITEM,
      cartActionTypes.REMOVE_ITEM,
      cartActionTypes.CLEAR_ITEM
    ],
    updateCartInFirebase
  );
}

export function* cartSaga() {
  yield all([call(signoutSuccess), call(onUserSignIn), call(onCartChange)]);
}
