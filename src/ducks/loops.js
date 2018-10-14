import { LoopState } from "../consts";

export const SET_LOOPS = "loops/SET_LOOPS";
export const SET_LOOP_STATE = "loops/SET_LOOP_STATE";
export const STOP_ALL_LOOPS = "loops/STOP_ALL_LOOPS";

const initialState = [];

export function setLoops(loops) {
    return {
        type: SET_LOOPS,
        payload: loops,
    };
}

export function setLoopState(newLoopStates) {
    return {
        type: SET_LOOP_STATE,
        payload: newLoopStates,
    };
}

export function stopAllLoops() {
    return {
        type: STOP_ALL_LOOPS,
    };
}

export function loopsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOOPS:
            return [
                ...action.payload,
            ];
        case SET_LOOP_STATE: {
            return state.reduce((result, loop) => {
                const newState = action.payload.find(({ id }) => loop.id === id);
                if (newState) {
                    loop.state = newState.state;
                }
                result.push(loop);
                return result;
            }, []);
        }
        case STOP_ALL_LOOPS: {
            return state.map(loop => {
                loop.state = LoopState.Off;
                return loop;
            });
        }
        default:
            return state;
    }
}

export function selectState(rootState) {
    return rootState.loops;
}

export function selectLoopsByCategory(rootState, categoryId) {
    return selectState(rootState).filter(loop => loop.categoryId === categoryId);
}

export function selectAllLoaded(rootState) {
    const loops = selectState(rootState);
    return loops.length && loops.every(loop => loop.state !== LoopState.Loading);
}
