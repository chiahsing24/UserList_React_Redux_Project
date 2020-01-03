import React from 'react';
import { connect } from 'react-redux';
import { deleteUser } from '../actions';
import { withRouter} from 'react-router-dom';
import history from '../history';


class DeleteButton extends React.Component {
    constructor(props) {
        super(props);
    };

    handleOnClick = (toBeDelete) => {
        this.props.deleteUser(toBeDelete);
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

export default withRouter(connect(null, { deleteUser: deleteUser })(DeleteButton));
