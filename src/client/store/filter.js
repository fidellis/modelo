export const setFilter = value => dispatch => dispatch({ type: 'SET_FILTER', payload: value });
export const setFilters = value => dispatch => dispatch({ type: 'SET_FILTERS', payload: value });
export const clearFilters = () => dispatch => dispatch({ type: 'CLEAR_FILTERS', payload: {} });

const initialState = {
    teste: {
        id: 1,
    },
};

const reducer = (state = initialState, action) => {
    let newState = state;

    if (action.type === 'SET_FILTERS') {
        const { id, value, filter, ...rest } = action.payload;
        newState = { ...state, [filter]: { ...state[filter], [id]: value, ...rest } };
    }

    if (action.type === 'SET_FILTER') {
        const { id, value, filter } = action.payload;
        newState = { ...state, [filter]: { ...state[filter], [id]: value } };
    }

    if (action.type === 'CLEAR_FILTERS') {
        newState = initialState;
    }

    return newState;
};

export default reducer;

