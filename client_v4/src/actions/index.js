import myApi from '../myApi/myApi';
import history from '../history';

export const fetchUsers = () => {
    return async (dispatch, getState) => {
        const response = await myApi.get('/users');
        dispatch({ type: 'FETCH_USERS', payload: response.data.data });
    };
};

export const fetchUser = (id) => {
    return async (dispatch) => {
        const response = await myApi.get(`/users/${id}`);
        dispatch({ type: 'FETCH_USER', payload: response.data });
    };
};

export const createUser = (formValues) => {
    //const { _id} = getState(); 
    return async (dispatch) => {
        const newUser = await myApi.post('/users', formValues);
        dispatch({ type: 'CREATE_USER', payload: newUser.data.data.user });
        history.push('/');
        //window.location.reload(false);
    };
};

export const editUser = (id, formValues) => {
    return async dispatch => {
        const response = await myApi.patch(`/users/${id}`, formValues);
        dispatch({ type: 'EDIT_USER', payload: response.data });
        history.push('/');
    };
};

export const deleteUser = (id) => {
    return async dispatch => {
        const response = await myApi.delete(`/users/${id}`);
        dispatch({ type: 'DELETE_USER', payload: id });
    }
};

export const setCurrentPage = pageNumber => {
    return {
        type: 'SET_CURRENT_PAGE',
        payload: pageNumber
    };
};

export const setSearch = (searchQuery) => {
    return {
        type: 'SET_SEARCH',
        payload: searchQuery
    };
};

export const setSortParams = (direction) => {
    return {
        type: 'SET_INIT_SORT_PARAMS',
        payload: direction
    };
};

export const updateTempUsers = (tempUsers) => {
    return {
        type: 'UPDATE_TEMP_USERS',
        payload: tempUsers
    };
};

export const setSortColumn = (column) => {
    return {
        type: 'SET_SORT_COLUMN',
        payload: column
    };
};

// export const selectedUserToBeEdit = (id) => {
//     return {
//         type: 'SELECTED_USER_TO_BE_EDIT',
//         payload: id
//     };
// };

