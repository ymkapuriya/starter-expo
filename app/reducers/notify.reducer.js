import {
    ERROR_OCCURRED,
    ERROR_NOTIFIED,
    SUCCESS_OCCURRED,
    SUCCESS_NOTIFIED
} from '_actions/notify.action';

const initialState = {
    isError: false,
    isSuccess: false,
    title: null, //title for notification
    error: null, //error payload
    message: null, //success message
}

const notifyReducer = (state = initialState, action) => {
    switch (action.type) {
        case ERROR_OCCURRED:
            return {
                ...state,
                isError: true,
                title: action.payload.title,
                error: action.payload.error,
            }
        case ERROR_NOTIFIED:
            return {
                ...state,
                isError: false,
                title: null,
                error: null,
            }
        case SUCCESS_OCCURRED:
            return {
                ...state,
                isSuccess: true,
                title: action.payload.title,
                message: action.payload.message,
            }
        case SUCCESS_NOTIFIED:
            return {
                ...state,
                isSuccess: false,
                title: null,
                message: null
            }
        default:
            return state;
    }
}

export default notifyReducer;