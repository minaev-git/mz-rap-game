import * as React from "react";
import { connect } from "react-redux";
import * as cn from "classnames";
import {
    selectIsRecording,
    setIsRecording,
    selectStartTimestamp,
    setIsPlayingRecord,
    selectIsPlayingRecord,
    selectRecordLoops,
    selectRecordNews,
} from "../../ducks/record";
import { generateShareHash } from "./utils";
import { selectAllLoaded, setLoopState, stopAllLoops } from "../../ducks/loops";
import { selectState as selectPlayback } from "../../ducks/playback";
import { LoopState } from "../../consts";

import * as styles from "./Player.css";

export class PlayerComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shareLink: this.generateLink(),
        };

        this.refLink = React.createRef();

        this.onClickRecord = this.onClickRecord.bind(this);
        this.onClickPlay = this.onClickPlay.bind(this);
        this.onClickLink = this.onClickLink.bind(this);
    }

    shouldComponentUpdate(prevProps) {
        return prevProps.allLoaded !== this.props.allLoaded ||
            prevProps.isRecording !== this.props.isRecording ||
            prevProps.recordLoops !== this.props.recordLoops ||
            prevProps.isPlayingRecord !== this.props.isPlayingRecord ||
            prevProps.playback !== this.props.playback;
    }

    render() {
        const { isRecording, isPlayingRecord, recordLoops, allLoaded } = this.props;
        const hasRecord = !isRecording && recordLoops.length !== 0 && allLoaded;
        return (
            <div className={styles.player}>
                <button
                    className={cn(styles.button, styles.recButton, {
                        [styles.active]: isRecording,
                    })}
                    disabled={isPlayingRecord || !allLoaded}
                    onClick={this.onClickRecord}
                >
                    <span className={styles.icon}>●</span>
                    Rec
                </button>
                <button
                    className={cn(styles.button, styles.playButton, {
                        [styles.active]: isPlayingRecord,
                    })}
                    disabled={!hasRecord}
                    onClick={this.onClickPlay}
                >
                    <span className={styles.icon}>▶</span>
                    Играть
                    <span className={styles.playTitleAdd}>&nbsp;запись</span>
                </button>
                <button
                    className={cn(styles.button, styles.shareButton)}
                    disabled={!hasRecord}
                    onClick={this.onClickLink}
                >
                    <span className={styles.icon}>⇫</span>
                    Поделиться
                </button>
                <label
                    className={cn(styles.share, {
                        [styles.shareDisabled]: !hasRecord,
                    })}
                    onClick={this.onClickLink}
                    title={hasRecord ? "Копировать": null}
                >
                    <span className={styles.shareLabel}>
                        <span className={styles.icon}>⇫</span>
                        Поделиться:
                    </span>
                    <input
                        className={styles.shareLink}
                        type="text"
                        placeholder="Используйте кнопку Rec, чтобы записать свой трек"
                        readOnly={true}
                        value={this.state.shareLink}
                        ref={this.refLink}
                    />
                </label>
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        const { allLoaded, isPlayingRecord, playback, recordLoops } = this.props;

        // auto play on load
        if (
            prevProps.allLoaded !== allLoaded &&
            allLoaded &&
            recordLoops.length !== 0
        ) {
            this.onClickPlay();
        }

        if (isPlayingRecord) {
            if (
                prevProps.playback.cursor !== playback.cursor &&
                playback.cursor !== null
            ) {
                this.setNextLoops(playback.cursor + 1);
            }
        }
    }

    onClickRecord() {
        if (this.props.isRecording) {
            this.props.setIsRecording(null);
            this.setState({
                shareLink: this.generateLink(),
            });
        } else {
            this.props.setIsRecording(Date.now());
        }
    }

    onClickPlay() {
        this.props.stopAllLoops();
        if (this.props.isPlayingRecord) {
            this.props.setIsPlayingRecord(false);
        } else {
            this.props.setIsPlayingRecord(true);
            this.setNextLoops(0);
        }
    }

    onClickLink() {
        this.refLink.current.focus();
        this.refLink.current.select();
        try {
            const successful = document.execCommand("copy");
            if (!successful) {
                throw new Error("");
            }
        } catch (err) {
            console.error("Не скопировалось :(");
        }
    }

    setNextLoops(cursor) {
        const { recordLoops } = this.props;
        const newLoopStates = [];
        // schedule stop
        if (recordLoops[cursor - 1]) {
            for (const prevLoopId of recordLoops[cursor - 1]) {
                if (!recordLoops[cursor] || !recordLoops[cursor].includes(prevLoopId)) {
                    newLoopStates.push({ id: prevLoopId, state: LoopState.NextOff });
                }
            }
        }
        // schedule play
        if (recordLoops[cursor]) {
            for (const loopId of recordLoops[cursor]) {
                if (!recordLoops[cursor - 1] || !recordLoops[cursor - 1].includes(loopId)) {
                    newLoopStates.push({ id: loopId, state: LoopState.NextOn });
                }
            }
        }
        this.props.setLoopState(newLoopStates);
    }

    generateLink() {
        const { recordLoops: loops, recordNews: news, startTimestamp } = this.props;
        if (loops.length || news.length) {
            const urlHash = encodeURIComponent(generateShareHash({
                loops,
                news,
                startTimestamp,
            }));
            return `${location.origin}${location.pathname}?r=${urlHash}`;
        } else {
            return "";
        }
    }
}

const mapStateToProps = state => ({
    allLoaded: selectAllLoaded(state),
    isRecording: selectIsRecording(state),
    isPlayingRecord: selectIsPlayingRecord(state),
    startTimestamp: selectStartTimestamp(state),
    recordLoops: selectRecordLoops(state),
    recordNews: selectRecordNews(state),
    playback: selectPlayback(state),
});

const mapDispatchToProps = {
    setIsRecording,
    setIsPlayingRecord,
    stopAllLoops,
    setLoopState,
};

export const Player = connect(mapStateToProps, mapDispatchToProps)(PlayerComponent);
