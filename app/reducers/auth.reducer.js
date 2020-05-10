import {
    SIGN_IN,
    SIGN_OUT,
    GET_TOKEN
} from '_actions/auth.action';

const initialState = {
    isSignedIn: false,
    token: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                isSignedIn: true,
                token: action.token
            }
        case SIGN_OUT:
            return {
                ...state,
                isSignedIn: false,
                token: null,
            }
        case GET_TOKEN:
            return {
                ...state,
                token: action.token
            }
        default:
            return state;
    }
}

export default authReducer;