import * as React from "react";
import cn from "classnames";
import * as styles from "./Progress.css";

type ProgressProps = {|
    +percent: number,
|}

export function Progress(props: ProgressProps) {
    const { percent } = props;
    return (
        <div className={cn(styles.barContainer, {
            [styles.active]: percent > 0 && percent < 0.9,
        })}>
            <div
                className={styles.bar}
                style={{
                    width: `${percent * 100}%`,
                }}
            />
        </div>
    );
}
