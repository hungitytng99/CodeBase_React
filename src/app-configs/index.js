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
export const SIDER_COLLAPSE = 'siderCollapse';

export const ACTION_TYPE = {
    CREATE: 'CREATE',
    LIST: 'LIST',
    VIEW: 'VIEW',
    DELETE: 'DELETE',
    UPDATE: 'UPDATE',
    UNMOUNT: 'UNMOUNT',
};

export const VALID_IMAGE_TYPES = ['image/gif', 'image/jpeg', 'image/png'];

// 1. UI flow: add router
export const USER_ROLES = {
    UPLOAD: 1,
    SIGN: 2,
    UPLOAD_TO_BLOCKCHAIN: 3,
};

export const ACCOUNT_PERMISSION = {
    UPLOAD: {
        value: 'uploader',
        text: 'Tải tài liệu',
        color: 'geekblue',
    },
    SIGN: {
        value: 'signer',
        text: 'Ký',
        color: 'green',
    },
    UPLOAD_TO_BLOCKCHAIN: {
        value: 'publisher',
        text: 'Tải lên blockchain',
        color: 'cyan',
    },
};

export const EXPIRED_TIME_CONTRACT = 1683962780;

export const ADDRESS_OWNER_MANAGEMENT = '0xc7e0ae64b03d6bef827209dcd700a5039c071e6d';
