import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, setCurrentPage } from '../actions';

class Pagination extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        let usersPerPage = this.props.usersPerPage;
        let currentPage = this.props.currentPage;
        let totalUsers = this.props.totalUsers;
        let tempUsers = this.props.tempUsers;
        let paginate = this.props.paginate;
        let firstPage = 1;
        let lastPage = Math.ceil(tempUsers.length / usersPerPage);

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(tempUsers.length / usersPerPage); i++) {
            pageNumbers.push(i);
        };

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <a className="item"
                    id={number}
                    key={number}
                    onClick={() => this.props.setCurrentPage(number)}>
                    {number}
                </a>
            );
        });

        let prevPage;
        if (currentPage - 1 < firstPage) {
            prevPage = firstPage;
        } else {
            prevPage = currentPage - 1;
        };

        let nextPage;
        if (currentPage + 1 > lastPage) {
            nextPage = lastPage;
        } else {
            nextPage = currentPage + 1;
        };

        return (
            <tfoot>
                <tr>
                    <th colSpan="14">
                        <div className="ui pagination right floated menu">
                            <a className="icon item" onClick={() => this.props.setCurrentPage(prevPage)}>
                                <i aria-hidden="true" className="chevron left icon"></i>
                            </a>
                            {renderPageNumbers}
                            <a className="icon item" onClick={() => this.props.setCurrentPage(nextPage)}>
                                <i aria-hidden="true" className="chevron right icon"></i>
                            </a>
                        </div>
                    </th>
                </tr>
            </tfoot>
        )
    }
}

const mapStateToProps = (state) => {
    return { currentPage: state.currentPage };
}

export default connect(mapStateToProps, { setCurrentPage: setCurrentPage })(Pagination);

