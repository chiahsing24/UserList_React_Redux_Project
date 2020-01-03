
const editUserReducer = ( id = "", action) => {
    if (action.type === 'EDIT_USER') {
        return action.payload;
    }
    return id;
}

export default editUserReducer;