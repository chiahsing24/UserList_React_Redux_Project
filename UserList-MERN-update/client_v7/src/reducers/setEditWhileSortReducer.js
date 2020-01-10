const setEditWhileSortReducer = (ans = "", action) => {
    if (action.type === 'SET_EDIT_WHILE_SORT') {
        return action.payload;
    }
    return ans;
}

export default setEditWhileSortReducer;