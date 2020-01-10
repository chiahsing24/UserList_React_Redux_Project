
const fetchUserReducer = (id ="", action) => {
    if (action.type === 'FETCH_USER') {
        return action.payload.data.user;
    }
    return id;
}

export default fetchUserReducer;