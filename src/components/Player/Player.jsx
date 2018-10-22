import * as React from "react";
import { connect } from "react-redux";
import cn from "classnames";
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
import type { RootState } from "../../ducks";

import * as styles from "./Player.css";

type PlayerComponentStateProps = {|
    +allLoaded: $Call<typeof selectAllLoaded, RootState>,
    +isRecording: $Call<typeof selectIsRecording, RootState>,
    +isPlayingRecord: $Call<typeof selectIsPlayingRecord, RootState>,
    +startTimestamp: $Call<typeof selectStartTimestamp, RootState>,
    +recordLoops: $Call<typeof selectRecordLoops, RootState>,
    +recordNews: $Call<typeof selectRecordNews, RootState>,
    +playback: $Call<typeof selectPlayback, RootState>,
|}

type PlayerComponentDispatchProps = {|
    +setIsRecording: typeof setIsRecording,
    +setIsPlayingRecord: typeof setIsPlayingRecord,
    +stopAllLoops: typeof stopAllLoops,
    +setLoopState: typeof setLoopState,
|}

type PlayerComponentProps = PlayerComponentStateProps & PlayerComponentDispatchProps;

type PlayerComponentState = {|
    shareLink: string,
|}

export class PlayerComponent extends React.Component<PlayerComponentProps, PlayerComponentState> {
    refLink: { current: null | HTMLInputElement };
    constructor(props: PlayerComponentProps) {
        super(props);

        this.state = {
            shareLink: this.generateLink(),
        };

        this.refLink = React.createRef();
    }

    shouldComponentUpdate(prevProps: PlayerComponentProps) {
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

    componentDidUpdate(prevProps: PlayerComponentProps) {
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

    onClickRecord = () => {
        if (this.props.isRecording) {
            this.props.setIsRecording(false);
            this.setState({
                shareLink: this.generateLink(),
            });
        } else {
            this.props.setIsRecording(true);
        }
    };

    onClickPlay = () => {
        this.props.stopAllLoops();
        if (this.props.isPlayingRecord) {
            this.props.setIsPlayingRecord(false);
        } else {
            this.props.setIsPlayingRecord(true);
            this.setNextLoops(0);
        }
    };

    onClickLink = () => {
        const input = this.refLink.current;
        if (input !== null) {
            input.focus();
            input.select();
        }
        try {
            const successful = document.execCommand("copy");
            if (!successful) {
                throw new Error("");
            }
        } catch (err) {
            console.error("Не скопировалось :(");
        }
    };

    setNextLoops(cursor: number) {
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

const mapStateToProps = (state: RootState): PlayerComponentStateProps => ({
    allLoaded: selectAllLoaded(state),
    isRecording: selectIsRecording(state),
    isPlayingRecord: selectIsPlayingRecord(state),
    startTimestamp: selectStartTimestamp(state),
    recordLoops: selectRecordLoops(state),
    recordNews: selectRecordNews(state),
    playback: selectPlayback(state),
});

const mapDispatchToProps: PlayerComponentDispatchProps = {
    setIsRecording,
    setIsPlayingRecord,
    stopAllLoops,
    setLoopState,
};

export const Player = connect(mapStateToProps, mapDispatchToProps)(PlayerComponent);
