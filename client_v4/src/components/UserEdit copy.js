import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { editUser, fetchUser } from '../actions';
import history from '../history';


class UserEdit extends Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.props.fetchUser(this.props.match.params.id);
    };

    renderError({ error, touched }) {
        console.log(error);
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        };
    };

    renderInput = (formProps) => {

        const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error' : 0}`
        return (
            <div className={className}>
                <label>{formProps.label}</label>
                <input {...formProps.input} autoComplete="off" />
                {this.renderError(formProps.meta)}
            </div>
        );
    };

    // With redux-form
    onSubmit = (formValues) => {
        // console.log(formValues);
        this.props.editUser(formValues);
        history.push('/');
    };

    handleGoBack = () => {
        history.push('/');
    };

    render() {
        let toBeEdit = this.props.selectedUser;
        
        return (
            <div className="UserEdit" style={{ width: '80%', marginLeft: '15%', marginRight: '15%' }}>
                <h1>Edit User:</h1>
                <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="firstName" component={this.renderInput} label="First Name:" />
                    <Field name="lastName" component={this.renderInput} label="Last Name:" />
                    <Field name="sex" component={this.renderInput} label="Sex:" />
                    <Field name="age" component={this.renderInput} label="Age:" />
                    <Field name="password" component={this.renderInput} label="Password:" />
                    <Field name="passwordRepeat" component={this.renderInput} label="Repeat Password:" />
                    <button className="ui button primary">Add User</button>
                    <button className="ui button green" onClick={this.handleGoBack}>Go Back</button>
                </form>
            </div>
        );
    };
};

const validate = (formValues) => {
    const errors = {};

    if (!formValues.firstName) {
        errors.firstName = "You must enter first name!";
    };

    if (!formValues.lastName) {
        errors.lastName = "You must enter last name!";
    };

    if (formValues.sex !== "male" && formValues.sex !== "female") {
        errors.sex = "You must enter gender either 'male' or 'female'! (case-sensitive)";
    };

    if (!formValues.age) {
        errors.age = "You must enter age! ( 1 ~ 99 )";
    } else if (formValues.age < 1) {
        errors.age = "You must enter age! ( 1 ~ 99 )";
    } else if (formValues.age > 99) {
        errors.age = "You must enter age! ( 1 ~ 99 )";
    };

    if (!formValues.password) {
        errors.password = "You must enter password! ( Password contains at least 10 character-number combination )";
    } else if (formValues.password.length !== 10) {
        errors.password = "You must enter password! ( Password contains at least 10 character-number combination )";
    };

    if (!formValues.passwordRepeat) {
        errors.passwordRepeat = "You must enter exact matched password";
    } else if (formValues.passwordRepeat !== formValues.password) {
        errors.passwordRepeat = "You must enter exact matched password";
    };

    return errors;
};

const formEditWrapped = reduxForm({
    form: 'userEdit',
    validate: validate
})(UserEdit);

const mapStateToProps = (state, ownProps) => {
    return {
        selectedUser: state.user
    }
}

export default connect(mapStateToProps, { editUser: editUser, fetchUser: fetchUser })(formEditWrapped);