import { combineReducers } from "redux";
import { categoriesReducer } from "./categories";
import { loopsReducer } from "./loops";
import { recordReducer } from "./record";
import { newsReducer } from "./news";
import { playbackReducer } from "./playback";

export const reducers = combineReducers({
    categories: categoriesReducer,
    loops: loopsReducer,
    news: newsReducer,
    record: recordReducer,
    playback: playbackReducer,
});
