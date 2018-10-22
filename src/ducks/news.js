import type { News } from "../types";
import type { RootState } from "./index";

export const SET_NEWS = "news/SET_NEWS";

export type NewsState = News[];

const initialState: NewsState = [];

type SetNewsAction = {|
    +type: typeof SET_NEWS,
    +payload: News[],
|}
export function setNews(news: News[]): SetNewsAction {
    return {
        type: SET_NEWS,
        payload: news,
    };
}

type NewsAction = SetNewsAction;

export function newsReducer(state: NewsState = initialState, action: NewsAction): NewsState {
    switch (action.type) {
        case SET_NEWS:
            return [
                ...action.payload,
            ];
        default:
            return state;
    }
}

export function selectState(rootState: RootState): NewsState {
    return rootState.news;
}
