const setSearchReducer = (searchQuery = "", action) => {
    if (action.type === 'SET_SEARCH') {
        return action.payload;
    }
    return searchQuery;
}

export default setSearchReducer;