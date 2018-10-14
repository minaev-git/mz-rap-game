import * as React from "react";
import { connect } from "react-redux";
import { Loop } from "../Loop/Loop";
import { selectLoopsByCategory, setLoopState } from "../../ducks/loops";
import { LoopState } from "../../consts";

import * as styles from "./LoopCategory.css";

export class LoopCategoryComponent extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    render() {
        const { title, color, loops, playbackPercent } = this.props;
        return (
            <div className={styles.category} style={{ color }}>
                <div className={styles.list}>
                    {loops.map((loop, index) =>
                        <Loop
                            key={loop.id}
                            id={loop.id}
                            name={`${title} ${index + 1}`}
                            state={loop.state}
                            playbackPercent={playbackPercent}
                            onClick={this.onClick}
                        />
                    )}
                </div>
            </div>
        );
    }

    onClick(loopId) {
        const loop = this.props.loops.find(({ id }) => id === loopId);
        const groupId = loop.groupId;
        const currentLoop = this.props.loops.find(loop =>
            loop.groupId === groupId && (
                loop.state === LoopState.Active ||
                loop.state === LoopState.NextOn
            )
        );
        // switch off current loop from the same group
        let switchOffLoop = [];
        if (currentLoop && currentLoop !== loop) {
            let currentLoopNextState;
            if (currentLoop.state === LoopState.Active) {
                currentLoopNextState = LoopState.NextOff;
            } else {
                currentLoopNextState = LoopState.Off;
            }
            switchOffLoop.push({ id: currentLoop.id, state: currentLoopNextState });
        }
        let newState;
        if (loop.state === LoopState.Off) {
            newState = LoopState.NextOn;
        } else if (loop.state === LoopState.NextOn) {
            newState = LoopState.Off;
        } else if (loop.state === LoopState.NextOff) {
            newState = LoopState.Active;
        } else if (loop.state === LoopState.Active) {
            newState = LoopState.NextOff;
        }
        this.props.setLoopState([
            ...switchOffLoop,
            { id: loopId, state: newState },
        ]);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        loops: selectLoopsByCategory(state, ownProps.id),
    };
};

const mapDispatchToProps = {
    setLoopState,
};

export const LoopCategory = connect(mapStateToProps, mapDispatchToProps)(LoopCategoryComponent);
