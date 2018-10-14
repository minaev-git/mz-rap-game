export const SET_IS_RECORDING = "record/SET_IS_RECORDING";
export const SET_IS_PLAYING_RECORD = "record/SET_IS_PLAYING_RECORD";
export const SET_START_TIMESTAMP = "record/SET_START_TIMESTAMP";
export const ADD_LOOPS = "record/ADD_LOOPS";
export const ADD_NEWS = "record/ADD_NEWS";

const initialState = {
    startTimestamp: null,
    isRecording: false,
    isPlayingRecord: false,
    loops: [],
    news: [],
};

export function setIsRecording(value) {
    return {
        type: SET_IS_RECORDING,
        payload: value,
    }
}

export function setIsPlayingRecord(value) {
    return {
        type: SET_IS_PLAYING_RECORD,
        payload: value,
    }
}

export function addLoops(loops) {
    return {
        type: ADD_LOOPS,
        payload: loops,
    }
}

export function addNews({ id, timestamp }) {
    return {
        type: ADD_NEWS,
        payload: { id, timestamp },
    }
}

export function recordReducer(state = initialState, action) {
    switch (action.type) {
        case SET_IS_RECORDING: {
            if (action.payload) {
                return {
                    ...initialState,
                    isRecording: true,
                };
            } else {
                return {
                    ...state,
                    isRecording: false,
                };
            }
        }
        case SET_IS_PLAYING_RECORD: {
            return {
                ...state,
                isPlayingRecord: action.payload,
            };
        }
        case SET_START_TIMESTAMP: {
            return {
                ...state,
                startTimestamp: action.payload,
            }
        }
        case ADD_LOOPS: {
            const newState = {
                ...state,
                loops: [...state.loops, action.payload],
            };
            if (state.startTimestamp === null) {
                newState.startTimestamp = Date.now();
            }
            return newState;
        }
        case ADD_NEWS: {
            return {
                ...state,
                news: [...state.news, action.payload],
            };
        }
        default:
            return state;
    }
}

export function selectState(rootState) {
    return rootState.record;
}

export function selectIsRecording(state) {
    return selectState(state).isRecording;
}

export function selectIsPlayingRecord(state) {
    return selectState(state).isPlayingRecord;
}

export function selectStartTimestamp(state) {
    return selectState(state).startTimestamp;
}

export function selectRecordLoops(state) {
    return selectState(state).loops;
}

export function selectRecordNews(state) {
    return selectState(state).news;
}
