import * as React from "react";
import cn from "classnames";
import { Progress } from "../Progress/ProgressCircle";
import { LoopState } from "../../consts";
import type { LoopStateEnum } from "../../types";

import * as styles from "./Loop.css";

type LoopProps = {|
    +name: string,
    +state: LoopStateEnum,
    +playbackPercent: number,
    +id: string,
    +onClick: (string) => void
|}

export class Loop extends React.Component<LoopProps> {
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

    onClick = () => {
        this.props.onClick(this.props.id);
    }
}
