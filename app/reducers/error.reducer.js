import { 
    ERROR_OCCURRED,
    ERROR_NOTIFIED
} from '_actions/error.action';

const initialState = {
    isError: false,
    title: null,
    error: null,
}

const errorReducer = (state = initialState, action) => {
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
        default:
            return state;
    }
}

export default errorReducer;