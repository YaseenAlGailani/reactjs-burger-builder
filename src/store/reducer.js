import * as actionTypes from './actions';

let initialState = {}

const INGREDIENT_PRICES = {
    cheese: 0.4,
    meat: 1.3,
    salad: 0.5,
    mushroom: 0.7
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.addIngredient:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.name]: state.ingredients[action.name] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.name]
            };
        case actionTypes.removeIngredient:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.name]: state.ingredients[action.name] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.name]
            };
        default:
            return state;
    }
}

export default reducer