import { combineReducers } from 'redux';

const defaultState = {
    state: null,
    data: null,
};

export default combineReducers({
    list: (state = defaultState, action) => {
        switch (action.type) {
            default:
                return state;
        }
    },
});
