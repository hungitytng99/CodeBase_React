import { REQUEST_STATE } from '~/app-configs';
import { UPDATE_DOCUMENT_STORE_ADDRESS_SUCCESS } from '~/redux/actions/user';
import { RESET_UPDATE_DOCUMENT_STORE_ADDRESS } from '~/redux/actions/user';
import { CHECK_VALID_TOKEN_SUCCESS } from '~/redux/actions/user';
import { RESET_CHECK_VALID_TOKEN } from '~/redux/actions/user';
import { CHECK_VALID_TOKEN } from '~/redux/actions/user';
import { CHECK_VALID_TOKEN_FAIL } from '~/redux/actions/user';
import { UPDATE_DOCUMENT_STORE_ADDRESS_FAIL } from '~/redux/actions/user';
import { UPDATE_DOCUMENT_STORE_ADDRESS } from '~/redux/actions/user';
import { LOGIN_FAIL } from '~/redux/actions/user';
import { LOGIN } from '~/redux/actions/user';
import { LOGIN_SUCCESS } from '~/redux/actions/user';

const defaultState = {
    profile: null,
    authState: null,
    verifyAuthState: null, // for get profile
    deployMetamaskState: null,
    errorMessageKey: '',
};

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case LOGIN().type: {
            if (action.payload.remember && action.payload.email) {
                localStorage.setItem('rememberUser', JSON.stringify(action.payload));
            } else if (localStorage.getItem('rememberUser') !== null) {
                localStorage.removeItem('rememberUser');
            }
            return {
                ...state,
                authState: REQUEST_STATE.REQUEST,
            };
        }
        case LOGIN_SUCCESS().type: {
            return {
                ...state,
                authState: REQUEST_STATE.SUCCESS,
                profile: action.payload,
            };
        }
        case LOGIN_FAIL().type: {
            return {
                ...state,
                authState: REQUEST_STATE.ERROR,
                errorMessageKey: action.payload,
            };
        }
        case UPDATE_DOCUMENT_STORE_ADDRESS().type: {
            return {
                ...state,
                deployMetamaskState: REQUEST_STATE.REQUEST,
            };
        }
        case UPDATE_DOCUMENT_STORE_ADDRESS_SUCCESS().type: {
            const { data } = action.payload;
            return {
                ...state,
                profile: {
                    ...state.profile,
                    documentStoreAddress: data,
                },
                deployMetamaskState: REQUEST_STATE.SUCCESS,
            };
        }
        case UPDATE_DOCUMENT_STORE_ADDRESS_FAIL().type: {
            return {
                ...state,
                deployMetamaskState: REQUEST_STATE.ERROR,
            };
        }
        case CHECK_VALID_TOKEN().type: {
            return {
                ...state,
                verifyAuthState: REQUEST_STATE.REQUEST,
            };
        }
        case CHECK_VALID_TOKEN_SUCCESS().type: {
            const { data } = action.payload;
            return {
                ...state,
                profile: data,
                verifyAuthState: REQUEST_STATE.SUCCESS,
            };
        }
        case CHECK_VALID_TOKEN_FAIL().type: {
            return {
                ...state,
                profile: null,
                verifyAuthState: REQUEST_STATE.ERROR,
            };
        }
        case RESET_CHECK_VALID_TOKEN().type: {
            return {
                ...defaultState,
            };
        }
        case RESET_UPDATE_DOCUMENT_STORE_ADDRESS().type: {
            return {
                ...defaultState,
            };
        }
        default:
            return state;
    }
}
