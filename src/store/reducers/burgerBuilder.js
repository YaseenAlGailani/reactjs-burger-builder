import * as actionTypes from '../actions/actionTypes';

let initialState = {
    ingredients: {},
    totalPrice: 4,
    error: false
}

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
                    salad:action.data.salad,
                    cheese:action.data.cheese,
                    mushroom:action.data.mushroom,
                    meat: action.data.meat
                },
                error:false, 
                totalPrice:4
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
            console.error('[FETCH_INGREDIENTS_FAILED]', action.error)
            return {
                ...state,
                error:true
            }


        default:
            return state;
    }
}

export default reducer