import { takeLatest, put, call, all } from "redux-saga/effects";
import userActionTypes from "./userActionTypes";
import {
  signinSuccess,
  signinFailure,
  signoutSuccess,
  signoutFailure,
  signupFailure,
  signupSuccess
} from "./userAction";
import {
  auth,
  createUserProfileDocument,
  googleProvider,
  getCurrentUser
} from "../../firebase/firebaseUtils";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapshot = yield userRef.get();
    yield put(signinSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signinFailure(error.message));
  }
}

export function* signinWithGoogle() {
  try {
    const googleSigninRef = yield auth.signInWithPopup(googleProvider);
    const { user } = googleSigninRef;
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signinFailure(error.message));
  }
}

export function* signinWithEmail({ payload: { email, password } }) {
  try {
    const emailSigninRef = yield auth.signInWithEmailAndPassword(
      email,
      password
    );
    const { user } = emailSigninRef;
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signinFailure(error.message));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signinFailure(error.message));
  }
}

export function* signout() {
  try {
    yield auth.signOut();
    yield put(signoutSuccess());
  } catch (error) {
    yield put(signoutFailure(error.message));
  }
}

export function* signup({payload: {email, password, displayName}}) {
  try {
    const {user} = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signupSuccess({user, additionalData: {displayName}}));
  } catch (error) {
    yield put(signupFailure(error.message));
  }
}

export function* signinAfterSignup({payload: {user, additionalData}}) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* googleSigninStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGNIN_START, signinWithGoogle);
}

export function* emailSigninStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGNIN_START, signinWithEmail);
}

export function* checkUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signoutStart() {
  yield takeLatest(userActionTypes.SIGNOUT_START, signout);
}

export function* signupStart() {
  yield takeLatest(userActionTypes.SIGNUP_START, signup);
}

export function* onSignupSuccess() {
  yield takeLatest(userActionTypes.SIGNUP_SUCCESS, signinAfterSignup);
}

export function* userSaga() {
  yield all([
    call(googleSigninStart),
    call(emailSigninStart),
    call(checkUserSession),
    call(signoutStart),
    call(signupStart),
    call(onSignupSuccess)
  ]);
}
