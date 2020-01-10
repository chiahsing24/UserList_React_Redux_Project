
const currentPageReducer = (currentPage = 1, action) => {
    if (action.type === 'SET_CURRENT_PAGE') {
        return action.payload;
    }
    return currentPage;
}

export default currentPageReducer;