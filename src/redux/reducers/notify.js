import { REQUEST_STATE } from '~/app-configs';
import { RESET_NOTIFY_STATE } from '~/redux/actions/notify';
import { NOTIFY_LOADING } from '~/redux/actions/notify';
import { NOTIFY_ERROR } from '~/redux/actions/notify';
import { NOTIFY_SUCCESS } from '~/redux/actions/notify';

const defaultState = {
    requestState: null,
    message: null,
};

export default function notifyReducer(state = defaultState, action) {
    switch (action.type) {
        case NOTIFY_LOADING().type: {
            return {
                ...state,
                requestState: REQUEST_STATE.REQUEST,
            };
        }
        case NOTIFY_SUCCESS().type: {
            return {
                ...state,
                requestState: REQUEST_STATE.SUCCESS,
                message: action.payload.description,
            };
        }
        case NOTIFY_ERROR().type: {
            return {
                ...state,
                requestState: REQUEST_STATE.ERROR,
                message: action.payload.description,
            };
        }
        case RESET_NOTIFY_STATE().type: {
            return {
                ...state,
                requestState: null,
            };
        }
        default:
            return state;
    }
}
