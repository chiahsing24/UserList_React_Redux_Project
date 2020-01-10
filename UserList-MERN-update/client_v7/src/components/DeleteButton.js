import React from 'react';
import { connect } from 'react-redux';
import { deleteUser, updateTempUsers } from '../actions';
import { withRouter} from 'react-router-dom';
import history from '../history';


class DeleteButton extends React.Component {
    constructor(props) {
        super(props);
    };

    handleOnClick = (toBeDelete) => {
        this.props.deleteUser(toBeDelete);
        console.log("The deleted user id: " + toBeDelete);

        if (this.props.tempUsers.length !== 0) {
            let tempUsers = this.props.tempUsers;
            console.log("Delete action => initial tempUsers's size: " + tempUsers.length);
            tempUsers = tempUsers.filter((user) => {
                return user._id !== toBeDelete;
            })
            console.log("Delete action => after update tempUsers, size becomes: " + tempUsers.length);
            this.props.updateTempUsers(tempUsers);
        }
        
        history.push('/');
    };

    render() {
        
        return (
            <div className="DeleteButton">
                <button className="ui button negative" onClick={() => this.handleOnClick(this.props.id)}>
                <i className="trash alternate outline icon"></i>Delete
                </button>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    //return { users: state.users }
    return {
        users: Object.values(state.users),
        currentPage: state.currentPage,
        searchQuery: state.searchQuery,
        sortDirection: state.sortDirection,
        tempUsers: state.tempUsers,
        sortColumn: state.sortColumn,
        searchQueryForSort: state.searchQueryForSort
    };
}

export default withRouter(connect(mapStateToProps, { deleteUser: deleteUser, updateTempUsers: updateTempUsers })(DeleteButton));
