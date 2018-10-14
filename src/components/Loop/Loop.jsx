import * as React from "react";
import * as cn from "classnames";
import { Progress } from "../Progress/ProgressCircle";
import { LoopState } from "../../consts";

import * as styles from "./Loop.css";

export class Loop extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    render() {
        const { name, state, playbackPercent } = this.props;
        return (
            <button
                className={cn(styles.loop, {
                    [styles.loading]: state === LoopState.Loading,
                    [styles.nextOn]: state === LoopState.NextOn,
                    [styles.active]: state === LoopState.Active,
                    [styles.nextOff]: state === LoopState.NextOff,
                })}
                onClick={this.onClick}
            >
                <div className={styles.background} />
                <div className={styles.indicator} />
                <Progress
                    radius={15}
                    stroke={3}
                    percent={state !== LoopState.Off ? playbackPercent : 0}
                />
                <div className={styles.name}>
                    {name}
                </div>
            </button>
        );
    }

    onClick() {
        this.props.onClick(this.props.id);
    }
}
