import { authService as auth } from '_services/auth.service';
import { ERROR_OCCURRED } from '_actions/error.action';

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
    let deviceId = user.deviceId;
    auth.login(username, password, deviceId)
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
                    title: 'Sign-in failed',
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
                    title: 'Sign-out failed',
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
                    title: 'Get token failed',
                    error: error
                }
            })
        })
}