import * as actionTypes from './actionTypes';
import axiosOrder from '../../axios-orders';


const setIngredients = data => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        data: data
    }
}

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        name: name
    }
}

export const removeIngredient = name => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        name: name
    }
}

export const fetchIngredientsFailed = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error:error
    }
}


export const initIngredients = () => {
    return dispatch => {
        axiosOrder.get('/ingredients.json')
            .then((resp) => {
                console.log(resp.data);
                dispatch(setIngredients(resp.data));
            }).catch((error) => {
                dispatch(fetchIngredientsFailed(error));
            })
    }
}