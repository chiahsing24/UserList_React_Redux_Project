import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, setCurrentPage, setSearch, setSortParams, updateTempUsers, setSortColumn } from '../actions';
import Pagination from './Pagination';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import history from '../history';
import { orderBy } from "lodash";

class UserList extends Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        history.push('/');
        this.props.fetchUsers();
        this.props.setSearch("");
    };

    renderRedirectCreateUser = () => {
        history.push('/users/new');
    }

    handleSearchChange = (event) => {
        let searchQuery = event.target.value;
        this.props.setSearch(searchQuery);
    };

    handleColumnHeaderClick(sortKey, users) {
        let sortDirection = this.props.sortDirection;
        sortDirection = sortDirection === "desc" ? "asc" : "desc";
        const sortedCollection = orderBy(
            users,
            [sortKey],
            [sortDirection]
        );
        console.log(sortedCollection)
        this.props.updateTempUsers(sortedCollection);
        this.props.setSortColumn(sortKey);
        this.props.setSortParams(sortDirection);
    }

    render() {
        let tempUsers;
        if (this.props.tempUsers.length === 0) {
            tempUsers = this.props.users;
        } else {
            tempUsers = this.props.tempUsers
        }
        // Search
        if (this.props.searchQuery !== "") {
            tempUsers = tempUsers.filter(user => {
                return (
                    user.firstName.toLowerCase().includes(this.props.searchQuery.toLowerCase()) ||
                    user.lastName.toLowerCase().includes(this.props.searchQuery.toLowerCase()) ||
                    user.sex.toLowerCase().includes(this.props.searchQuery.toLowerCase()) ||
                    user.age.toString().includes(this.props.searchQuery)
                );
            });
        }

        let currentPage = this.props.currentPage;
        let usersPerPage = 10;

        // Change Page
        const paginate = pageNumber => setCurrentPage(pageNumber);

        // Logic for displaying current pages
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        let currentUsers = tempUsers.slice(indexOfFirstUser, indexOfLastUser);

        const renderUsers = currentUsers.map(user => {
            return (
                <tr key={user._id}>
                    <td>
                        <EditButton key={user._id} id={user._id} />
                    </td>
                    <td>
                        <DeleteButton key={user._id} id={user._id} />
                    </td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.sex}</td>
                    <td>{user.age}</td>
                </tr>
            )
        });

        let iconClass;

        if (this.props.sortDirection === "asc") {
            iconClass = "chevron up icon";
        } else if (this.props.sortDirection === "desc") {
            iconClass = "chevron down icon";
        } else {
            iconClass = "";
        };

        console.log(this.props.sortColumn)

        return (
            <div className="UserList" style={{ width: '60%', marginLeft: '20%', marginRight: '20%' }}>
                <h1>User list</h1>
                <div >
                    <label>
                        Search: <br />
                        <input type="text" value={this.props.searchQuery} onChange={this.handleSearchChange} />
                    </label>
                </div>
                <div className="table">
                    <br />
                    <table className="ui celled table">
                        <thead className="">
                            <tr className="">
                                <th className="">
                                    Edit
                                </th>
                                <th className="">Delete</th>
                                <th className="" onClick={() => this.handleColumnHeaderClick('firstName', tempUsers)}>
                                    First Name
                                    <i className={this.props.sortColumn === "firstName" ? `${iconClass}` : ""} style={{ marginLeft: '25%' }}></i>
                                </th>
                                <th className="" onClick={() => this.handleColumnHeaderClick('lastName', tempUsers)}>
                                    Last Name
                                    <i className={this.props.sortColumn === "lastName" ? `${iconClass}` : ""} style={{ marginLeft: '25%' }}></i>
                                </th>
                                <th className="" onClick={() => this.handleColumnHeaderClick('sex', tempUsers)}>
                                    Sex
                                    <i className={this.props.sortColumn === "sex" ? `${iconClass}` : ""} style={{ marginLeft: '25%' }}></i>
                                </th>
                                <th className="" onClick={() => this.handleColumnHeaderClick('age', tempUsers)}>
                                    Age
                                    <i className={this.props.sortColumn === "age" ? `${iconClass}` : ""} style={{ marginLeft: '25%' }}></i>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderUsers}
                        </tbody>
                    </table>
                    <Pagination usersPerPage={usersPerPage}
                        totalUsers={tempUsers.length}
                        tempUsers={tempUsers}
                        paginate={paginate} />
                </div>
                <div className="create-user">
                    <br />
                    <button className="ui primary button"
                        onClick={this.renderRedirectCreateUser}>
                        <i className="user secret icon"></i>Create User
                    </button>
                </div>
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
        sortColumn: state.sortColumn
    };
}

export default connect(mapStateToProps,
    {
        fetchUsers: fetchUsers,
        setSearch: setSearch,
        setSortParams: setSortParams,
        updateTempUsers: updateTempUsers,
        setSortColumn: setSortColumn
    })(UserList);
