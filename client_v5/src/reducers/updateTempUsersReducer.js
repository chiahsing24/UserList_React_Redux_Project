const updateTempUsersReducer = (tempUsers = [], action) => {
    if (action.type === 'UPDATE_TEMP_USERS') {
        return action.payload;
    }
    return tempUsers;
}

export default updateTempUsersReducer;