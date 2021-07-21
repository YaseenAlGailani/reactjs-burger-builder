import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
    return {
        type: actionTypes.addIngredient,
        name:  name
    }
}

export const removeIngredient = name =>{
    return {
        type: actionTypes.removeIngredient,
        name: name
    }
}