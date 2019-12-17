import userActionTypes from "./userActionTypes";


export const googleSigninStart = () => ({
    type: userActionTypes.GOOGLE_SIGNIN_START
})

export const signinSuccess = user => ({
    type: userActionTypes.SIGNIN_SUCCESS,
    payload: user
})

export const signinFailure = error => ({
    type: userActionTypes.SIGNIN_FAILURE,
    payload: error
})

export const emailSigninStart = emailAndPassword => ({
    type: userActionTypes.EMAIL_SIGNIN_START,
    payload: emailAndPassword
})

export const checkUserSession = () => ({
    type: userActionTypes.CHECK_USER_SESSION
})

export const signoutStart = () => ({
    type: userActionTypes.SIGNOUT_START
})

export const signoutSuccess = () => ({
    type: userActionTypes.SIGNOUT_SUCCESS
})

export const signoutFailure = error => ({
    type: userActionTypes.SIGNOUT_FAILURE,
    payload: error
})

export const signupStart = userData => ({
    type: userActionTypes.SIGNUP_START,
    payload: userData
})

export const signupSuccess = ({user, additionalData}) => ({
    type: userActionTypes.SIGNUP_SUCCESS,
    payload: {user, additionalData}
})

export const signupFailure = error => ({
    type: userActionTypes.SIGNUP_FAILURE,
    payload: error
})


