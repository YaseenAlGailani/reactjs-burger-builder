import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axiosOrder from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'



export class BurgerBuilder extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            purchasable: false,
        }
    }

    updatePurchasability() {

        this.setState((state) => {
            let ingredients = { ...this.props.ingrdients };
            const sum = Object.entries(ingredients).reduce((acc, current) => {
                return acc + current[1]
            }, 0)
            return state.purchasable = sum > 0
        })
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated){
            this.setState({ viewOrderSummary: true })
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ viewOrderSummary: false })
    }

    continuePurchaseHandler = () => {
        this.props.history.push('/checkout');
        this.props.initPurchase();
    }

    render() {
        let ingredientsRemovedBool = { ...this.props.ingredients };
        for (const key in ingredientsRemovedBool) {
            ingredientsRemovedBool[key] = ingredientsRemovedBool[key] <= 0;
        }


        let modalContent = this.props.ingredients ? (<OrderSummary
            price={this.props.totalPrice}
            cancelPurchase={this.purchaseCancelHandler}
            continuePurchase={this.continuePurchaseHandler}
            ingredients={this.props.ingredients} />) : <Spinner />;


        if (this.state.orderLoading) {
            modalContent = (<Spinner />)
        }

        let burger = this.props.ingredients ? (
            <>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    order={this.purchaseHandler}
                    price={this.props.totalPrice}
                    disabled={ingredientsRemovedBool}
                    removeIngredient={this.props.onIngredientRemoved}
                    addIngredient={this.props.onIngredientAdded}
                />
            </>
        )
            : <Spinner />

        return (
            <>
                {this.props.error ? <p>Error loading ingredients</p> : burger}
                <Modal modalShown={this.state.viewOrderSummary} hideModal={this.purchaseCancelHandler} >
                    {this.props.isAuthenticated ? modalContent : null}
                </Modal>
            </>
        );
    }

    componentDidMount() {
        this.props.initIngredients()
    }
}



const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => { dispatch(actions.addIngredient(ingName)) },
        onIngredientRemoved: (ingName) => { dispatch(actions.removeIngredient(ingName)) },
        initIngredients: () => { dispatch(actions.initIngredients()) },
        initPurchase: () => { dispatch(actions.purchaseInit())}, 
        onSetAuthRedirectPath: (path) => {dispatch(actions.setAuthRedirectPath(path))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosOrder));
