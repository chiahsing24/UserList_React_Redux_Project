const setSearchForSortReducer = (searchQuery = "", action) => {
    if (action.type === 'SET_SEARCH_FOR_SORT') {
        return action.payload;
    }
    return searchQuery;
}

export default setSearchForSortReducer;