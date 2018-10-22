import * as React from "react";
import * as styles from "./Progress.css";

type ProgressProps = {|
    +radius: number,
    +stroke: number,
    +percent: number,
|}

export function Progress(props: ProgressProps) {
    const { radius, stroke, percent } = props;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const offset = circumference * (1 - percent);
    return (
        <svg
            width={radius * 2}
            height={radius * 2}>
            <circle
                stroke="#000000"
                strokeWidth={stroke}
                fill="transparent"
                r={radius - stroke / 2}
                cx={radius}
                cy={radius}
                opacity={0.3}
            />
            <circle
                className={styles.circle}
                stroke="#ffffff"
                strokeWidth={stroke}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={offset}
                fill="transparent"
                r={radius - stroke / 2}
                cx={radius}
                cy={radius}
            />
        </svg>
    );
}
