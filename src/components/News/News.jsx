import * as React from "react";
import { Progress } from "../Progress/ProgressBar";

import * as styles from "./News.css";

type NewsProps = {|
    +id: string,
    +link: string,
    +text: string,
    +progress: number,
    +onClick: (string) => void,
|}

export class News extends React.Component<NewsProps> {
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

    onClick = (event: MouseEvent) => {
        const target = event.target;
        if (!(target instanceof window.HTMLAnchorElement)) {
            this.props.onClick(this.props.id);
        }
    }
}
