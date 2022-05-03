export const setColumns = value => dispatch => dispatch({ type: 'SET_COLUMNS', payload: value });

const initialState = {
    columns: {},
};

const reducer = (state = initialState, action) => {
    let newState = state;

    if (action.type === 'SET_COLUMNS') {
        newState = { ...state, columns: action.payload };
    }

    return newState;
};

export default reducer;

