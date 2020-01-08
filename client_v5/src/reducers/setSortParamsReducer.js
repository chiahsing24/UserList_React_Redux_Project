const setSortParamsReducer = (direction = "", action) => {
    if (action.type === 'SET_INIT_SORT_PARAMS') {
        return action.payload;
    }
    return direction;
}

export default setSortParamsReducer;