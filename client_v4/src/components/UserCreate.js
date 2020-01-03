import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createUser } from '../actions';
import history from '../history';

class UserCreate extends Component {
    constructor(props) {
        super(props);
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
        // console.log(formProps);
        // return (
        //     <input
        //         onChange={formProps.input.onChange}
        //         value={formProps.input.value}
        //     />
        // );

        // Or this way:
        // Show the built-in validate properties 
        // <div>{formProps.meta.error}</div>
        console.log(formProps.meta);
        const className=`field ${formProps.meta.error && formProps.meta.touched ? 'error' : 0}`
        return (
            <div className={className}>
                <label>{formProps.label}</label>
                <input {...formProps.input} autoComplete="off" />
                {this.renderError(formProps.meta)}
            </div> 
        );
    };
    // Use plain react components
    // onSubmit(event) {
    //     event.preventDefault();
    // };

    // With redux-form
    onSubmit = (formValues) => {
        // console.log(formValues);
        this.props.createUser(formValues);
    };

    handleGoBack = () => {
        history.push('/');
    };

    render() {
        // console.log(this.props);
        return (
            <div className="UserCreate" style={{ width: '80%', marginLeft: '15%', marginRight: '15%' }}>
                <h1>Create New User:</h1>
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
        errors.age= "You must enter age! ( 1 ~ 99 )";
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

// export default reduxForm({
//     form: 'userCreate',
//     validate: validate
// })(UserCreate);

const formWrapped = reduxForm({
    form: 'userCreate',
    validate: validate
})(UserCreate);

export default connect(null, { createUser })(formWrapped);