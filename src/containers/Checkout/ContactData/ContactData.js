import classes from './ContactData.module.css';
import React from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button'
import FormControl from '../../../components/UI/Input/FormControl';
import * as actions from '../../../store/actions/order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderForm: {
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
                        required: true
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

        for (let key in this.state.orderForm) {
            orderData[key] = this.state.orderForm[key].value;
        }

        let order = {
            ingredients: this.props.ingredients,
            orderData: orderData,
            price: this.props.totalPrice
        }

        this.props.submitOrder(order, this.props.token);


    }

    checkFormValidity = () => {
        let formValid = true;
        for (let key in this.state.orderForm) {
            formValid &= this.state.orderForm[key].isValid;
        }
        return formValid;
    }

    inputChangeHandler = (event, id) => {
        let updatedOrderForm = {
            ...this.state.orderForm
        }
        let inputField = updatedOrderForm[id]
        let isValid = true;

        inputField.value = event.target.value;

        if (inputField.validation.required) {
            isValid &= inputField.value.trim() !== ''
        }

        if (inputField.validation.minLength) {
            isValid &= inputField.value.length >= inputField.validation.minLength;
        }
        if (inputField.validation.maxLength) {
            isValid &= inputField.value.length <= inputField.validation.maxLength;
        }
        inputField.isValid = isValid;

        let formValid = this.checkFormValidity();

        inputField.visited = true;
        this.setState({ ...updatedOrderForm, formValid: formValid });
    }




    render() {

        let formFields = [];
        for (let formControl in this.state.orderForm) {
            formFields.push(
                <FormControl
                    id={formControl}
                    key={this.state.orderForm[formControl].label}
                    elementType={this.state.orderForm[formControl].elementType}
                    label={this.state.orderForm[formControl].label}
                    config={this.state.orderForm[formControl].elementConfig}
                    value={this.state.orderForm[formControl].value}
                    changed={event => this.inputChangeHandler(event, formControl)}
                    valid={this.state.orderForm[formControl].isValid}
                    visited={this.state.orderForm[formControl].visited} />
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
            token:state.auth.token
        }
    },
    dispatch => {
        return {
            submitOrder: (orderData, token) => { dispatch(actions.pushOrder(orderData, token));}
        }
    })(withErrorHandler(ContactData, axios));