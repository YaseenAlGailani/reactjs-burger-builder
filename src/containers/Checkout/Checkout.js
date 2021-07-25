import React from 'react';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.continueCheckoutHandler = this.continueCheckoutHandler.bind(this);
        this.cancelCheckoutHandler = this.cancelCheckoutHandler.bind(this);
    }

    continueCheckoutHandler() {
        this.props.history.replace('/checkout/contact-data');
    }

    cancelCheckoutHandler() {
        this.props.history.goBack();
    }

    render() {

        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    continueCheckout={this.continueCheckoutHandler}
                    cancelCheckout={this.cancelCheckoutHandler}
                />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);