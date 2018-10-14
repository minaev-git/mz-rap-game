import * as React from "react";
import * as cn from "classnames";
import * as styles from "./Progress.css";

export class Progress extends React.Component {
    render() {
        const { percent } = this.props;
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
}
