import React from 'react';
import { connect } from 'react-redux';
// import { selectedUserToBeEdit } from '../actions';
import { withRouter, Link} from 'react-router-dom';

class EditButton extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="EditButton">
                <Link to={`/users/edit/${this.props.id}`} className="ui button primary">
                    <i className="edit icon"></i>Edit
                </Link>
            </div>
        );
    };
};

// const mapStateToProps = (state) => {
//     //return { users: state.users }
    
//     return {
//         selectedUserToBeEdit: state.selectedUserToBeEdit
//     };
// }

// export default withRouter(connect(mapStateToProps, { selectedUserToBeEdit: selectedUserToBeEdit })(EditButton));
export default EditButton;