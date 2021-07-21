import React from 'react';
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axiosOrder from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'



class BurgerBuilder extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            purchasable: false,
            error: false
        }
    }

    updatePurchasability() {
        // [{mushroom:0},{cheese:1},{salad:0},{meat:1}]
        // let ingredients = { ...state.ingrdients };
        // const sum = Object.entries(ingredients).reduce((acc, current) => {
        //     return acc + current[1]
        // }, 0)
        // this.setState({purchasable:sum > 0})

        this.setState((state) => {
            let ingredients = { ...this.props.ingrdients };
            const sum = Object.entries(ingredients).reduce((acc, current) => {
                return acc + current[1]
            }, 0)
            return state.purchasable = sum > 0
        })
    }

    showOrderSummary = () => {
        this.setState({ viewOrderSummary: true })
    }

    hideOrderSummary = () => {
        this.setState({ viewOrderSummary: false })
    }

    continuePurchase = () => {
        this.props.history.push('/checkout');
    }

    render() {
        let ingredientsRemovedBool = { ...this.props.ingredients };
        for (const key in ingredientsRemovedBool) {
            ingredientsRemovedBool[key] = ingredientsRemovedBool[key] <= 0;
        }


        let modalContent = this.props.ingredients ? (<OrderSummary
            price={this.props.totalPrice}
            cancelPurchase={this.hideOrderSummary}
            continuePurchase={this.continuePurchase}
            ingredients={this.props.ingredients} />) : <Spinner />;


        if (this.state.orderLoading) {
            modalContent = (<Spinner />)
        }

        let burger = this.props.ingredients ? (
            <>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    showModal={this.showOrderSummary}
                    price={this.props.totalPrice}
                    ingredientsBool={ingredientsRemovedBool}
                    removeIngredient={this.props.onIngredientRemoved}
                    addIngredient={this.props.onIngredientAdded}
                />
            </>
        )
            : <Spinner />

        return (
            <>
                {this.state.error ? <p>Error loading ingredients</p> : burger}
                <Modal modalShown={this.state.viewOrderSummary} hideModal={this.hideOrderSummary} >
                    {modalContent}
                </Modal>
            </>
        );
    }

    componentDidMount() {
        axiosOrder.get('/ingredients.json')
            .then((resp) => {
                this.setState({ ingredients: resp.data });
            }).catch((error) => {
                this.setState({ error: true });
                console.log(error);
            })
    }
}



const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => { dispatch({type:actionTypes.addIngredient, name:ingName})},
        onIngredientRemoved: (ingName) => { dispatch({type:actionTypes.removeIngredient, name:ingName})}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosOrder));