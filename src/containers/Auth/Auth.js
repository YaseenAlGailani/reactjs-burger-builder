import React from 'react';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import FormControl from '../../components/UI/Input/FormControl';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../utility/validation';



class Auth extends React.Component {
    constructor(props) {
        super(props);

        if (!this.props.buildingBurger) {
            this.props.resetAuthRedirectPath();
        }

        this.state = {
            controls: {
                email: {
                    label: 'Your email',
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    isValid: false,
                    visited: false
                },
                password: {
                    label: 'Your Password',
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6
                    },
                    isValid: false,
                    visited: false
                }
            },
            signUpMode: false
        }
    }




    inputChangeHandler = (event, controlName) => {
        let updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                isValid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                value: event.target.value,
                visited: true
            }
        }
        this.setState({
            controls: updatedControls
        });
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.authenticate(this.state.signUpMode, this.state.controls.email.value, this.state.controls.password.value)
    }

    switchAuthModeHandler = (event) => {
        this.setState((prevState) => {
            return {
                signUpMode: !prevState.signUpMode
            };
        });
    }

    render() {
        let formFields = [];
        for (let formControl in this.state.controls) {
            formFields.push(
                <FormControl
                    id={formControl}
                    key={formControl}
                    elementType={this.state.controls[formControl].elementType}
                    label={this.state.controls[formControl].label}
                    config={this.state.controls[formControl].elementConfig}
                    value={this.state.controls[formControl].value}
                    changed={event => this.inputChangeHandler(event, formControl)}
                    valid={this.state.controls[formControl].isValid}
                    visited={this.state.controls[formControl].visited} />
            )
        }

        if (this.props.loading) {
            formFields = <Spinner />;
        }

        let errorMessage = this.props.error ? <p>{this.props.error.message}</p> : null;

        return (
            <div className={classes.Auth}>
                {this.props.isAuthenticated ? <Redirect to={this.props.authRedirectPath} /> : null}
                {errorMessage}
                <form onSubmit={this.onSubmitHandler}>
                    {formFields}
                    <Button btnType="Success">Sign {this.state.signUpMode ? 'up' : 'in'}</Button>
                </form>
                <Button clicked={this.switchAuthModeHandler} btnType="Danger">Switch to {this.state.signUpMode ? 'Sign in' : 'Sign up'}</Button>
            </div>
        )
    }
}




export default connect(
    state => {
        return {
            loading: state.auth.loading,
            error: state.auth.error,
            isAuthenticated: state.auth.token !== null,
            buildingBurger: state.burgerBuilder.building,
            authRedirectPath: state.auth.authRedirectPath
        }
    },
    dispatch => {
        return {
            authenticate: (isSignup, email, password) => dispatch(actions.auth(isSignup, email, password)),
            resetAuthRedirectPath: () => { dispatch(actions.setAuthRedirectPath('/')) }
        }
    }
)(Auth);