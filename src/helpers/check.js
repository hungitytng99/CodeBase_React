export const isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

export const isEmptyValue = (value) => {
    if (
        value == '' ||
        value == null ||
        value == undefined ||
        JSON.stringify(value) == '{}' ||
        JSON.stringify(value) == '[]'
    ) {
        return true;
    }
    return false;
};

export const isExist = (value) => {
    return !isEmptyValue(value);
};
