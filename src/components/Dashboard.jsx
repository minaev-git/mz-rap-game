import * as React from "react";
import { connect } from "react-redux";
import { selectState as selectCategories } from "../ducks/categories";
import { LoopCategory } from "./LoopsCategory/LoopCategory";
import { NewsContainer } from "./News/NewsContainer";
import { Player } from "./Player/Player";
import { selectState as selectPlayback } from "../ducks/playback";
import { LOOP_DURATION_SEC } from "../consts";

import * as styles from "./Dashboard.css";

export class DashboardComponent extends React.Component {
    constructor(props) {
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

    renderLoopCategory(category) {
        const { id, name, color } = category;
        const { playbackPercent } = this.state;
        return (
            <LoopCategory
                key={id}
                id={id}
                title={name}
                color={color}
                playbackPercent={playbackPercent}
                onClick={this.onClick}
            />
        );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.playback.timestamp !== this.props.playback.timestamp) {
            this.setPercent(0);
            clearInterval(this.percentUpdateTimer);
            if (this.props.playback.timestamp !== null) {
                this.percentUpdateTimer = setInterval(() => {
                    this.setPercent();
                }, 100);
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.percentUpdateTimer);
    }

    setPercent(percent) {
        const playbackPercent = percent !== undefined ?
            percent :
            Math.min(
                (Date.now() - this.props.playback.timestamp) / 1000 / LOOP_DURATION_SEC,
                1,
            );
        this.setState({
            playbackPercent,
        });
    }
}

const mapStateToProps = state => {
    return {
        categories: selectCategories(state),
        playback: selectPlayback(state),
    };
};

export const Dashboard = connect(mapStateToProps)(DashboardComponent);
