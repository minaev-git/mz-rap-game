import type { RootState } from "./index";

export const SET_CURSOR = "playback/SET_CURSOR";

export type PlaybackState = {|
    +timestamp: number | null,
    +cursor: number | null,
|};

const initialState: PlaybackState = {
    timestamp: null,
    cursor: null,
};

type SetCursorAction = {|
    +type: typeof SET_CURSOR,
    +payload: number | null,
|}

export function setCursor(value: number | null): SetCursorAction {
    return {
        type: SET_CURSOR,
        payload: value,
    };
}

type PlaybackAction = SetCursorAction;

export function playbackReducer(state: PlaybackState = initialState, action: PlaybackAction) {
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

export function selectState(rootState: RootState): PlaybackState {
    return rootState.playback;
}
