import type { RootState } from "./index";

export const SET_IS_RECORDING = "record/SET_IS_RECORDING";
export const SET_IS_PLAYING_RECORD = "record/SET_IS_PLAYING_RECORD";
export const ADD_LOOPS = "record/ADD_LOOPS";
export const ADD_NEWS = "record/ADD_NEWS";

export type RecordLoops = string[];
export type RecordNews = {|
    +id: string,
    +timestamp: number,
|};

export type RecordState = {|
    +startTimestamp: number | null,
    +isRecording: boolean,
    +isPlayingRecord: boolean,
    +loops: RecordLoops[],
    +news: RecordNews[],
|};

const initialState: RecordState = {
    startTimestamp: null,
    isRecording: false,
    isPlayingRecord: false,
    loops: [],
    news: [],
};

type SetIsRecordingAction = {|
    +type: typeof SET_IS_RECORDING,
    +payload: boolean;
|}

export function setIsRecording(value: boolean): SetIsRecordingAction {
    return {
        type: SET_IS_RECORDING,
        payload: value,
    }
}

type SetIsPlayingAction = {|
    +type: typeof SET_IS_PLAYING_RECORD,
    +payload: boolean;
|}

export function setIsPlayingRecord(value: boolean): SetIsPlayingAction {
    return {
        type: SET_IS_PLAYING_RECORD,
        payload: value,
    }
}

type AddLoopsAction = {|
    +type: typeof ADD_LOOPS,
    +payload: RecordLoops;
|}

export function addLoops(loops: RecordLoops): AddLoopsAction {
    return {
        type: ADD_LOOPS,
        payload: loops,
    }
}

type AddNewsAction = {|
    +type: typeof ADD_NEWS,
    +payload: RecordNews;
|}

export function addNews({ id, timestamp }: RecordNews): AddNewsAction {
    return {
        type: ADD_NEWS,
        payload: { id, timestamp },
    }
}

type RecordAction = SetIsRecordingAction |
    SetIsPlayingAction |
    AddLoopsAction |
    AddNewsAction;

export function recordReducer(state: RecordState = initialState, action: RecordAction): RecordState {
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
        case ADD_LOOPS: {
            return {
                ...state,
                startTimestamp: state.startTimestamp === null ?
                    Date.now() :
                    state.startTimestamp,
                loops: [...state.loops, action.payload],
            };
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

export function selectState(rootState: RootState): RecordState {
    return rootState.record;
}

export function selectIsRecording(state: RootState): boolean {
    return selectState(state).isRecording;
}

export function selectIsPlayingRecord(state: RootState): boolean {
    return selectState(state).isPlayingRecord;
}

export function selectStartTimestamp(state: RootState): number | null {
    return selectState(state).startTimestamp;
}

export function selectRecordLoops(state: RootState): RecordLoops[] {
    return selectState(state).loops;
}

export function selectRecordNews(state: RootState): RecordNews[] {
    return selectState(state).news;
}
