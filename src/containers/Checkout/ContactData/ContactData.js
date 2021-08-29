import classes from './ContactData.module.css';
import React from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button'
import FormControl from '../../../components/UI/Input/FormControl';
import * as actions from '../../../store/actions/order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { checkValidity } from '../../../utility/validation';


class ContactData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formControls: {
                name: {
                    label: 'Your Name',
                    elementType: 'input',
                    elementConfig: {
                        type: 'text'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5
                    },
                    isValid: false,
                    visited: false
                },
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
                postcode: {
                    label: 'Postcode',
                    elementType: 'input',
                    elementConfig: {
                        type: 'text'
                    },
                    value: '',
                    validation: {
                        required: true,
                        maxLength: 5
                    },
                    isValid: false,
                    visited: false
                },
                state: {
                    label: 'State',
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            { value: '', display: 'Please Select' },
                            { value: 'ACT', display: 'Australian Capital Territory' },
                            { value: 'NSW', display: 'New South Whales' },
                            { value: 'NT', display: 'Northern Territory' },
                            { value: 'QLD', display: 'Queensland' },
                            { value: 'SA', display: 'South Australia' },
                            { value: 'TAS', display: 'Tasmania' },
                            { value: 'VIC', display: 'Victoria' },
                            { value: 'WA', display: 'Western Australia' },
                        ]
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    isValid: false,
                    visited: false
                },
                deliveryMethod: {
                    label: 'Delviery',
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            { value: '', display: 'Please Select' },
                            { value: 'fastest', display: 'Fastest' },
                            { value: 'cheapest', display: 'Cheapest' },
                        ]
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    isValid: false,
                    visited: false
                }
            },
            formValid: false
        }

    }
    submitOrderHandler(e) {
        e.preventDefault();

        let orderData = {};

        for (let key in this.state.formControls) {
            orderData[key] = this.state.formControls[key].value;
        }

        let order = {
            ingredients: this.props.ingredients,
            orderData: orderData,
            price: this.props.totalPrice,
            userId: this.props.userId
        }
        this.props.submitOrder(order, this.props.token);
    }

    checkFormValidity = (updatedControls) => {
        let formValid = true;
        for (let control in updatedControls) {
            formValid = formValid && updatedControls[control].isValid;
        }
        return formValid;
    }

    inputChangeHandler = (event, controlName) => {
        let updatedControls= {
            ...this.state.formControls,
            [controlName]: {
                ...this.state.formControls[controlName],
                isValid: checkValidity(event.target.value, this.state.formControls[controlName].validation),
                value: event.target.value,
                visited:true
            }
        }

        let formValid = this.checkFormValidity(updatedControls);

        this.setState({ 
            formControls: updatedControls,
            formValid: formValid
        });
    }

    render() {

        let formFields = [];
        for (let formControl in this.state.formControls) {
            formFields.push(
                <FormControl
                    id={formControl}
                    key={this.state.formControls[formControl].label}
                    elementType={this.state.formControls[formControl].elementType}
                    label={this.state.formControls[formControl].label}
                    config={this.state.formControls[formControl].elementConfig}
                    value={this.state.formControls[formControl].value}
                    changed={event => this.inputChangeHandler(event, formControl)}
                    valid={this.state.formControls[formControl].isValid}
                    visited={this.state.formControls[formControl].visited} />
            )
        }

        if (this.props.loading) {
            formFields = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h1>Your Contact info</h1>
                <form>
                    {formFields}
                    <Button disabled={!this.state.formValid} clicked={this.submitOrderHandler.bind(this)} btnType="Success">ORDER</Button>
                </form>
            </div>
        )
    }
}
export default connect(
    state => {
        return {
            ingredients: state.burgerBuilder.ingredients,
            totalPrice: state.burgerBuilder.totalPrice,
            loading: state.order.loading,
            token: state.auth.token
        }
    },
    dispatch => {
        return {
            submitOrder: (orderData, token) => { dispatch(actions.pushOrder(orderData, token)); }
        }
    })(withErrorHandler(ContactData, axios));