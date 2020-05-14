import { AuthService as auth } from '_services/auth.service';
import { ERROR_OCCURRED, SUCCESS_OCCURRED } from '_actions/notify.action';

/**
 * action types
 */
export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'
export const GET_TOKEN = 'GET_TOKEN'

/**
 * action creators
 */
export const signIn = (user) => (dispatch) => {
    //send login request to server
    let username = user.username;
    let password = user.password;
    auth.login(username, password)
        .then((token) => {
            dispatch({
                type: SIGN_IN,
                token
            })
        })
        .catch((error) => {
            dispatch({
                type: ERROR_OCCURRED,
                payload: {
                    title: 'Sign-in',
                    error: error
                }
            })
        });
}

export const signOut = () => (dispatch) => {
    //send logout request to server
    auth.logout()
        .then((response) => {
            dispatch({
                type: SIGN_OUT,
                response
            })
        })
        .catch((error) => {
            dispatch({
                type: ERROR_OCCURRED,
                payload: {
                    title: 'Sign-out',
                    error: error
                }
            })
        });
}

export const getToken = () => (dispatch) => {
    //get token from storage
    auth.getToken()
        .then((token) => {
            dispatch({
                type: GET_TOKEN,
                token
            })
        })
        .catch((error) => {
            dispatch({
                type: ERROR_OCCURRED,
                payload: {
                    title: 'Get token',
                    error: error
                }
            })
        })
}

export const signUp = (subscriber) => (dispatch) => {
    //send sign-up request to server
    auth.register(subscriber)
        .then((response) => {
            dispatch({
                type: SUCCESS_OCCURRED,
                payload: {
                    title: 'Sign-up',
                    message: response
                }
            })
        })
        .catch((error) => {
            dispatch({
                type: ERROR_OCCURRED,
                payload: {
                    title: 'Sign-up',
                    error: error
                }
            })
        });
}

export const resetPassword = (email) => (dispatch) => {
    //send sign-up request to server
    auth.resetPassword(email)
        .then((response) => {
            dispatch({
                type: SUCCESS_OCCURRED,
                payload: {
                    title: 'Password Reset',
                    message: response
                }
            })
        })
        .catch((error) => {
            dispatch({
                type: ERROR_OCCURRED,
                payload: {
                    title: 'Password Reset',
                    error: error
                }
            })
        });
}