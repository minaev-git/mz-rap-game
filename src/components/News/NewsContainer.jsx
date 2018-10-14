import * as React from "react";
import { connect } from "react-redux";
import { selectState as selectNews } from "../../ducks/news";
import { Reader } from "../../reader/Reader";
import { News } from "./News";
import {
    addNews as addNewsToRecord,
    selectIsPlayingRecord,
    selectIsRecording,
    selectRecordNews,
    selectStartTimestamp,
} from "../../ducks/record";

import * as styles from "./NewsContainer.css";

class NewsContainerComponent extends React.Component {
    constructor(props) {
        super(props);

        this.voices = [];
        this.readTimeoutsQueue = [];
        this.state = {
            currentNews: null,
        };

        this.onClickNews = this.onClickNews.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onEnd = this.onEnd.bind(this);

        this.newsReader = new Reader({
            onReady: (voices) => {
                this.voices = voices;
            },
            onProgress: this.onProgress,
            onEnd: this.onEnd,
        });
    }

    render() {
        const { news } = this.props;
        const { currentNews } = this.state;
        return (
            <div className={styles.newsContainer}>
                {news.map(({ id, link, text }) => {
                    return <News
                        key={id}
                        id={id}
                        link={link}
                        text={text}
                        progress={currentNews && currentNews.id === id ? currentNews.progress : 0}
                        onClick={this.onClickNews}
                    />
                })}
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isPlayingRecord !== this.props.isPlayingRecord) {
            if (this.props.isPlayingRecord) {
                this.readTimeoutsQueue = this.props.recordNews.reduce((timeouts, recordNews) => {
                    const news = this.props.news.find(({ id }) => recordNews.id === id);
                    if (news) {
                        timeouts.push(setTimeout(() => {
                            this.newsReader.read(news.text, news.id);
                        }, recordNews.timestamp));
                    }
                    return timeouts;
                }, []);
            } else {
                this.newsReader.stop();
                for (const timeout of this.readTimeoutsQueue) {
                    clearTimeout(timeout);
                }
                this.readTimeoutsQueue = [];
            }
        }
    }

    onClickNews(id) {
        const { news } = this.props;
        const selectedNews = news.find(news => news.id === id);
        if (selectedNews) {
            this.newsReader.read(selectedNews.text, selectedNews.id);
            if (this.props.isRecording) {
                this.props.addNewsToRecord({ id, timestamp: Date.now() - this.props.startTimestamp });
            }
        }
    }

    onProgress(id, progress) {
        this.setState({
            currentNews: {
                id,
                progress,
            },
        });
    }

    onEnd() {
        this.setState({
            currentNews: null,
        });
    }
}

const mapStateToProps = state => {
    return {
        news: selectNews(state),
        isRecording: selectIsRecording(state),
        isPlayingRecord: selectIsPlayingRecord(state),
        startTimestamp: selectStartTimestamp(state),
        recordNews: selectRecordNews(state),
    };
};

const mapDispatchToProps = {
    addNewsToRecord,
};

export const NewsContainer = connect(mapStateToProps, mapDispatchToProps)(NewsContainerComponent);
