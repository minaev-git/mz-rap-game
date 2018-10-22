import { LoopState } from "../consts";
import type { Loop, LoopStateEnum } from "../types";
import type { RootState } from "./index";

export const SET_LOOPS = "loops/SET_LOOPS";
export const SET_LOOP_STATE = "loops/SET_LOOP_STATE";
export const STOP_ALL_LOOPS = "loops/STOP_ALL_LOOPS";

export type LoopsState = Loop[];

const initialState: LoopsState = [];

type SetLoopsAction = {|
    +type: typeof SET_LOOPS,
    +payload: Loop[],
|}

export function setLoops(loops: Loop[]): SetLoopsAction {
    return {
        type: SET_LOOPS,
        payload: loops,
    };
}

export type LoopStateById = {|
    +id: string,
    +state: LoopStateEnum,
|}
type SetLoopStateAction = {|
    +type: typeof SET_LOOP_STATE,
    +payload: LoopStateById[],
|}

export function setLoopState(newLoopStates: LoopStateById[]): SetLoopStateAction {
    return {
        type: SET_LOOP_STATE,
        payload: newLoopStates,
    };
}

type StopAllLoopsAction = {|
    +type: typeof STOP_ALL_LOOPS,
|}

export function stopAllLoops(): StopAllLoopsAction {
    return {
        type: STOP_ALL_LOOPS,
    };
}

type LoopsAction = SetLoopsAction |
    SetLoopStateAction |
    StopAllLoopsAction;

export function loopsReducer(state: LoopsState = initialState, action: LoopsAction): LoopsState {
    switch (action.type) {
        case SET_LOOPS:
            return [
                ...action.payload,
            ];
        case SET_LOOP_STATE: {
            const payload = action.payload;
            return state.reduce((result, loop) => {
                const newState: LoopStateById | void = payload.find(({ id }) => loop.id === id);
                if (newState !== undefined) {
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

export function selectState(rootState: RootState): LoopsState {
    return rootState.loops;
}

export function selectLoopsByCategory(rootState: RootState, categoryId: string): Loop[] {
    return selectState(rootState).filter(loop => loop.categoryId === categoryId);
}

export function selectAllLoaded(rootState: RootState): boolean {
    const loops = selectState(rootState);
    return Boolean(loops.length) && loops.every(loop => loop.state !== LoopState.Loading);
}
