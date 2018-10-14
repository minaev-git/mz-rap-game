export const SET_NEWS = "news/SET_NEWS";

const initialState = [];

export function setNews(news) {
    return {
        type: SET_NEWS,
        payload: news,
    };
}

export function newsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_NEWS:
            return [
                ...action.payload,
            ];
        default:
            return state;
    }
}

export function selectState(rootState) {
    return rootState.news;
}
