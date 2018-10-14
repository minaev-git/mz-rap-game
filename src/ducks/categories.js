export const SET_CATEGORIES = "categories/SET_CATEGORIES";

const initialState = [];

export function setCategories(categories) {
    return {
        type: SET_CATEGORIES,
        payload: categories,
    }
}

export function categoriesReducer(state = initialState, action) {
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

export function selectState(rootState) {
    return rootState.categories;
}
