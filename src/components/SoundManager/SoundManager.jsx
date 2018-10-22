import * as React from "react";
import { connect } from "react-redux";
import { Howl, Howler } from "howler";
import { selectState as selectLoops, setLoops, setLoopState } from "../../ducks/loops";
import {
    addLoops as addLoopsToRecord,
    selectIsRecording,
    setIsPlayingRecord,
} from "../../ducks/record";
import { selectState as selectPlayback, setCursor } from "../../ducks/playback";
import { LOOP_DURATION_SEC, LoopState } from "../../consts";
import type { RootState } from "../../ducks";

const checkLoopEndTimeMs = 40;
const scheduleAheadTimeSec = 0.01;

type SoundManagerComponentStateProps = {|
    +loops: $Call<typeof selectLoops, RootState>,
    +isRecording: $Call<typeof selectIsRecording, RootState>,
    +playback: $Call<typeof selectPlayback, RootState>,
|}

type SoundManagerComponentDispatchProps = {|
    +setLoops: typeof setLoops,
    +setLoopState: typeof setLoopState,
    +setCursor: typeof setCursor,
    +addLoopsToRecord: typeof addLoopsToRecord,
    +setIsPlayingRecord: typeof setIsPlayingRecord,
|}

type SoundManagerComponentProps = SoundManagerComponentStateProps & SoundManagerComponentDispatchProps;

export class SoundManagerComponent extends React.Component<SoundManagerComponentProps> {
    ctxCurrentTime: number | null;
    isPlaying: boolean;
    howls: { [string]: Class<Howl> };
    checkInterval: IntervalID | void;
    constructor(props: SoundManagerComponentProps) {
        super(props);

        this.ctxCurrentTime = null;
        this.isPlaying = false;

        this.howls = {};
        for (const loop of this.props.loops) {
            this.howls[loop.id] = new Howl({
                src: [loop.src],
                preload: true,
                onload: () => {
                    this.props.setLoopState([{ id: loop.id, state: LoopState.Off }]);
                },
            });
        }
    }

    shouldComponentUpdate(nextProps: SoundManagerComponentProps) {
        return nextProps.loops !== this.props.loops;
    }

    componentWillUnmount() {
        clearInterval(this.checkInterval);
        for (const loopId of Object.keys(this.howls)) {
            this.howls[loopId].unload();
        }
    }

    render() {
        return null;
    }

    componentDidUpdate(prevProps: SoundManagerComponentProps) {
        if (this.props.loops !== prevProps.loops) {
            if (this.isPlaying) {
                const hasActiveLoops = this.props.loops.some(loop =>
                    loop.state === LoopState.Active ||
                    loop.state === LoopState.NextOn ||
                    loop.state === LoopState.NextOff
                );
                if (!hasActiveLoops) {
                    this.stop();
                }
            } else {
                const hasActiveLoops = this.props.loops.some(loop => loop.state === LoopState.NextOn);
                if (hasActiveLoops) {
                    this.play();
                }
            }
        }
    }

    play() {
        if (this.isPlaying) {
            return;
        }
        this.isPlaying = true;
        this.ctxCurrentTime = Howler.ctx.currentTime;
        this.checkInterval = setInterval(this.checkLoopEnd, checkLoopEndTimeMs);
        this.playNextLoops();
    }

    stop() {
        if (!this.isPlaying) {
            return;
        }
        clearInterval(this.checkInterval);
        for (const loopId of Object.keys(this.howls)) {
            this.howls[loopId].stop();
        }
        this.isPlaying = false;
        this.props.setCursor(null);
        this.props.setIsPlayingRecord(false);
    }

    playNextLoops() {
        const { loops, isRecording, playback } = this.props;
        const loopsForPlay = [];
        const loopsForRecord = [];
        const newLoopStates = [];
        for (const loop of loops) {
            // loops which must play next
            if (loop.state === LoopState.Active || loop.state === LoopState.NextOn) {
                loopsForPlay.push(loop.id);
                if (loop.state === LoopState.NextOn) {
                    newLoopStates.push({ id: loop.id, state: LoopState.Active });
                }
                loopsForRecord.push(loop.id);
            // loops which must stop now
            } else if (loop.state === LoopState.NextOff) {
                newLoopStates.push({ id: loop.id, state: LoopState.Off });
            }
        }

        this.ctxCurrentTime = Howler.ctx.currentTime;

        for (const loopId of loopsForPlay) {
            this.howls[loopId].play();
        }

        if (isRecording) {
            this.props.addLoopsToRecord(loopsForRecord);
        }

        if (newLoopStates.length) {
            this.props.setLoopState(newLoopStates);
        }

        // cursor may have already updated because of the previous call to `setLoopState`
        if (this.isPlaying) {
            const newCursor = playback.cursor !== null ?
                playback.cursor + 1 :
                0;
            if (newCursor === Number.MAX_SAFE_INTEGER) {
                this.stop();
            } else {
                this.props.setCursor(newCursor);
            }
        }
    }

    checkLoopEnd: () => void = () => {
        if (this.ctxCurrentTime + LOOP_DURATION_SEC < Howler.ctx.currentTime + scheduleAheadTimeSec) {
            this.playNextLoops();
        }
    };
}

const mapStateToProps = (state: RootState): SoundManagerComponentStateProps => {
    return {
        loops: selectLoops(state),
        isRecording: selectIsRecording(state),
        playback: selectPlayback(state),
    };
};

const mapDispatchToProps: SoundManagerComponentDispatchProps = {
    setLoops,
    setLoopState,
    setCursor,
    addLoopsToRecord,
    setIsPlayingRecord,
};

export const SoundManager = connect(mapStateToProps, mapDispatchToProps)(SoundManagerComponent);
