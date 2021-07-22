import * as actionTypes from '../actions/actionTypes';

let initialState = {}

const INGREDIENT_PRICES = {
    cheese: 0.4,
    meat: 1.3,
    salad: 0.5,
    mushroom: 0.7
}

const reducer = (state = initialState, action) => {
    console.log('[REDUCER]', action.type);
    switch (action.type) {
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...action.data
                }
            }
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.name]: state.ingredients[action.name] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.name]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.name]: state.ingredients[action.name] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.name]
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error:true
            }


        default:
            return state;
    }
}

export default reducer