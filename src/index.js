import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducers } from "./ducks";
import { setLoops } from "./ducks/loops";
import { setCategories } from "./ducks/categories";
import { setNews } from "./ducks/news";
import { App } from "./App";
import { categories, loops, news } from "./data";
import { generatePlayList, getRecordFromUrl, validateLoopId } from "./components/Player/utils";
import { addLoops, addNews } from "./ducks/record";
import * as styles from "./index.css";

const store = createStore(reducers);

// valid ids are required to be able to create a share link
loops.forEach(({ id }) => validateLoopId(id));

// set initial store
store.dispatch(setCategories(categories));
store.dispatch(setLoops(loops));
store.dispatch(setNews(news));

// check if there's a record in the url query parameter
const recordHash = getRecordFromUrl();
if (recordHash) {
    const playlist = generatePlayList(recordHash);
    if (playlist) {
        playlist.loops.forEach(recordedLoops => {
            store.dispatch(addLoops(recordedLoops));
        });
        playlist.news.forEach(recorderNews => {
            store.dispatch(addNews(recorderNews));
        });
    }
}

const rootNode = document.createElement("div");
rootNode.className = styles.rootContainer;
document.body.appendChild(rootNode);

const renderApp = Component => {
    render(
        <Provider store={store}>
            <Component />
        </Provider>,
        rootNode,
    );
};

renderApp(App);

if (module.hot) {
    module.hot.accept("./App", () => {
        renderApp(App);
    });
}
