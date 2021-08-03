import React from 'react';
import classes from './Auth.module.css';

import FormControl from '../../components/UI/Input/FormControl';
import Button from '../../components/UI/Button/Button';



class Auth extends React.Component {
    constructor(props) {
        super(props);
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
                        isEmail:true
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
                        minLength:6
                    },
                    isValid: false,
                    visited: false
                }
            }
        }
    }


    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangeHandler = (event, controlName) => {
        let updatedControls = {
            ...this.state.controls, 
            [controlName]: {...this.state.controls[controlName],
            isValid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
            value: event.target.value,
            visited: true        
        }
    }
        this.setState({
            controls:updatedControls
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

        return (
            <div className={classes.Auth}>
                <h1>Log in</h1>
                <form>
                    {formFields}
                    <Button btnType="Success">Log in</Button>
                </form>
            </div>
        )
    }
}


export default Auth;