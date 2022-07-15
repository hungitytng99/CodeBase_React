export function NOTIFY_SUCCESS(payload) {
    return {
        type: 'NOTIFY_SUCCESS',
        payload,
    };
}

export function NOTIFY_ERROR(payload) {
    return {
        type: 'NOTIFY_ERROR',
        payload,
    };
}

export function NOTIFY_LOADING(payload) {
    return {
        type: 'NOTIFY_LOADING',
        payload,
    };
}

export function RESET_NOTIFY_STATE(payload) {
    return {
        type: 'RESET_NOTIFY_STATE',
        payload,
    };
}
