export const Configs = {
    BASE_API: process.env.REACT_APP_BASE_API_URL,
    DOMAIN: '',

    CURRENT_PAGE: 1,
    FILE_MAXIMUM: 5, //MB
    PAGE_SIZE_20: 20,
    PAGE_SIZE_4: 4,
};

export const REQUEST_STATE = {
    ERROR: 'ERROR',
    REQUEST: 'REQUEST',
    SUCCESS: 'SUCCESS',
};

// key store in localStorage, Cookies, Session
export const I18LANGUAGE_KEY = 'i18nextLng';
export const TOKEN_KEY = 'authencation_COBGBRPIIP';

export const ACTION_TYPE = {
    CREATE: 'CREATE',
    LIST: 'LIST',
    VIEW: 'VIEW',
    DELETE: 'DELETE',
    UPDATE: 'UPDATE',
    UNMOUNT: 'UNMOUNT',
};
