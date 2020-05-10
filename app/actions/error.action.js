import { ToastService as toast } from '_services/common.service';

/**
 * action types
 */
export const ERROR_OCCURRED = 'ERROR_OCCURRED';
export const ERROR_NOTIFIED = 'ERROR_NOTIFIED';

export const notifyError = (error) => (dispatch) => {
    //display error message    
    toast.error(error.error);
    setTimeout(() => {        
        dispatch({
            type: ERROR_NOTIFIED
        })
    }, 1000);
}