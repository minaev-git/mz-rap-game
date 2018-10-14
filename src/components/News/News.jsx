import * as React from "react";
import { Progress } from "../Progress/ProgressBar";

import * as styles from "./News.css";

export class News extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    render() {
        const { link, text, progress } = this.props;
        return (
            <div
                className={styles.news}
                onClick={this.onClick}
            >
                {text}
                &nbsp;[<a className={styles.link} href={link} target="_blank">ссылка</a>]
                <div className={styles.progress}>
                    <Progress percent={progress} />
                </div>
            </div>
        );
    }

    onClick(event) {
        if (event.target.tagName !== "A") {
            this.props.onClick(this.props.id);
        }
    }
}
