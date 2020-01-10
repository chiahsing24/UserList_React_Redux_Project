const setSortColumnReducer = (column = "", action) => {
    if (action.type === 'SET_SORT_COLUMN') {
        return action.payload;
    }
    return column;
}

export default setSortColumnReducer;