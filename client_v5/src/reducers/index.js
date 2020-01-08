import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import usersReducer from './usersReducer';
import currentPageReducer from './currentPageReducer';
import setSearchReducer from './setSearchReducer';
import editUserReducer from './editUserReducer';
import fetchUserReducer from './fetchUserReducer';
import setSortParamsReducer from './setSortParamsReducer';
import updateTempUsersReducer from './updateTempUsersReducer';
import setSortColumnReducer from './setSortColumnReducer';
import setSearchForSortReducer from './setSearchForSortReducer';
//import selectedUserToBeEditReducer from './selectedUserToBeEditReducer';

export default combineReducers({
    users: usersReducer,
    form: formReducer,
    currentPage: currentPageReducer,
    searchQuery: setSearchReducer,
    user: fetchUserReducer,
    sortDirection: setSortParamsReducer,
    tempUsers: updateTempUsersReducer,
    sortColumn: setSortColumnReducer,
    searchQueryForSort: setSearchForSortReducer
    //selectedUserToBeEdit: selectedUserToBeEditReducer
});