export const SET_CURSOR = "playback/SET_CURSOR";

const initialState = {
    timestamp: null,
    cursor: null,
};

export function setCursor(value) {
    return {
        type: SET_CURSOR,
        payload: value,
    };
}

export function playbackReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURSOR:
            return {
                ...state,
                timestamp: action.payload !== null ? Date.now() : null,
                cursor: action.payload,
            };
        default:
            return state;
    }
}

export function selectState(rootState) {
    return rootState.playback;
}
