import * as React from "react";
import { connect } from "react-redux";
import { selectState as selectCategories } from "../ducks/categories";
import { LoopCategory } from "./LoopsCategory/LoopCategory";
import { NewsContainer } from "./News/NewsContainer";
import { Player } from "./Player/Player";
import { selectState as selectPlayback } from "../ducks/playback";
import { LOOP_DURATION_SEC } from "../consts";
import type { Category } from "../types";
import type { RootState } from "../ducks";

import * as styles from "./Dashboard.css";

type DashboardComponentProps = {|
    +categories: $Call<typeof selectCategories, RootState>,
    +playback: $Call<typeof selectPlayback, RootState>,
|}
type DashboardComponentState = {|
    +playbackPercent: number,
|}
export class DashboardComponent extends React.Component<DashboardComponentProps, DashboardComponentState> {
    percentUpdateTimer: IntervalID | null;
    constructor(props: DashboardComponentProps) {
        super(props);

        this.percentUpdateTimer = null;
        this.state = {
            playbackPercent: 0,
        };
    }

    render() {
        const { categories } = this.props;
        return (
            <div className={styles.dashboard}>
                <Player />
                <div className={styles.triggers}>
                    <div className={styles.loopsContainer}>
                        {categories.map(category => this.renderLoopCategory(category))}
                    </div>
                    <NewsContainer />
                </div>
            </div>
        );
    }

    renderLoopCategory(category: Category) {
        const { id, name, color } = category;
        const { playbackPercent } = this.state;
        return (
            <LoopCategory
                key={id}
                id={id}
                title={name}
                color={color}
                playbackPercent={playbackPercent}
            />
        );
    }

    componentDidUpdate(prevProps: DashboardComponentProps) {
        if (prevProps.playback.timestamp !== this.props.playback.timestamp) {
            this.setPercent(0);
            if (this.percentUpdateTimer !== null) {
                clearInterval(this.percentUpdateTimer);
            }
            if (this.props.playback.timestamp !== null) {
                this.percentUpdateTimer = setInterval(() => {
                    this.setPercent();
                }, 100);
            }
        }
    }

    componentWillUnmount() {
        if (this.percentUpdateTimer !== null) {
            clearInterval(this.percentUpdateTimer);
        }
    }

    setPercent(percent?: number) {
        if (percent !== undefined) {
            this.setState({
                playbackPercent: percent,
            });
        } else {
            const playbackPercent = Math.min((
                Date.now() - (this.props.playback.timestamp !== null ? this.props.playback.timestamp : 0))
                   / 1000 / LOOP_DURATION_SEC,
                1,
            );
            this.setState({
                playbackPercent,
            });
        }
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        categories: selectCategories(state),
        playback: selectPlayback(state),
    };
};

export const Dashboard = connect(mapStateToProps)(DashboardComponent);
