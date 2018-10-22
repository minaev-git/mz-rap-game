import { combineReducers } from "redux";
import { categoriesReducer } from "./categories";
import { loopsReducer } from "./loops";
import { recordReducer } from "./record";
import { newsReducer } from "./news";
import { playbackReducer } from "./playback";

const reducers = {
    categories: categoriesReducer,
    loops: loopsReducer,
    news: newsReducer,
    record: recordReducer,
    playback: playbackReducer,
};

type Reducers = typeof reducers;
// $FlowFixMe any and 'unclear-type' (will not actually fix it though)
type ExtractReturnType = <V>(v: (...args: any) => V) => V;
export type RootState = $ObjMap<Reducers, ExtractReturnType>;

export const combinedReducers = combineReducers(reducers);
