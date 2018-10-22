import type { Category } from "../types";
import type { RootState } from "./index";

export const SET_CATEGORIES = "categories/SET_CATEGORIES";

export type CategoriesState = Category[];

const initialState: CategoriesState = [];

type SetCategoriesAction = {|
    +type: typeof SET_CATEGORIES,
    +payload: Category[],
|};

export function setCategories(categories: CategoriesState): SetCategoriesAction {
    return {
        type: SET_CATEGORIES,
        payload: categories,
    }
}

type CategoriesAction = SetCategoriesAction;

export function categoriesReducer(state: CategoriesState = initialState, action: CategoriesAction): CategoriesState {
    switch (action.type) {
        case SET_CATEGORIES: {
            const newState = [...state];
            for (const category of action.payload) {
                if (!newState.some(({ id }) => id === category.id)) {
                    newState.push(category);
                }
            }
            return newState;
        }
        default:
            return state;
    }
}

export function selectState(rootState: RootState): CategoriesState {
    return rootState.categories;
}
